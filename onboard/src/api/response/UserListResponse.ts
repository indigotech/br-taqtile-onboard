import { User } from "../../app/user";

export class UserListResponse {
    data: User[];
    pagination: Pagination
}

export class Pagination {
    page: 1;
    total: 59;
    totalPages: 59;
    window: 1;
}