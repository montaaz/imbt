const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/imbt'
  });

  try {
    //console.log('Connecting to database...');
    await client.connect();
    //console.log('Connected successfully!');

    //console.log('Reading schema file...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

   // console.log('Executing schema...');
    await client.query(schemaSQL);

    // console.log('✅ Database setup completed successfully!');
    // console.log('\nDefault Admin Credentials:');
    // console.log('Email: admin@imbt-consulting.com');
    // console.log('Password: admin123');
    // console.log('\nDefault Manager Credentials:');
    // console.log('Email: manager@imbt-consulting.com');
    // console.log('Password: admin123');
    // console.log('\n⚠️  IMPORTANT: Change these passwords in production!');

  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    await client.end();
    //console.log('\nDatabase connection closed.');
  }
}

setupDatabase().catch(console.error);
