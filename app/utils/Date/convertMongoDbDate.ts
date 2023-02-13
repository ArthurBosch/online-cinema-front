export const converMongoDate = (date: string) =>
	new Date(date).toLocaleDateString('us')
