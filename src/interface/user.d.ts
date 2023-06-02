export interface IUser {
	_id: string;
	email: string;
	username: string;
	score: number;
	role: string;
	group: string;
    rank: number;
    completedQuestionsCount: number;
	createdAt: string;
	updatedAt: string;
	tasks: never[];
}

export interface IEditProfile {
	username: string;
	password?: string;
}
