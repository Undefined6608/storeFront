export interface UserBtnStatus {
	status: boolean;
}

export type NotificationType = "success" | "info" | "warning" | "error";

export interface MessageStatus {
	message: string;
	description: string;
	typeStatus: NotificationType;
}
