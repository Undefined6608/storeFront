export interface BaseResponseType<T> {
	code: number;
	msg: string;
	data: T;
}
