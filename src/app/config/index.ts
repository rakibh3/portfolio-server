import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') })

// Export config from environment
export default {
  // Server port
  port: process.env.PORT,
  // MongoDB connection string
  database_url: process.env.DATABASE_URL,
}
