import axios, { AxiosPromise, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// 定义请求参数接口
interface IRequestParams {
	[key: string]: object | string | number;
}

export const baseUrl = process.env.REACT_APP_DEBUG_URL;
// export const baseUrl = process.env.REACT_APP_RELEASE_URL;

/**
 * 请求方法
 * @param method 请求方法名
 * @param url 请求地址
 * @param data 请求参数
 * @param token token
 */
const request = axios.create({
	baseURL: baseUrl,
	timeout: 10000,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// 请求拦截器
request.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		// 在这里可以添加请求头，例如添加认证 token
		const token = Cookies.get("token");
		if (token) {
			config.headers.Authorization = `${token}`;
		}
		return config;
	},
	(error) => {
		// 处理请求错误
		return Promise.reject(error);
	},
);

// 响应拦截器
request.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => {
		// 处理响应数据
		return response;
	},
	(error) => {
		// 处理响应错误
		if (error.response?.status === 401) {
			// 例如：如果未授权，可以跳转到登录页面
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);

/**
 * get 请求方法
 * @param url 请求地址
 * @param params 请求参数
 * @returns
 */
export function get<T>(url: string): AxiosPromise<T> {
	return request.get<T>(url);
}

/**
 * post 请求方法
 * @param url 请求地址
 * @param data 请求参数
 * @returns
 */
export function post<T>(url: string, data?: IRequestParams): AxiosPromise<T> {
	return request.post<T>(url, data);
}

/**
 * put 请求方法
 * @param url 请求地址
 * @param data 请求参数
 * @returns
 */
export function put<T>(url: string, data?: IRequestParams): AxiosPromise<T> {
	return request.put<T>(url, data);
}

/**
 * delete 请求方法
 * @param url 请求地址
 * @param params 请求参数
 * @returns
 */
export function del<T>(url: string): AxiosPromise<T> {
	return request.delete<T>(url);
}

/**
 * post 请求方法
 * @param url 请求地址
 * @param data 请求参数
 * @returns
 */
export function login<T>(url: string, data?: IRequestParams): AxiosPromise<T> {
	return request.post<T>(url, data);
}

/**
 * 登录成功
 * @param token token
 */
export const loginSuccess = (token: string) => {
	Cookies.set("token", token, { expires: 1, path: "/" });
};
