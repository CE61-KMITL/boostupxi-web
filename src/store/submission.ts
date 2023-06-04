import type { ISubmissionsResult } from "$/interface/submission";
import { questionService } from "$/services/question.services";
import { writable, type Writable } from "svelte/store";

export const initialSubmissionData: ISubmissionsResult = {
    _id: "",
    question: "",
    user: "",
    __v: 0,
    createdAt: "",
    result: "",
    updatedAt: "",
    source_code: "",
    status: false,
}

export const initialSubmissionResult: string[] = [
    "C: Cannot Create File from Source Code",
    "L: Banned Library Usage,",
    "F: Banned Function Usage",
    "H: Hacker ",
    "W: Testcase Error",
    "S: Syntax Error",
    "T: Timeout",
    "O: Out of Buffer",
    "R: Runtime Error",
    "E: General Error",
    "P: Passed",
    "-: Failed",
]

export const submissionResultStore: Writable<string[]> = writable(initialSubmissionResult);

export const submissionDataStore: Writable<ISubmissionsResult> = writable(initialSubmissionData);

export const updateSubmissionData = async (id: string): Promise<void> => {
    const response = await questionService.getSubmission(id);
    submissionDataStore.set(response);
}