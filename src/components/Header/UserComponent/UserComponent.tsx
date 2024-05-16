import React from "react";
import "./userComponent.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchUserInfo } from "@/store/reducers/userInfoSlice";
import { getUserBtnStatus, setUserBtnStatus } from "@/store/reducers/userBtnStatusSlice";

export const UserComponent = () => {
	const history = useNavigate();
	const userInfo = useAppSelector(fetchUserInfo);
	const dispatch = useAppDispatch();
	const show = useAppSelector(getUserBtnStatus);

	const loginHandler = () => {
		history("/login");
	};

	const showUserBtn = () => {
		dispatch(setUserBtnStatus({ status: !show?.status }));
	};
	return (
		<div className="user-component">
			<div className="user-icon">
				{
					userInfo?.avatar ?
						<img
							className="img"
							src={userInfo.avatar}
							onClick={showUserBtn}
							title={userInfo.userName}
							alt={"userAvatar"}
						/> :
						<img
							className="img"
							src="static/icon/avatar.png"
							alt="userIcon" title="登录"
							onClick={loginHandler}
						/>
				}
			</div>
		</div>
	);
};
