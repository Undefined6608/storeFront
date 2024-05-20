import React, { useEffect } from "react";
import { notification } from "antd";
import { useAppSelector } from "@/app/hooks";
import { getMessageStatus } from "@/store/reducers/messageSlice";

export const MessageComponent: React.FC = () => {

	const [api, contextHolder] = notification.useNotification();

	const messageStatus = useAppSelector(getMessageStatus);

	useEffect(() => {
		if (messageStatus) {
			api[messageStatus.typeStatus]({
				message: messageStatus.message,
				description: messageStatus.description,
			});
		}

	}, [messageStatus]);

	return (
		<>
			{contextHolder}
		</>
	);
};
