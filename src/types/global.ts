// 用户按钮状态
import React from "react";
import {ProductItemType} from "@/types/api/product";

export interface UserBtnStatus {
	status: boolean;
}

// 弹出框类型
export type NotificationType = "success" | "info" | "warning" | "error";

// 弹出框数据类型
export interface MessageStatus {
	message: string;
	description: string;
	typeStatus: NotificationType;
}

// 搜索列表状态类型
export interface SearchListStatus {
	status: boolean;
}

// 对话框数据类型
export interface ModalTipsStatus {
	open: boolean;
	title: string;
	message: string;
	content: string[];
}

// 用户操作模块盒子显示状态
export interface UserModuleBoxStatus {
	addProduct: boolean;
	payProduct: boolean;
	addUserLoad: boolean;
}

// 购物车数据
export interface ShoppingCartStatus extends ProductItemType {
	key: React.Key;
	num: number;
	loadId: number;
}
