import React from "react";
import { ProductItemType } from "./api/product";
import { UserInfoType } from "./api/user";

export interface NavType {
	id: string;
	title: string;
	link: string;
}

export interface UserBtnType {
	id: string;
	title: string;
	link: string;
}

export interface BaseProps {
	style?: React.CSSProperties;
}

export interface ProductTableType extends ProductItemType {
	key: React.Key;
	modify: boolean;
}

export interface UserTableType extends UserInfoType {
	key: React.Key;
	modify: boolean;
}

export interface BottomQrType {
	id: number;
	qrCode: string;
	title: string;
}