import { writable, type Writable } from 'svelte/store';
import type { IQuestionData } from '$/interface/question';
import { questionService } from '$/services/question.services';

export const questionDataStore: Writable<IQuestionData[]> = writable<IQuestionData[]>([]);
export const questionPage: Writable<number> = writable<number>(0);

export const fetchQuestionData = async (page: number) => {
	const response = await questionService.getQuestions(page);
	questionDataStore.set(response.data);
	questionPage.set(response.pages);
};
