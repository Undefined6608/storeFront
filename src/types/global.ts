export interface UserBtnStatus {
	status: boolean;
}

export type NotificationType = "success" | "info" | "warning" | "error";

export interface MessageStatus {
	message: string;
	description: string;
	typeStatus: NotificationType;
}

export interface SearchListStatus {
	status: boolean;
}

export interface ModalTipsStatus {
	open: boolean;
	title: string;
	message: string;
	content: string[];
}