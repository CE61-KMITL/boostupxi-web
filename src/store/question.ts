import { writable } from "svelte/store";
import type { IQuestionData } from "../interface/question";
import { questionService } from "../services/question.services";

export const questionDataStore = writable<IQuestionData[]>([]);

export async function fetchQuestionData() {
    const response = await questionService.getQuestions();
    questionDataStore.set(response.data);
}
