export interface UserLoginResponse {
    data: {
        user: {
            id: number;
            active: boolean;
            email: string;
            activationToken: string;
            createdAt: string;
            updatedAt: string;
            salt: string;
            name: string;
            role: string;
        },
        token: string;
    }
}