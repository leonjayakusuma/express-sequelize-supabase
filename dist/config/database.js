"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_js_1 = __importDefault(require("./config.js"));
const user_model_1 = require("../models/user.model");
const cartItem_model_1 = require("../models/cartItem.model");
const item_model_1 = require("../models/item.model");
const tag_model_1 = require("../models/tag.model");
const personalInfo_model_1 = require("../models/personalInfo.model");
const activityLevel_model_1 = require("../models/activityLevel.model");
const healthGoal_model_1 = require("../models/healthGoal.model");
const dietaryPreference_model_1 = require("../models/dietaryPreference.model");
const recipe_model_1 = require("../models/recipe.model");
const instruction_model_1 = require("../models/instruction.model");
const ingredient_model_1 = require("../models/ingredient.model");
const recipeIngredient_model_1 = require("../models/recipeIngredient.model");
const refreshToken_model_1 = require("../models/refreshToken.model");
const itemTag_model_1 = require("../models/itemTag.model");
const review_model_1 = require("../models/review.model");
const follow_model_1 = require("../models/follow.model");
// Create Sequelize instance with Supabase connection
const sequelize = new sequelize_typescript_1.Sequelize(config_js_1.default.database_url, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: config_js_1.default.nodeEnv === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    models: [user_model_1.UserTable,
        cartItem_model_1.CartItemTable,
        item_model_1.ItemTable,
        tag_model_1.TagTable,
        itemTag_model_1.ItemTagTable,
        personalInfo_model_1.PersonalInfoTable,
        activityLevel_model_1.ActivityLevelTable,
        healthGoal_model_1.HealthGoalTable,
        dietaryPreference_model_1.DietaryPreferenceTable,
        recipe_model_1.RecipeTable,
        instruction_model_1.InstructionTable,
        ingredient_model_1.IngredientTable,
        recipeIngredient_model_1.RecipeIngredientTable,
        refreshToken_model_1.RefreshTokenTable,
        review_model_1.ReviewTable,
        follow_model_1.FollowTable,], // Import models directly
});
const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');
        // Sync models to database (creates tables if they don't exist)
        // Use { force: true } to drop and recreate tables (DANGEROUS - deletes data!)
        // Use { alter: true } to alter tables to match models (can be risky)
        await sequelize.sync({ alter: false }); // Set to true to update existing tables
        console.log('✅ Database models synced');
    }
    catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
exports.default = sequelize;
//# sourceMappingURL=database.js.map