import React from "react";
import { useAppSelector } from "@/app/hooks";
import { fetchUserInfo } from "@/store/reducers/userInfoSlice";
import "@/styles/pages/user.scss";

export const User: React.FC = () => {
	const userInfo = useAppSelector(fetchUserInfo);
	return (
		<div>
			{
				userInfo ?
					<div className={"container user"}>
						<span>{userInfo.userName}</span>
						<span>{userInfo.phone}</span>
						<span>{userInfo.email}</span>
						<span>{userInfo.gender ? "女" : "男"}</span>
						<span>{userInfo.avatar}</span>
						<span>{userInfo.limitType}</span>
						<span>{userInfo.integral}</span>
						<span>{userInfo.balance}</span>
						<span>{userInfo.likeNum}</span>
						<span>{userInfo.dontLike}</span>
						<span>{userInfo.uid}</span>
					</div> :
					null
			}
		</div>
	);
};
