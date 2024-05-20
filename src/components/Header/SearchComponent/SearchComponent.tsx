import React, { useState, useRef } from "react";
import { SearchList } from "../SearchList/SearchList";
import { useAppDispatch } from "@/app/hooks";
import { setSearchListStatus } from "@/store/reducers/searchListStatusSlice";

export const SearchComponent: React.FC = () => {

	// 输入框内容
	const [inputValue, setInputValue] = useState("");

	// 输入框提示
	const [tipShow, setTipShow] = useState(true);

	// 输入框组件
	const inputRef = useRef<HTMLInputElement>(null);

	// 开启搜索列表
	const dispatch = useAppDispatch();

	/**
	 * 更新输入框内部组件显示内容
	 * @param ev 组件输入事件参数
	 */
	const updateTipShow = (ev: React.FormEvent<HTMLInputElement>) => {
		const target = ev.target as HTMLInputElement;
		setInputValue(target.value);
		if (target.value === "") {
			setTipShow(true);
			dispatch(setSearchListStatus({ status: false }));
			return;
		}
		setTipShow(false);
		dispatch(setSearchListStatus({ status: true }));
	};

	/**
	 * 键盘监听事件
	 */
	onkeydown = (ev) => {
		// console.log(ev)
		// Ctrl + K 快捷键 ---- 快捷选中
		if (ev.ctrlKey && ev.code === "KeyK") {
			ev.preventDefault();
			inputRef.current?.focus();
			return;
		}
		// esc 快捷键 ---- 快捷取消
		if (ev.code === "Escape") {
			inputRef.current?.blur();
			setInputValue("");
			setTipShow(true);
			dispatch(setSearchListStatus({ status: false }));
			return;
		}
	};

	return (
		<div className="w-1/4 h-10 relative text-center border-solid border-b-2 border-black">
			<input
				type="text"
				name={"search"}
				className={"w-full h-full border-none rounded-md leading-6 text-xl bg-transparent p-3 focus:outline-none"}
				onInput={updateTipShow}
				value={inputValue}
				ref={inputRef}
				placeholder={"Search Documentation..."} />
			<span className={"absolute top-0 right-2 inline-block w-14 h-5 leading-5 m-2 text-xs bg-white rounded-sm text-gray-400 border-solid border-black"}>
				{tipShow ? "CTRL K" : "ESC"}
			</span>
			<SearchList />
		</div>
	);
};