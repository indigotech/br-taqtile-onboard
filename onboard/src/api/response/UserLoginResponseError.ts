export class UserLoginErrorResponse {
    errors: UserLoginError[]
}

class UserLoginError {
    name: string;
    original: string;
    message: string;
}