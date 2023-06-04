export interface ILeaderboard {
    currentPage: number;
    pages: number;
    data: ILeaderboardData[] | never[];
}

export interface ILeaderboardGroup {
    _id: string;
    score: number;
    rank: number;
}

export interface ILeaderboardData {
    username: string;
    score: number;
    group: string;
    rank: number;
}