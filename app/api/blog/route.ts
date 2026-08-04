import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET - Fetch all published blog posts (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'published'
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let sqlQuery = `
      SELECT
        bp.*,
        CONCAT(u.first_name, ' ', u.last_name) as author_name
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
    `

    const params: any[] = []

    // If status is provided, filter by it (for admin)
    if (status) {
      sqlQuery += ` WHERE bp.status = $1`
      params.push(status)
    }

    sqlQuery += `
      ORDER BY bp.published_at DESC NULLS LAST, bp.created_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `
    params.push(limit, offset)

    const result = await query(sqlQuery, params)

    // Get total count
    const countQuery = status
      ? 'SELECT COUNT(*) FROM blog_posts WHERE status = $1'
      : 'SELECT COUNT(*) FROM blog_posts'
    const countResult = await query(countQuery, status ? [status] : [])
    const total = parseInt(countResult.rows[0].count)

    return NextResponse.json({
      posts: result.rows,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const {
      title,
      title_en,
      title_ar,
      slug,
      excerpt,
      excerpt_en,
      excerpt_ar,
      content,
      content_en,
      content_ar,
      featuredImage,
      status = 'draft',
      tags = [],
      metaTitle,
      metaTitle_en,
      metaTitle_ar,
      metaDescription,
      metaDescription_en,
      metaDescription_ar,
      subtitle,
      subtitle_en,
      subtitle_ar,
    } = body

    // Validate required fields (at least French version)
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingPost = await query(
      'SELECT id FROM blog_posts WHERE slug = $1',
      [slug]
    )

    if (existingPost.rows.length > 0) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      )
    }

    // Insert new blog post
    const result = await query(
      `INSERT INTO blog_posts
        (
          title, title_en, title_ar, 
          slug, 
          excerpt, excerpt_en, excerpt_ar, 
          content, content_en, content_ar, 
          featured_image, author_id, status, published_at, tags, 
          meta_title, meta_title_en, meta_title_ar, 
          meta_description, meta_description_en, meta_description_ar,
          subtitle, subtitle_en, subtitle_ar
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      RETURNING *`,
      [
        title,
        title_en || null,
        title_ar || null,
        slug,
        excerpt || null,
        excerpt_en || null,
        excerpt_ar || null,
        content,
        content_en || null,
        content_ar || null,
        featuredImage || null,
        decoded.userId,
        status,
        status === 'published' ? new Date() : null,
        tags,
        metaTitle || title,
        metaTitle_en || title_en || null,
        metaTitle_ar || title_ar || null,
        metaDescription || excerpt || null,
        metaDescription_en || excerpt_en || null,
        metaDescription_ar || excerpt_ar || null,
        subtitle || null,
        subtitle_en || null,
        subtitle_ar || null,
      ]
    )

    return NextResponse.json({
      message: 'Blog post created successfully',
      post: result.rows[0],
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
