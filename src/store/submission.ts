import { initialSubmissionData, initialSubmissionResult } from "$/constants/submission.constants";
import type { ISubmissionsResult } from "$/interface/submission";
import { questionService } from "$/services/question.services";
import { writable, type Writable } from "svelte/store";

export const submissionResultStore: Writable<string[]> = writable(initialSubmissionResult);

export const submissionDataStore: Writable<ISubmissionsResult> = writable(initialSubmissionData);

export const updateSubmissionData = async (id: string): Promise<void> => {
    const response = await questionService.getSubmission(id);
    submissionDataStore.set(response);
}