export interface IQuestion {
    currentPage: number;
    pages: number;
    data: IQuestionData[];
}

export interface IQuestionData {
    id: string;
    title: string;
    description: string;
    author: IAuthor;
    level: number;
    tags: string[];
    files: IFiles[];
    testCases: ITestCases[];
    createdAt: string;
    updatedAt: string;
}

export interface IAuthor {
    username: string;
}

export interface IFiles {
    id?: string;
    url: string;
    key: string;
    originalName?: string;
}

export interface ITestCases {
    input: string;
    output: string;
    published: boolean;
}