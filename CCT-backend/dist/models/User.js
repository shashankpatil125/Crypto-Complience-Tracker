"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    static create(userData) {
        const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            email: userData.email,
            password: userData.password,
            companyName: userData.companyName,
            createdAt: new Date()
        };
        this.users.push(newUser);
        return newUser;
    }
    static findByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    static getAll() {
        return this.users;
    }
    static getCount() {
        return this.users.length;
    }
}
exports.UserModel = UserModel;
UserModel.users = [];
//# sourceMappingURL=User.js.map