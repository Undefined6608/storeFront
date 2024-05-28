// 基本相应数据
export interface BaseResponseType<T> {
	code: number;
	msg: string;
	data: T;
}
