import React from "react";
import {ProductItemType} from "./api/product";
import {UserInfoType} from "./api/user";
import {UserLoadType} from "./api/orderForm";

// 头部导航类型
export interface NavType {
	id: string;
	title: string;
	link: string;
}

// 用户按钮类型
export interface UserBtnType {
	id: string;
	title: string;
	link: string;
}

// 模块标题数据类型
export interface ModuleTitleType {
	title: string;
	subTitle: string;
}

// 基础的组件传递类型
export interface BaseProps {
	style?: React.CSSProperties;
}

// 商品表格类型
export interface ProductTableType extends ProductItemType {
	key: React.Key;
	modify: boolean;
}

// 用户表格类型
export interface UserTableType extends UserInfoType {
	key: React.Key;
	modify: boolean;
}

// 用户收货地址表格类型
export interface UserLoadTableType extends UserLoadType {
	key: React.Key;
	modify: boolean;
}

// 底部二维码类型
export interface BottomQrType {
	id: number;
	qrCode: string;
	title: string;
}
