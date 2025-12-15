import { Sequelize } from 'sequelize-typescript';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import config from './config.js';
import { DietaryPreferenceTable } from '../models/dietaryPreference.model.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Sequelize instance with Supabase connection
const sequelize = new Sequelize(config.database_url, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: config.nodeEnv === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  models: [DietaryPreferenceTable], // Import models directly
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Sync models to database (creates tables if they don't exist)
    // Use { force: true } to drop and recreate tables (DANGEROUS - deletes data!)
    // Use { alter: true } to alter tables to match models (can be risky)
    await sequelize.sync({ alter: false }); // Set to true to update existing tables
    console.log('✅ Database models synced');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;

