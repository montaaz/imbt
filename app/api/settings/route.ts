import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET all settings
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    // Get all settings
    const result = await query(`
      SELECT id, key, value, category, description, is_public, updated_at
      FROM settings
      ORDER BY category, key
    `)

    // Group settings by category
    const settingsByCategory: Record<string, any[]> = {}
    result.rows.forEach((setting) => {
      if (!settingsByCategory[setting.category]) {
        settingsByCategory[setting.category] = []
      }
      settingsByCategory[setting.category].push(setting)
    })

    return NextResponse.json({
      settings: result.rows,
      settingsByCategory,
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des paramètres' }, { status: 500 })
  }
}

// PUT update settings
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Accès refusé. Seuls les administrateurs peuvent modifier les paramètres.' }, { status: 403 })
    }

    const body = await request.json()
    const { settings } = body

    if (!settings || !Array.isArray(settings)) {
      return NextResponse.json({ error: 'Format de données invalide' }, { status: 400 })
    }

    // Update each setting in a transaction
    const client = await query('BEGIN')

    try {
      for (const setting of settings) {
        await query(
          'UPDATE settings SET value = $1, updated_by = $2 WHERE key = $3',
          [setting.value, decoded.userId, setting.key]
        )
      }

      await query('COMMIT')

      return NextResponse.json({ message: 'Paramètres mis à jour avec succès' })
    } catch (error) {
      await query('ROLLBACK')
      throw error
    }
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour des paramètres' }, { status: 500 })
  }
}

// POST create new setting
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    const body = await request.json()
    const { key, value, category, description, isPublic } = body

    if (!key || !category) {
      return NextResponse.json({ error: 'Clé et catégorie sont requis' }, { status: 400 })
    }

    // Check if key already exists
    const existingSetting = await query('SELECT id FROM settings WHERE key = $1', [key])
    if (existingSetting.rows.length > 0) {
      return NextResponse.json({ error: 'Un paramètre avec cette clé existe déjà' }, { status: 400 })
    }

    // Insert new setting
    const result = await query(
      `INSERT INTO settings (key, value, category, description, is_public, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [key, value || '', category, description || '', isPublic || false, decoded.userId]
    )

    return NextResponse.json({ setting: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating setting:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du paramètre' }, { status: 500 })
  }
}

// DELETE setting
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    const searchParams = request.nextUrl.searchParams
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Clé du paramètre requise' }, { status: 400 })
    }

    const result = await query('DELETE FROM settings WHERE key = $1 RETURNING id', [key])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Paramètre non trouvé' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Paramètre supprimé avec succès' })
  } catch (error) {
    console.error('Error deleting setting:', error)
    return NextResponse.json({ error: 'Erreur lors de la suppression du paramètre' }, { status: 500 })
  }
}
