import { User, RegisterRequest } from '../types';
export declare class UserModel {
    private static users;
    static create(userData: RegisterRequest): User;
    static findByEmail(email: string): User | undefined;
    static getAll(): User[];
    static getCount(): number;
}
