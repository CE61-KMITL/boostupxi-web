export interface ILeaderboard {
    currentPage: number;
    pages: number;
    data: ILeaderboardData[] |  never[];
}

export interface ILeaderboardData {
    username: string;
    score: number;
    group: string;
}