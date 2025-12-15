"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const database_1 = require("./config/database");
const seeder_1 = require("./config/seeder");
const port = config_1.default.port;
const nodeEnv = config_1.default.nodeEnv;
// Connect to database before starting server
(0, database_1.connectDatabase)()
    .then(async () => {
    // Populate database with initial data
    try {
        await (0, seeder_1.populateDb)();
        console.log('✅ Database populated successfully');
    }
    catch (error) {
        console.error('⚠️  Error populating database:', error);
        // Don't exit - continue to start server even if seeding fails
    }
    app_1.default.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`📝 Environment: ${nodeEnv}`);
    });
})
    .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map