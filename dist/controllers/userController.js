"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUsers = void 0;
let users = [];
let nextId = 1;
const getUsers = async (_req, res) => {
    try {
        return res.json({
            success: true,
            message: 'Users fetched successfully',
            data: users
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID',
        });
    }
    const userId = parseInt(id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    return res.json({
        success: true,
        message: 'User fetched successfully',
        data: user
    });
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    const name = req.body?.name || req.query?.name;
    const email = req.body?.email || req.query?.email;
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Name and email are required',
        });
    }
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address',
        });
    }
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists',
        });
    }
    // Create user with auto-incrementing ID
    const newUser = {
        id: nextId++,
        name: name,
        email: email,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
    });
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map