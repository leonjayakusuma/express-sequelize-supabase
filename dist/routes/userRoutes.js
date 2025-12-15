"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const router = express_1.default.Router();
router.route('/').get(userController_js_1.getUsers).post(userController_js_1.createUser);
router.route('/:id').get(userController_js_1.getUserById);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map