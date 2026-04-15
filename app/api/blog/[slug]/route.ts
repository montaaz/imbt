import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET - Fetch single blog post by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const result = await query(
      `SELECT
        bp.*,
        CONCAT(u.first_name, ' ', u.last_name) as author_name,
        u.email as author_email
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.slug = $1`,
      [slug]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    const post = result.rows[0]

    // Increment view count
    await query(
      'UPDATE blog_posts SET views = views + 1 WHERE slug = $1',
      [slug]
    )

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT - Update blog post (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
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

    const { slug } = await params
    const body = await request.json()
    const {
      title,
      newSlug,
      excerpt,
      content,
      featuredImage,
      status,
      tags,
      metaTitle,
      metaDescription,
    } = body

    // Build update query dynamically
    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (title !== undefined) {
      updates.push(`title = $${paramCount}`)
      values.push(title)
      paramCount++
    }

    if (newSlug !== undefined && newSlug !== slug) {
      // Check if new slug already exists
      const existingPost = await query(
        'SELECT id FROM blog_posts WHERE slug = $1 AND slug != $2',
        [newSlug, slug]
      )

      if (existingPost.rows.length > 0) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
        )
      }

      updates.push(`slug = $${paramCount}`)
      values.push(newSlug)
      paramCount++
    }

    if (excerpt !== undefined) {
      updates.push(`excerpt = $${paramCount}`)
      values.push(excerpt)
      paramCount++
    }

    if (content !== undefined) {
      updates.push(`content = $${paramCount}`)
      values.push(content)
      paramCount++
    }

    if (featuredImage !== undefined) {
      updates.push(`featured_image = $${paramCount}`)
      values.push(featuredImage)
      paramCount++
    }

    if (status !== undefined) {
      updates.push(`status = $${paramCount}`)
      values.push(status)
      paramCount++

      // Set published_at when changing to published
      if (status === 'published') {
        updates.push(`published_at = COALESCE(published_at, CURRENT_TIMESTAMP)`)
      }
    }

    if (tags !== undefined) {
      updates.push(`tags = $${paramCount}`)
      values.push(tags)
      paramCount++
    }

    if (metaTitle !== undefined) {
      updates.push(`meta_title = $${paramCount}`)
      values.push(metaTitle)
      paramCount++
    }

    if (metaDescription !== undefined) {
      updates.push(`meta_description = $${paramCount}`)
      values.push(metaDescription)
      paramCount++
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    values.push(slug)

    const result = await query(
      `UPDATE blog_posts
      SET ${updates.join(', ')}
      WHERE slug = $${paramCount}
      RETURNING *`,
      values
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Blog post updated successfully',
      post: result.rows[0],
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog post (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
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

    const { slug } = await params

    const result = await query(
      'DELETE FROM blog_posts WHERE slug = $1 RETURNING id',
      [slug]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Blog post deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
