export interface User {
    id: string;
    email: string;
    password: string;
    companyName: string;
    createdAt: Date;
}
export interface UserResponse {
    id: string;
    email: string;
    companyName: string;
    createdAt: Date;
}
export interface RegisterRequest {
    email: string;
    password: string;
    companyName: string;
}
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}
