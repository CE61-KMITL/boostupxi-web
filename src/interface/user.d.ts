export interface IUser {
    _id: string;
    email: string;
    username: string;
    score: number;
    role: string;
    group: string;
    createdAt: string;
    updatedAt: string;
    tasks: never[];
}