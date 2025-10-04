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

type Group = {
    id: number;
    name: string;
    description: string;
    maxCapacity: number;
    leader: User;
    accessLevel: number;
    createTime: Date;
    updateTime: Date;
    participants: User[];
}