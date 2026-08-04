const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/imbt'
})

async function createTestUsers() {
  const password = 'password123'
  const hashedPassword = await bcrypt.hash(password, 10)

  const users = [
    {
      email: 'client@test.com',
      firstName: 'Jean',
      lastName: 'Client',
      role: 'user'
    },
    {
      email: 'marie@test.com',
      firstName: 'Marie',
      lastName: 'Dupont',
      role: 'user'
    },
    {
      email: 'manager@test.com',
      firstName: 'Pierre',
      lastName: 'Manager',
      role: 'manager'
    }
  ]

  //console.log('Creating test users...')
  //console.log('Password for all users: password123\n')

  for (const user of users) {
    try {
      const result = await pool.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
         VALUES ($1, $2, $3, $4, $5, true)
         ON CONFLICT (email) DO UPDATE
         SET password_hash = $2, first_name = $3, last_name = $4, role = $5
         RETURNING id, email, role`,
        [user.email, hashedPassword, user.firstName, user.lastName, user.role]
      )

      //console.log(`✓ Created/Updated ${user.role}: ${user.email}`)
      //console.log(`  Name: ${user.firstName} ${user.lastName}`)
      //console.log(`  ID: ${result.rows[0].id}\n`)
    } catch (error) {
      console.error(`✗ Failed to create ${user.email}:`, error.message)
    }
  }

  await pool.end()
  //console.log('Done!')
}

createTestUsers().catch(error => {
  console.error('Error:', error)
  process.exit(1)
})
