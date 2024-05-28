/**
 * describe: 缓存封装
 */

class Cache<T> {
	set(name: string, data: T): boolean {
		let result = false;
		try {
			localStorage.setItem(name, JSON.stringify(data));
			result = true;
		} catch (e) {
			// console.log(`设置缓存失败：${e}`);
		}
		return result;
	}

	get(name: string): T {
		let result = null;
		try {
			const value = localStorage.getItem(name);
			if (value) result = JSON.parse(value);
		} catch (e) {
			// console.log(`获取缓存失败：${e}`);
		}
		return result;
	}

	delete(name: string): boolean {
		let result = false;
		try {
			localStorage.removeItem(name);
			result = true;
		} catch (e) {
			// console.log(`删除缓存失败：${e}`);
		}
		return result;
	}

	has(name: string) {
		let result = false;
		try {
			const value = localStorage.getItem(name);
			if (value) result = true;
		} catch (e) {
			// console.log(`检查缓存是否存在失败：${e}`);
		}
		return result;
	}

	clear(): boolean {
		let result = false;
		try {
			localStorage.clear();
			result = true;
		} catch (e) {
			// console.log(`清除缓存失败：${e}`);
		}
		return result;
	}
}

export default Cache;
