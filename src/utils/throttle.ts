import { useState, useCallback } from "react";

// 节流函数类型定义
/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ThrottledFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

/**
 * 定义节流工具函数
 * @param {Function} callback 每隔一段时间执行的函数
 * @param {number} delay 间隔时间
 * @returns 节流函数
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useThrottle = <T extends (...args: any[]) => any>(callback: T, delay: number):
	ThrottledFunction<T> => {
	const [lastExecTime, setLastExecTime] = useState(0);

	// 将回调函数包装为一个函数，防止每次更新时都重新创建一个函数
	const memoizedCallback = useCallback(callback, []);

	// 返回节流函数
	return useCallback(
		(...args: Parameters<T>) => {
			const currentTime = Date.now();
			if (currentTime - lastExecTime >= delay) {
				// 达到了间隔时间，执行回调
				memoizedCallback(...args);
				setLastExecTime(currentTime);
			}
		},
		[memoizedCallback, delay, lastExecTime],
	);
};

export default useThrottle;
