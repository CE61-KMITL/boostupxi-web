export interface IQuestion {
    currentPage: number;
    pages: number;
    data: IQuestionData[];
}

export interface IQuestionData {
    _id: string;
    title: string;
    description: string;
    author: IAuthor;
    level: number;
    tags: string[];
    files: IFiles[];
    testcases: ITestCases[];
    createdAt: string;
    updatedAt: string;
    passedByUser: boolean;
    userPassCount: number;
    score: number;
    hintCost: number;
    hasHint: boolean;
    hint?: string;
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