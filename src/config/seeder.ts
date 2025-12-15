import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { ItemTagTable } from "../models/itemTag.model.js";
import { ItemTable } from "../models/item.model.js";
import { TagTable } from "../models/tag.model.js";
import { UserTable } from "../models/user.model.js";
import { RecipeTable } from "../models/recipe.model.js";
import { ReviewTable } from "../models/review.model.js";
import bcrypt from "bcrypt";
import { IngredientTable } from "../models/ingredient.model.js";
import { RecipeIngredientTable } from "../models/recipeIngredient.model.js";
import { InstructionTable } from "../models/instruction.model.js";
import { ActivityLevelTable } from "../models/activityLevel.model.js";
import { HealthGoalTable } from "../models/healthGoal.model.js";
import { DietaryPreferenceTable } from "../models/dietaryPreference.model.js";
import sequelize from "./database.js";

const projectRoot = path.resolve(__dirname, "../..");

type ItemCSVRowType = {
    id: string;
    title: string;
    desc: string;
    tags: string;
    price: string;
    discount: string;
};

type RecipeCSVRowType = {
    id: string;
    name: string;
    calories: string;
    carbs: string;
    fat: string;
    protein: string;
    ingredients: string;
    instructions: string;
    link: string;
};

type UserCSVRowType = {
    name: string;
    email: string;
    pswd: string;
};

export async function populateDb() {
    try {
        console.log("🌱 Starting database population...");
        await addOtherData();
        await addItems();
        await setSpecialItemsIfNoneExist();
        await addRecipes();
        await addDummyUsers();
        await addDummyReviews();
        console.log("✅ Database population completed");
    } catch (error) {
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
        const [, created] = await ActivityLevelTable.findOrCreate({
            where: { name: activityLevelName },
        });
        if (created) {
            console.log(`  ✓ Created activity level: ${activityLevelName}`);
        }
    }

    for (const healthGoalName of healthGoalNames) {
        const [, created] = await HealthGoalTable.findOrCreate({
            where: { name: healthGoalName },
        });
        if (created) {
            console.log(`  ✓ Created health goal: ${healthGoalName}`);
        }
    }

    for (const dietaryPreferenceName of dietaryPreferenceNames) {
        const [, created] = await DietaryPreferenceTable.findOrCreate({
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
    const itemsCount = await ItemTable.count();
    if (itemsCount > 0) {
        console.log("✅ Items and tags already exist in the database.");
        return;
    }
    
    const csvPath = path.join(projectRoot, "src", "default", "items.csv");
    
    // Check if file exists
    if (!fs.existsSync(csvPath)) {
        console.warn(`⚠️  CSV file not found: ${csvPath}`);
        console.log("Skipping items import...");
        return;
    }
    
    const fileStream = fs.createReadStream(csvPath);

    // Since PapaParse is asynchronous, we need to use a promise
    // So I use resolve and reject
    return new Promise<void>((resolve, reject) => {
        Papa.parse(fileStream, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const items = results.data as ItemCSVRowType[];
                
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
                        
                        const rawId = (item as any).id ?? (item as any)["﻿id"];
                        const parsedId = rawId !== undefined && rawId !== null
                            ? parseInt(String(rawId).replace(/\uFEFF/g, ""), 10)
                            : null;

                        const newItem = await ItemTable.create({
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
                                if (!trimmedTag) continue;
                                
                                await TagTable.findOrCreate({
                                    where: { name: trimmedTag },
                                });

                                await ItemTagTable.findOrCreate({
                                    where: {
                                        itemId: itemId,
                                        tagName: trimmedTag,
                                    },
                                });
                            } catch (tagError) {
                                console.error(`  ❌ Error processing tag "${tagName}" for item "${item.title}":`, tagError);
                                // Continue with next tag
                            }
                        }
                    } catch (error) {
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
    const existingSpecial = await ItemTable.findAll({
        where: { isSpecial: true },
    });
    if(existingSpecial.length > 0) {
        console.log("✅ Specials already exist in the table.")
    }

    if (existingSpecial.length === 0) {
        const picked = await ItemTable.findAll({
            order: sequelize.random(),
            limit: 8,
        });


        const pickedIds = picked.map(p => p.id);


        await ItemTable.update(
            { isSpecial: true },
            { where: { id: pickedIds } }
        );

        console.log("✅ Special Items have been set.")

        await ItemTable.count({ where: { isSpecial: true } });

    }
}

async function addRecipes() {
    // Only do this if the table is empty
    const recipeCount = await RecipeTable.count();
    if (recipeCount > 0) {
        console.log("✅ Recipes already exist in the database.");
        return;
    }

    const csvPath = path.join(projectRoot, "src", "default", "recipes.csv");
    
    // Check if file exists
    if (!fs.existsSync(csvPath)) {
        console.warn(`⚠️  CSV file not found: ${csvPath}`);
        console.log("Skipping recipes import...");
        return;
    }

    const fileStream = fs.createReadStream(csvPath);

    // Since PapaParse is asynchronous, we need to use a promise
    // So I use resolve and reject
    return new Promise<void>((resolve, reject) => {
        Papa.parse(fileStream, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const recipes = results.data as RecipeCSVRowType[];
                
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
                        
                        const ingredients: string[] = [];
                        const instructions: string[] = [];

                        const newRecipe = await RecipeTable.create({
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
                            if (
                                ingredientsList[ingredientsList.length - 1] === ""
                            ) {
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
                            if (
                                instructionsList[instructionsList.length - 1] === ""
                            ) {
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
                            await IngredientTable.bulkCreate(
                                ingredients.map((ingredient) => ({
                                    name: ingredient,
                                })),
                                {
                                    ignoreDuplicates: true,
                                },
                            );

                            // Bulk create in RecipeIngredient table including the recipeId
                            await RecipeIngredientTable.bulkCreate(
                                ingredients.map((ingredient) => ({
                                    recipeId,
                                    ingredientName: ingredient,
                                })),
                            );
                        }

                        // Bulk create in Instruction table including the recipeId, and stepNo being the index + 1
                        if (instructions.length > 0) {
                            await InstructionTable.bulkCreate(
                                instructions.map((instruction, index) => ({
                                    recipeId,
                                    stepNo: index + 1,
                                    instruction,
                                })),
                            );
                        }
                    }
                    console.log(`✅ Recipes imported successfully. Created ${createdCount} recipes.`);
                    resolve();
                } catch (error) {
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
    const csvPath = path.join(projectRoot, "src", "default", "users.csv");

    if (!fs.existsSync(csvPath)) {
        console.warn(`⚠️  users.csv not found at ${csvPath}, skipping user seed`);
        return;
    }

    const fileStream = fs.createReadStream(csvPath);

    return new Promise<void>((resolve, reject) => {
        Papa.parse(fileStream, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const users = results.data as UserCSVRowType[];

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

                        const pswdHash = await bcrypt.hash(user.pswd, 10);

                        const [, created] = await UserTable.findOrCreate({
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
                    } else {
                        console.log(`✅ Created ${createdCount} users from users.csv`);
                    }
                    resolve();
                } catch (error) {
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

export async function addDummyReviews() {
    const userCount = await UserTable.count();
    const itemCount = await ItemTable.count();

    if (userCount === 0 || itemCount === 0) {
        console.warn("⚠️  No users or items available to generate reviews.");
        return;
    }

    const reviewCount = await ReviewTable.count();
    if (reviewCount > 0) {
        console.log("✅ Reviews already exist in the database.");
        return;
    }

    // Keep seeding bounded so we don't blow up the table on repeated runs.
    const maxReviews = 200;
    const numReviewsPerItem = 3;
    let createdReviews = 0;

    // Get actual user IDs and item IDs from the database
    const users = await UserTable.findAll({ attributes: ['id'] });
    const items = await ItemTable.findAll({ attributes: ['id'] });
    
    const userIds = users.map(u => u.id);
    const itemIds = items.map(i => i.id);

    console.log(`ℹ️ Seeding reviews for ${itemIds.length} items using ${userIds.length} users.`);

    let loopLogCount = 0;

    for (const itemId of itemIds) {
        for (let j = 0; j < numReviewsPerItem && createdReviews < maxReviews; ++j) {
            const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
            if (!randomUserId) continue; // Skip if no valid user ID
            
            const rating = Math.round(Math.random() * 5 * 4) / 4; // Make sure rating increases in 0.25
            const includeReviewTxt = Math.random() > 0.1;

            const reviewData = {
                userId: randomUserId,
                itemId,
                rating,
                reviewTxt: includeReviewTxt ? `Review ${j}` : undefined,
            };

            try {
                if (loopLogCount < 5) {
                    loopLogCount++;
                }

                const created = await ReviewTable.create(reviewData);
                createdReviews++;

                if (createdReviews >= maxReviews) {
                    break;
                }

                if (createdReviews <= 3) {
                }
            } catch (error) {
                console.error("❌ Error adding review: ", {
                    itemId,
                    userId: randomUserId,
                    error: (error as Error)?.message ?? error,
                });
            }
        }

        if (createdReviews >= maxReviews) {
            console.log(`ℹ️ Reached maxReviews limit (${maxReviews}), stopping review seeding.`);
            break;
        }
    }
    
    if (createdReviews > 0) {
        console.log(`✅ Created ${createdReviews} dummy reviews`);
    } else {
        console.warn("⚠️ No reviews were created.");
    }

}
