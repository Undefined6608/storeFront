import React, {useState} from "react";
import "@/styles/components/header/userComponent.scss";
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {fetchUserInfo} from "@/store/reducers/userInfoSlice";
import {setUserBtnStatus} from "@/store/reducers/userBtnStatusSlice";

export const UserComponent = () => {
	const history = useNavigate();
	const userInfo = useAppSelector(fetchUserInfo);
	const dispatch = useAppDispatch();
	const [show,setShow] = useState<boolean>(false);

	const loginHandler = () => {
		history("/login");
	};

	const showUserBtn = () =>{
		setShow(!show);
		dispatch(setUserBtnStatus({status: !show}));
	};
	return (
		<div className="user-component">
			<div className="user-icon">
				{
					userInfo?.avatar ?
						<img className="img" src={userInfo.avatar} onClick={showUserBtn} title={userInfo.userName} alt={"userAvatar"}/> :
						<img className="img" src="static/icon/avatar.png" alt="userIcon" title="登录" onClick={loginHandler} />
				}
			</div>
		</div>
	);
};
