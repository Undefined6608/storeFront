import React from "react";
import "@/styles/components/header/userComponent.scss";
import { userInfoType } from "@/types/api/user";
import { useSelector } from "react-redux";

export const UserComponent = () => {
	const avatar = useSelector((state: userInfoType) => state.avatar);
	const loginHandler = () => {
		console.log("login");

	};
	return (
		<div className="user-component">
			<div className="user-icon">
				{
					avatar ?
						<img className="img" src={avatar} /> :
						<img className="img" src="static/icon/avatar.png" alt="" onClick={loginHandler} />
				}
			</div>
		</div>
	);
};