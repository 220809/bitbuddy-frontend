type User = {
    userId: number;
    username: string;
    slogan: string;
    email: string;
    userAccount: string;
    avatarUrl?: string;
    tags: string[];
    gender: number;
    status: number;
    createdAt: Date;
    userRole: number;
}

type Tag = {
    id: number;
    name: string;
}