import { Pool, PoolClient, QueryResult } from 'pg'

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Log pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

/**
 * Execute a SQL query
 */
export async function query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
  const start = Date.now()
  try {
    const res = await pool.query<T>(text, params)
    const duration = Date.now() - start
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { text, duration, rows: res.rowCount })
    }
    return res
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
  return await pool.connect()
}

/**
 * Close all connections in the pool
 */
export async function end(): Promise<void> {
  await pool.end()
}

// Helper to check if database is connected
export async function checkConnection(): Promise<boolean> {
  try {
    await query('SELECT NOW()')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

export default {
  query,
  getClient,
  end,
  checkConnection,
}
