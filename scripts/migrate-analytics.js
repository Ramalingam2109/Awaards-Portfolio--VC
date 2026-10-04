import { neon } from '@neondatabase/serverless';

const connectionString = 'postgresql://neondb_owner:npg_nJU1wvI2hyYQ@ep-lingering-fire-b3tegmr2-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function run() {
  console.log('Connecting to Neon PostgreSQL to create analytics & messaging tables...');
  const sql = neon(connectionString);

  // 1. Create visitor_sessions table
  console.log('Creating visitor_sessions table...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS visitor_sessions (
      session_id VARCHAR(64) PRIMARY KEY,
      ip VARCHAR(64),
      country VARCHAR(128),
      city VARCHAR(128),
      device_type VARCHAR(64),
      browser VARCHAR(64),
      os VARCHAR(64),
      referrer TEXT,
      duration_seconds INTEGER DEFAULT 0,
      sections_viewed TEXT[] DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Create contact_messages table
  console.log('Creating contact_messages table...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL,
      message TEXT NOT NULL,
      country VARCHAR(128),
      city VARCHAR(128),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('--- Verification Query ---');
  const sessionsCount = await sql.query('SELECT count(*) FROM visitor_sessions');
  const messagesCount = await sql.query('SELECT count(*) FROM contact_messages');

  console.log('visitor_sessions table count:', sessionsCount[0].count);
  console.log('contact_messages table count:', messagesCount[0].count);
  console.log('Analytics & Contact tables created successfully in Neon!');
}

run().catch(err => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
