export const generateRankPrefix = (number: number): string => {
	const suffixes = ['st', 'nd', 'rd'];
	const remainder10 = number % 10;
	const remainder100 = number % 100;

	if (remainder10 >= 1 && remainder10 <= 3 && (remainder100 < 10 || remainder100 > 20)) {
		return `${number}${suffixes[remainder10 - 1]}`;
	}
	return `${number}th`;
};
