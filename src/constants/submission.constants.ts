import type { ISubmissionsResult } from '$/interface/submission';

export const initialSubmissionData: ISubmissionsResult = {
	_id: '',
	question: '',
	user: '',
	__v: 0,
	createdAt: '',
	result: '',
	updatedAt: '',
	source_code: '',
	status: false
};

export const initialSubmissionResult: string[] = [
	'C: Cannot Create File from Source Code',
	'L: Banned Library Usage,',
	'F: Banned Function Usage',
	'H: Hacker ',
	'W: Testcase Error',
	'S: Syntax Error',
	'T: Timeout',
	'O: Out of Buffer',
	'R: Runtime Error',
	'E: General Error',
	'P: Passed',
	'-: Failed'
];
