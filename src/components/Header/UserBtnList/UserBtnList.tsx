import React, {useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {getUserBtnStatus, setUserBtnStatus} from "@/store/reducers/userBtnStatusSlice";
import "./userBtnList.scss";
import {Card, List} from "antd";
import {fetchUserInfo, removeUserInfo} from "@/store/reducers/userInfoSlice";
import {UserBtnType} from "@/types";
import {useNavigate} from "react-router-dom";
import {logout} from "@/api/userApi";
import Cookies from "js-cookie";
import {setMessageStatus} from "@/store/reducers/messageSlice";

export const UserBtnList: React.FC = () => {

	const userBtnStatus = useAppSelector(getUserBtnStatus);

	const dispatch = useAppDispatch();

	const userInfo = useAppSelector(fetchUserInfo);

	const history = useNavigate();

	const baseUserBtnList = useRef<UserBtnType[]>([
		{id: "user-btn-1", title: "用户信息", link: "/user"},
		{id: "user-btn-2", title: "收货地址", link: "/userLoad"},
		{id: "user-btn-3", title: "购物车", link: "/ShoppingCart"},
		// {id: "user-btn-4", title: "我的订单", link: "/orderForm"},
		{id: "user-btn-6", title: "修改密码", link: "/modifyPassword"},
		{id: "user-btn-7", title: "退出登录", link: "/"},
	]);

	const merchantBtnList = useRef<UserBtnType[]>([
		{id: "merchant-btn-1", title: "商品列表", link: "/productList"},
		// { id: "merchant-btn-2", title: "统计图表", link: "/charts" },
	]);

	const adminBtnList = useRef<UserBtnType[]>([
		{id: "admin-btn-1", title: "用户列表", link: "/userList"},
		// {id: "admin-btn-2", title: "查看用户反馈", link: "/feedBack"},
		// {id: "admin-btn-3", title: "全部商品类型列表", link: "/allProductType"},
		{id: "admin-btn-4", title: "全部商品列表", link: "/allProductList"},
	]);

	const btnHandler = async (value: UserBtnType) => {
		if (value.id === "user-btn-7") {
			// 调用退出登录接口
			const res = await logout();
			if (res.code === 200) {
				dispatch(
					setMessageStatus(
						{typeStatus: "success", message: "退出成功", description: res.msg},
					),
				);
				Cookies.remove("token");
				dispatch(removeUserInfo(null));
			}
		}
		history(value.link);
		closeHandler();
	};

	const closeHandler = () => {
		dispatch(setUserBtnStatus({status: false}));
	};

	return (
		<>
			{
				userBtnStatus?.status ?
					<div className={"mask"} onClick={closeHandler}>
						<div className={"user-btn-list"} onClick={event => event.stopPropagation()}>
							<Card title={"用户相关"}>
								<List>
									{
										baseUserBtnList.current.map(value => (
											<List.Item key={value.id}>
												<div
													className={"list-item"}
													onClick={() => btnHandler(value)}
												>
													{value.title}
												</div>
											</List.Item>
										))
									}
								</List>
							</Card>
							{
								userInfo?.limitType == 2 ?
									<Card title={"商品相关"}>
										<List>
											{
												merchantBtnList.current.map(value => (
													<List.Item key={value.id}>
														<div
															className={"list-item"}
															onClick={() => btnHandler(value)}
														>
															{value.title}
														</div>
													</List.Item>
												))
											}
										</List>
									</Card> :
									null
							}
							{
								userInfo?.limitType == 1 ?
									<Card title={"管理相关"}>
										<List>
											{
												adminBtnList.current.map(value => (
													<List.Item key={value.id}>
														<div
															className={"list-item"}
															onClick={() => btnHandler(value)}
														>
															{value.title}
														</div>
													</List.Item>
												))
											}
										</List>
									</Card> :
									null
							}
						</div>
					</div> :
					null
			}
		</>
	);
};
