import { writable, type Writable } from "svelte/store";
import type { ISubmissionsResult } from "$/interface/submission";
import { questionService } from "$/services/question.services";

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

export const submissionDataStore: Writable<ISubmissionsResult> = writable(initialSubmissionData);

export const updateSubmissionData = async (id: string): Promise<void> => {
    const response = await questionService.getSubmission(id);
    submissionDataStore.set(response);
}