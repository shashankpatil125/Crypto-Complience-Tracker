"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.registerUser = void 0;
const User_1 = require("../models/User");
const registerUser = (req, res) => {
    try {
        const { email, password, companyName } = req.body;
        if (!email || !password || !companyName) {
            const response = {
                success: false,
                message: 'All fields (email, password, companyName) are required'
            };
            res.status(400).json(response);
            return;
        }
        const existingUser = User_1.UserModel.findByEmail(email);
        if (existingUser) {
            const response = {
                success: false,
                message: 'User with this email already exists'
            };
            res.status(409).json(response);
            return;
        }
        const newUser = User_1.UserModel.create({ email, password, companyName });
        const userResponse = {
            id: newUser.id,
            email: newUser.email,
            companyName: newUser.companyName,
            createdAt: newUser.createdAt
        };
        const response = {
            success: true,
            message: 'User registered successfully',
            data: userResponse
        };
        res.status(201).json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(response);
    }
};
exports.registerUser = registerUser;
const getAllUsers = (req, res) => {
    try {
        const usersWithoutPasswords = User_1.UserModel.getAll().map(user => ({
            id: user.id,
            email: user.email,
            companyName: user.companyName,
            createdAt: user.createdAt
        }));
        const response = {
            success: true,
            message: 'Users retrieved successfully',
            data: {
                users: usersWithoutPasswords,
                count: usersWithoutPasswords.length
            }
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(response);
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=userController.js.map