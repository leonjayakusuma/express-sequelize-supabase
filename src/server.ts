import app from './app'
import config from './config/config'
import { connectDatabase } from './config/database'
import { populateDb } from './config/seeder'

const port = config.port
const nodeEnv = config.nodeEnv

// Connect to database before starting server
connectDatabase()
  .then(async () => {
    // Populate database with initial data
    try {
      await populateDb()
      console.log('✅ Database populated successfully')
    } catch (error) {
      console.error('⚠️  Error populating database:', error)
      // Don't exit - continue to start server even if seeding fails
    }
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
      console.log(`📝 Environment: ${nodeEnv}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })
