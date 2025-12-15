"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDb = populateDb;
exports.addDummyReviews = addDummyReviews;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const papaparse_1 = __importDefault(require("papaparse"));
const itemTag_model_js_1 = require("../models/itemTag.model.js");
const item_model_js_1 = require("../models/item.model.js");
const tag_model_js_1 = require("../models/tag.model.js");
const user_model_js_1 = require("../models/user.model.js");
const recipe_model_js_1 = require("../models/recipe.model.js");
const review_model_js_1 = require("../models/review.model.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ingredient_model_js_1 = require("../models/ingredient.model.js");
const recipeIngredient_model_js_1 = require("../models/recipeIngredient.model.js");
const instruction_model_js_1 = require("../models/instruction.model.js");
const activityLevel_model_js_1 = require("../models/activityLevel.model.js");
const healthGoal_model_js_1 = require("../models/healthGoal.model.js");
const dietaryPreference_model_js_1 = require("../models/dietaryPreference.model.js");
const database_js_1 = __importDefault(require("./database.js"));
const projectRoot = path_1.default.resolve(__dirname, "../..");
async function populateDb() {
    try {
        console.log("🌱 Starting database population...");
        await addOtherData();
        await addItems();
        await setSpecialItemsIfNoneExist();
        await addRecipes();
        await addDummyUsers();
        await addDummyReviews();
        console.log("✅ Database population completed");
    }
    catch (error) {
        console.error("❌ Error during database population:", error);
        throw error;
    }
}
async function addOtherData() {
    const activityLevelNames = ["low", "med", "high"];
    const healthGoalNames = [
        "weight loss",
        "health improvements",
        "muscle gain",
    ];
    const dietaryPreferenceNames = ["any", "vegetarian", "vegan"];
    for (const activityLevelName of activityLevelNames) {
        const [, created] = await activityLevel_model_js_1.ActivityLevelTable.findOrCreate({
            where: { name: activityLevelName },
        });
        if (created) {
            console.log(`  ✓ Created activity level: ${activityLevelName}`);
        }
    }
    for (const healthGoalName of healthGoalNames) {
        const [, created] = await healthGoal_model_js_1.HealthGoalTable.findOrCreate({
            where: { name: healthGoalName },
        });
        if (created) {
            console.log(`  ✓ Created health goal: ${healthGoalName}`);
        }
    }
    for (const dietaryPreferenceName of dietaryPreferenceNames) {
        const [, created] = await dietaryPreference_model_js_1.DietaryPreferenceTable.findOrCreate({
            where: { name: dietaryPreferenceName },
        });
        if (created) {
            console.log(`  ✓ Created dietary preference: ${dietaryPreferenceName}`);
        }
    }
    console.log("✅ Other data (activity levels, health goals, dietary preferences) added");
}
async function addItems() {
    // Only do this if the table is empty
    const itemsCount = await item_model_js_1.ItemTable.count();
    if (itemsCount > 0) {
        console.log("✅ Items and tags already exist in the database.");
        return;
    }
    const csvPath = path_1.default.join(projectRoot, "src", "default", "items.csv");
    // Check if file exists
    if (!fs_1.default.existsSync(csvPath)) {
        console.warn(`⚠️  CSV file not found: ${csvPath}`);
        console.log("Skipping items import...");
        return;
    }
    const fileStream = fs_1.default.createReadStream(csvPath);
    // Since PapaParse is asynchronous, we need to use a promise
    // So I use resolve and reject
    return new Promise((resolve, reject) => {
        papaparse_1.default.parse(fileStream, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const items = results.data;
                console.log(`📊 Parsed ${items?.length || 0} items from CSV`);
                if (!items || items.length === 0) {
                    console.warn("⚠️  No items found in CSV file");
                    resolve();
                    return;
                }
                // Filter out any empty rows that might have been parsed
                const validItems = items.filter(item => item && (item.title || item.desc));
                console.log(`🔄 Starting to import ${validItems.length} valid items (filtered from ${items.length} total rows)...`);
                if (validItems.length === 0) {
                    console.warn("⚠️  No valid items found after filtering");
                    resolve();
                    return;
                }
                let createdCount = 0;
                let errorCount = 0;
                for (const item of validItems) {
                    try {
                        if (!item.title || !item.desc) {
                            console.warn(`⚠️  Skipping invalid item row:`, item);
                            continue;
                        }
                        const rawId = item.id ?? item["﻿id"];
                        const parsedId = rawId !== undefined && rawId !== null
                            ? parseInt(String(rawId).replace(/\uFEFF/g, ""), 10)
                            : null;
                        const newItem = await item_model_js_1.ItemTable.create({
                            id: parsedId !== null ? parsedId : undefined,
                            title: item.title,
                            description: item.desc,
                            price: parseFloat(item.price || "0"),
                            discount: parseInt(item.discount || "0"),
                        });
                        // Get the ID - try multiple methods to ensure we get it
                        let itemId = newItem.id || newItem.getDataValue('id');
                        if (!itemId) {
                            // Reload as last resort
                            await newItem.reload();
                            itemId = newItem.id || newItem.getDataValue('id');
                            if (!itemId) {
                                throw new Error(`Failed to get ID for item: ${item.title}`);
                            }
                        }
                        createdCount++;
                        console.log(`  ✓ Created item: ${item.title} (ID: ${itemId})`);
                        const tags = item.tags ? item.tags.split(",") : [];
                        for (const tagName of tags) {
                            try {
                                const trimmedTag = tagName.trim();
                                if (!trimmedTag)
                                    continue;
                                await tag_model_js_1.TagTable.findOrCreate({
                                    where: { name: trimmedTag },
                                });
                                await itemTag_model_js_1.ItemTagTable.findOrCreate({
                                    where: {
                                        itemId: itemId,
                                        tagName: trimmedTag,
                                    },
                                });
                            }
                            catch (tagError) {
                                console.error(`  ❌ Error processing tag "${tagName}" for item "${item.title}":`, tagError);
                                // Continue with next tag
                            }
                        }
                    }
                    catch (error) {
                        errorCount++;
                        console.error(`❌ Error inserting item "${item.title}":`, error);
                        // Continue with next item instead of stopping
                    }
                }
                if (createdCount > 0) {
                    console.log(`✅ Items and tags imported successfully. Created ${createdCount} items.`);
                }
                if (errorCount > 0) {
                    console.warn(`⚠️  ${errorCount} items failed to import.`);
                }
                resolve();
            },
            error: (error) => {
                console.error("❌ Error parsing CSV:", error);
                reject(error);
            },
        });
    });
}
async function setSpecialItemsIfNoneExist() {
    const existingSpecial = await item_model_js_1.ItemTable.findAll({
        where: { isSpecial: true },
    });
    if (existingSpecial.length > 0) {
        console.log("✅ Specials already exist in the table.");
    }
    if (existingSpecial.length === 0) {
        const picked = await item_model_js_1.ItemTable.findAll({
            order: database_js_1.default.random(),
            limit: 8,
        });
        const pickedIds = picked.map(p => p.id);
        await item_model_js_1.ItemTable.update({ isSpecial: true }, { where: { id: pickedIds } });
        console.log("✅ Special Items have been set.");
        await item_model_js_1.ItemTable.count({ where: { isSpecial: true } });
    }
}
async function addRecipes() {
    // Only do this if the table is empty
    const recipeCount = await recipe_model_js_1.RecipeTable.count();
    if (recipeCount > 0) {
        console.log("✅ Recipes already exist in the database.");
        return;
    }
    const csvPath = path_1.default.join(projectRoot, "src", "default", "recipes.csv");
    // Check if file exists
    if (!fs_1.default.existsSync(csvPath)) {
        console.warn(`⚠️  CSV file not found: ${csvPath}`);
        console.log("Skipping recipes import...");
        return;
    }
    const fileStream = fs_1.default.createReadStream(csvPath);
    // Since PapaParse is asynchronous, we need to use a promise
    // So I use resolve and reject
    return new Promise((resolve, reject) => {
        papaparse_1.default.parse(fileStream, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const recipes = results.data;
                if (!recipes || recipes.length === 0) {
                    console.warn("⚠️  No recipes found in CSV file");
                    resolve();
                    return;
                }
                try {
                    let createdCount = 0;
                    for (const recipe of recipes) {
                        if (!recipe.name) {
                            console.warn(`⚠️  Skipping invalid recipe row:`, recipe);
                            continue;
                        }
                        const ingredients = [];
                        const instructions = [];
                        const newRecipe = await recipe_model_js_1.RecipeTable.create({
                            name: recipe.name,
                            calories: parseFloat(recipe.calories || "0"),
                            carbs: parseFloat(recipe.carbs || "0"),
                            fat: parseFloat(recipe.fat || "0"),
                            protein: parseFloat(recipe.protein || "0"),
                            link: recipe.link || "",
                        });
                        createdCount++;
                        const recipeId = newRecipe.id || newRecipe.getDataValue("id");
                        if (!recipeId) {
                            throw new Error(`Failed to get recipeId for recipe ${recipe.name}`);
                        }
                        if (recipe.ingredients) {
                            const ingredientsList = recipe.ingredients.split(".");
                            // Remove the last empty string if it exists
                            if (ingredientsList[ingredientsList.length - 1] === "") {
                                ingredientsList.pop();
                            }
                            for (const ingredient of ingredientsList) {
                                const trimmed = ingredient.trim();
                                if (trimmed) {
                                    ingredients.push(trimmed);
                                }
                            }
                        }
                        if (recipe.instructions) {
                            const instructionsList = recipe.instructions.split(".");
                            if (instructionsList[instructionsList.length - 1] === "") {
                                instructionsList.pop();
                            }
                            for (const instruction of instructionsList) {
                                const trimmed = instruction.trim();
                                if (trimmed) {
                                    instructions.push(trimmed);
                                }
                            }
                        }
                        // Bulk create in Ingredient table if exists only
                        if (ingredients.length > 0) {
                            await ingredient_model_js_1.IngredientTable.bulkCreate(ingredients.map((ingredient) => ({
                                name: ingredient,
                            })), {
                                ignoreDuplicates: true,
                            });
                            // Bulk create in RecipeIngredient table including the recipeId
                            await recipeIngredient_model_js_1.RecipeIngredientTable.bulkCreate(ingredients.map((ingredient) => ({
                                recipeId,
                                ingredientName: ingredient,
                            })));
                        }
                        // Bulk create in Instruction table including the recipeId, and stepNo being the index + 1
                        if (instructions.length > 0) {
                            await instruction_model_js_1.InstructionTable.bulkCreate(instructions.map((instruction, index) => ({
                                recipeId,
                                stepNo: index + 1,
                                instruction,
                            })));
                        }
                    }
                    console.log(`✅ Recipes imported successfully. Created ${createdCount} recipes.`);
                    resolve();
                }
                catch (error) {
                    console.error("❌ Error inserting data:", error);
                    reject(error);
                }
            },
            error: (error) => {
                console.error("❌ Error parsing CSV:", error);
                reject(error);
            },
        });
    });
}
async function addDummyUsers() {
    const csvPath = path_1.default.join(projectRoot, "src", "default", "users.csv");
    if (!fs_1.default.existsSync(csvPath)) {
        console.warn(`⚠️  users.csv not found at ${csvPath}, skipping user seed`);
        return;
    }
    const fileStream = fs_1.default.createReadStream(csvPath);
    return new Promise((resolve, reject) => {
        papaparse_1.default.parse(fileStream, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const users = results.data;
                if (!users || users.length === 0) {
                    console.warn("⚠️  No users found in users.csv");
                    resolve();
                    return;
                }
                try {
                    let createdCount = 0;
                    for (const user of users) {
                        if (!user.name || !user.email || !user.pswd) {
                            console.warn("⚠️  Skipping invalid user row:", user);
                            continue;
                        }
                        const pswdHash = await bcrypt_1.default.hash(user.pswd, 10);
                        const [, created] = await user_model_js_1.UserTable.findOrCreate({
                            where: { name: user.name },
                            defaults: {
                                name: user.name,
                                email: user.email,
                                pswdHash,
                            },
                        });
                        if (created) {
                            createdCount++;
                            console.log(`  ✓ Created user: ${user.name}`);
                        }
                    }
                    if (createdCount === 0) {
                        console.log("✅ Users already exist or no new users added from CSV.");
                    }
                    else {
                        console.log(`✅ Created ${createdCount} users from users.csv`);
                    }
                    resolve();
                }
                catch (error) {
                    console.error("❌ Error seeding users from CSV:", error);
                    reject(error);
                }
            },
            error: (error) => {
                console.error("❌ Error parsing users.csv:", error);
                reject(error);
            },
        });
    });
}
async function addDummyReviews() {
    const userCount = await user_model_js_1.UserTable.count();
    const itemCount = await item_model_js_1.ItemTable.count();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R1', location: 'seeder:addDummyReviews:start', message: 'Counts before seeding reviews', data: { userCount, itemCount }, timestamp: Date.now() }) }).catch(() => { });
    // #endregion
    if (userCount === 0 || itemCount === 0) {
        console.warn("⚠️  No users or items available to generate reviews.");
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R2', location: 'seeder:addDummyReviews:skip', message: 'Skipped due to missing users/items', data: { userCount, itemCount }, timestamp: Date.now() }) }).catch(() => { });
        // #endregion
        return;
    }
    const reviewCount = await review_model_js_1.ReviewTable.count();
    if (reviewCount > 0) {
        console.log("✅ Reviews already exist in the database.");
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R3', location: 'seeder:addDummyReviews:skipExisting', message: 'Reviews already present', data: { reviewCount }, timestamp: Date.now() }) }).catch(() => { });
        // #endregion
        return;
    }
    const numReviews = 30;
    let createdReviews = 0;
    // Get actual user IDs and item IDs from the database
    const users = await user_model_js_1.UserTable.findAll({ attributes: ['id'] });
    const items = await item_model_js_1.ItemTable.findAll({ attributes: ['id'] });
    const userIds = users.map(u => u.id);
    const itemIds = items.map(i => i.id);
    console.log(`ℹ️ Seeding reviews for ${itemIds.length} items using ${userIds.length} users.`);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R4', location: 'seeder:addDummyReviews:loopStart', message: 'Loop start counts', data: { itemIds: itemIds.length, userIds: userIds.length, numReviews }, timestamp: Date.now() }) }).catch(() => { });
    // #endregion
    let loopLogCount = 0;
    for (const itemId of itemIds) {
        if (loopLogCount < 1) {
            fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R6', location: 'seeder:addDummyReviews:itemLoop', message: 'Entering item loop', data: { itemId }, timestamp: Date.now() }) }).catch(() => { });
        }
        for (let j = 0; j < numReviews; ++j) {
            const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
            if (!randomUserId)
                continue; // Skip if no valid user ID
            const rating = Math.round(Math.random() * 5 * 4) / 4; // Make sure rating increases in 0.25
            const includeReviewTxt = Math.random() > 0.1;
            const reviewData = {
                userId: randomUserId,
                itemId,
                rating,
                reviewTxt: includeReviewTxt ? `Review ${j}` : undefined,
            };
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R7a', location: 'seeder:addDummyReviews:preTry', message: 'Before try-create', data: { itemId, userId: randomUserId, rating, includeReviewTxt }, timestamp: Date.now() }) }).catch(() => { });
            // #endregion
            try {
                if (loopLogCount < 5) {
                    fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R7', location: 'seeder:addDummyReviews:beforeCreate', message: 'Before create review', data: { itemId, userId: randomUserId, rating, includeReviewTxt }, timestamp: Date.now() }) }).catch(() => { });
                    loopLogCount++;
                }
                const created = await review_model_js_1.ReviewTable.create(reviewData);
                createdReviews++;
                if (createdReviews <= 3) {
                    fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R7b', location: 'seeder:addDummyReviews:afterCreate', message: 'After create review', data: { itemId, userId: randomUserId, rating, createdId: created.id }, timestamp: Date.now() }) }).catch(() => { });
                }
            }
            catch (error) {
                console.error("❌ Error adding review: ", {
                    itemId,
                    userId: randomUserId,
                    error: error?.message ?? error,
                });
                fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R8', location: 'seeder:addDummyReviews:error', message: 'Error adding review', data: { itemId, userId: randomUserId, error: String(error) }, timestamp: Date.now() }) }).catch(() => { });
            }
        }
    }
    if (createdReviews > 0) {
        console.log(`✅ Created ${createdReviews} dummy reviews`);
    }
    else {
        console.warn("⚠️ No reviews were created.");
    }
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/094a5619-8538-4be4-981f-bdad40449a52', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'run-reviews', hypothesisId: 'R5', location: 'seeder:addDummyReviews:end', message: 'Finished seeding reviews', data: { createdReviews }, timestamp: Date.now() }) }).catch(() => { });
    // #endregion
}
//# sourceMappingURL=seeder.js.map