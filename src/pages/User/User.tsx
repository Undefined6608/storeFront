import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchUserInfo, removeUserInfo } from "@/store/reducers/userInfoSlice";
import { Avatar, Card, Form, Input, Select, Button, Modal, Flex } from "antd";
import "./user.scss";
import { setMessageStatus } from "@/store/reducers/messageSlice";
import { ModalTipsStatus } from "@/types/global";
import { logout, modifyUserInfoApi } from "@/api/userApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getImgVerifyCode, sendEmailCode } from "@/api/verifyCodeApi";
import { ModifyUserInfoType } from "@/types/request/userRequest";

export const User: React.FC = () => {

	// 用户信息
	const userInfo = useAppSelector(fetchUserInfo);

	// 用户信息状态/是否更改
	const [userInfoStatus, setUserInfoStatus] = useState(false);

	// 拉取store更改方法
	const dispatch = useAppDispatch();

	// 获取路由
	const history = useNavigate();

	// 弹出框
	const [modalTips, setModalTips] = useState<ModalTipsStatus>({ open: false, title: "", message: "", content: [] });
	const [modalTips1, setModalTips1] = useState<ModalTipsStatus>({ open: false, title: "", message: "", content: [] });

	// 图像验证码
	const [imgCode, setImgCode] = useState("");

	// 邮箱验证码按钮状态
	const [emailBtnStatus, setEmailBtnStatus] = useState(false);
	const [emailCodeBtnStatus, setEmailCodeBtnStatus] = useState("获取邮箱验证码");

	// 邮箱验证码倒计时状态
	let timer: NodeJS.Timer | null = null;
	let btnTimer = 60;

	// 用户信息上传参数
	const [userInfoParams, setUserInfoParams] = useState<ModifyUserInfoType>({
		userName: "",
		phone: "",
		email: "",
		avatar: "",
		gender: 1,
		emailCode: "",
		imgCode: "",
	});

	// 向修改用户信息参数中赋值
	const handlerUserInfoParams = () => {
		if (userInfo) {
			setUserInfoParams({
				userName: userInfo.userName,
				phone: userInfo.phone,
				email: userInfo.email,
				avatar: userInfo.avatar,
				gender: userInfo.gender ? 2 : 1,
				emailCode: "",
				imgCode: "",
			});
		}
	};

	// 获取图像验证码
	const getImgCode = async () => {
		const result = await getImgVerifyCode();
		setImgCode(result.data.img);
	};

	// 获取邮箱验证码
	const getEmailCode = async () => {
		if (timer != null) return;
		if (userInfoParams.email === "")
			return dispatch(
				setMessageStatus({ typeStatus: "warning", message: "发送失败", description: "邮箱为空" }),
			);
		setEmailBtnStatus(true);
		const result = await sendEmailCode(userInfoParams.email);
		if (result.code !== 200)
			return dispatch(
				setMessageStatus({ typeStatus: "error", message: "发送失败", description: result.msg }),
			);
		dispatch(
			setMessageStatus({ typeStatus: "success", message: "发送成功", description: result.msg }),
		);
		timer = setInterval(() => {
			if (btnTimer == 0 && timer) {
				setEmailBtnStatus(false);
				setEmailCodeBtnStatus("重新获取");
				clearInterval(timer);
				return;
			}
			btnTimer--;
			setEmailCodeBtnStatus(btnTimer.toString()+"s 后重新获取");
		}, 1000);
	};

	// 用户修改
	const handlerModify = () => {
		// 打开修改状态
		setUserInfoStatus(true);
		// 提交用户修改
		if (userInfoStatus) {
			uploadUserInfo();
		}
	};

	// 取消修改
	const handlerCancel = () => {
		setUserInfoStatus(false);
	};

	// 提交用户修改
	const uploadUserInfo = () => {
		setModalTips1({
			title: "确认要修改用户信息吗？",
			message: "",
			content: [],
			open: true,
		});
	};

	// 退出登录
	const handlerLogout = () => {
		// 弹出对话框
		setModalTips({
			open: true,
			title: "退出登录",
			message: "",
			content: ["确定退出登录吗？"],
		});
	};

	// 弹出框点击确定
	const handlerModalOk = async () => {
		closeModal();
		// 进行退出登录
		const res = await logout();
		if (res.code === 200) {
			dispatch(
				setMessageStatus(
					{ typeStatus: "success", message: "退出成功", description: res.msg },
				),
			);
			Cookies.remove("token");
			dispatch(removeUserInfo(null));
			history("/");
		}
	};

	// 修改确定框点击确定
	const handlerModifyOk = async () => {
		const res = await modifyUserInfoApi(userInfoParams);
		if (res.code !== 200) {
			dispatch(
				setMessageStatus({ typeStatus: "error", message: "修改失败", description: res.msg }),
			);
			return;
		}
		dispatch(setMessageStatus({ message: "修改成功！", description: "", typeStatus: "success" }));
		closeModal();
		setUserInfoStatus(false);
	};

	// 弹出框点击取消
	const handlerModalCancel = () => {
		closeModal();
	};

	// 关闭弹出框
	const closeModal = () => {
		setModalTips({ open: false, title: "", message: "", content: [] });
		setModalTips1({ open: false, title: "", message: "", content: [] });
	};

	// 第一次加载
	useEffect(() => {
		getImgCode();
	}, []);

	// 每次加载页面
	useEffect(() => {
		handlerUserInfoParams();
	}, [userInfo]);

	return (
		<div>
			{
				userInfo ?
					<div className={"container-page user"}>
						<Card title="用户信息" className="w-4/5 mt-3">
							<div className="flex justify-center flex-wrap pr-10">
								<div className="card-left w-1/4 flex flex-col items-center border-r-2">
									<Avatar src={userInfoParams.avatar} size={128} />
									<span className={"text-xl mt-3"}>{userInfo.userName}</span>
								</div>
								<Form labelCol={{ span: 4 }} className={"flex-1 text-left"}>
									<Form.Item htmlFor="username" label="用户名：">
										<Input id="username" autoComplete="username" value={userInfoParams.userName} disabled={!userInfoStatus} onChange={e=>setUserInfoParams({...userInfoParams,userName:e.target.value})} />
									</Form.Item>
									<Form.Item htmlFor="phone" label="手机号：">
										<Input id="phone" autoComplete="phone" value={userInfoParams.phone} disabled={!userInfoStatus} onChange={e=>setUserInfoParams({...userInfoParams,phone:e.target.value})}/>
									</Form.Item>
									<Form.Item htmlFor="email" label="邮箱：">
										<Input id="email" autoComplete="email" value={userInfoParams.email} disabled={!userInfoStatus} onChange={e=>setUserInfoParams({...userInfoParams,email:e.target.value})}/>
									</Form.Item>
									{
										userInfoStatus ?
											<Form.Item htmlFor="emailCode" label="邮箱验证码：">
												<Flex>
													<Input id="emailCode" value={userInfoParams.emailCode} onChange={e=>setUserInfoParams({...userInfoParams,emailCode:e.target.value})}/>
													<Button type="primary" disabled={emailBtnStatus} onClick={getEmailCode}>{emailCodeBtnStatus}</Button>
												</Flex>
											</Form.Item> :
											null
									}
									<Form.Item htmlFor="gender" label="性别：">
										<Select id="gender" value={userInfoParams.gender} disabled={!userInfoStatus} onChange={value=>setUserInfoParams({...userInfoParams,gender:value})}>
											<Select.Option value={1}>男</Select.Option>
											<Select.Option value={2}>女</Select.Option>
										</Select>
									</Form.Item>
									{
										userInfoStatus ?
											<Form.Item htmlFor="imgCode" label="图像验证码：">
												<Flex>
													<Input id="imgCode" value={userInfoParams.imgCode} onChange={e=>setUserInfoParams({...userInfoParams,imgCode:e.target.value})}/>
													<img className={"h-8 cursor-pointer"} title="点击更换图像验证码" onClick={getImgCode} src={imgCode} alt="imgCode" />
												</Flex>
											</Form.Item>
											: null
									}
									<Form.Item label="权限：" htmlFor="limit">
										<Select id="limit" value={userInfo.limitType} disabled>
											<Select.Option value={0}>管理员</Select.Option>
											<Select.Option value={1}>商户</Select.Option>
											<Select.Option value={2}>普通用户</Select.Option>
										</Select>
									</Form.Item>
									<Form.Item label="积分：" htmlFor="integral">
										<Input id="integral" value={userInfo.integral} disabled />
									</Form.Item>
									<Form.Item label="余额：" htmlFor="balance">
										<Input id="balance" value={userInfo.balance} disabled />
									</Form.Item>
									<Form.Item label="关注数：" htmlFor="likeNum">
										<Input id="likeNum" value={userInfo.likeNum} disabled />
									</Form.Item>
									<Form.Item label="被踩数：" htmlFor="dontLike">
										<Input id="dontLike" value={userInfo.dontLike} disabled />
									</Form.Item>
									<Form.Item label="用户唯一标识：" htmlFor="uid">
										<Input id="uid" value={userInfo.uid} disabled />
									</Form.Item>
									<Form.Item className="w-full text-center">
										<Flex className="items-center justify-around">
											<Button type="primary" className={"flex-1 mr-10 ml-10"} onClick={handlerModify}>修改</Button>
											{
												userInfoStatus ?
													<Button type="default" className={"flex-1 mr-10"} onClick={handlerCancel}>取消</Button> :
													null
											}
											<Button type="default" danger className={"flex-1 mr-10"} onClick={handlerLogout}>退出登录</Button>
										</Flex>
									</Form.Item>
								</Form>
							</div>
						</Card>
						<Modal title={modalTips.title} open={modalTips.open} onOk={handlerModalOk} onCancel={handlerModalCancel}>
							{
								modalTips.content.map((item, index) => {
									return <p key={index + "modalTips"}>{item}</p>;
								})
							}
						</Modal>
						<Modal title={modalTips1.title} open={modalTips1.open} onOk={handlerModifyOk} onCancel={handlerModalCancel}>
							{
								modalTips.content.map((item, index) => {
									return <p key={index + "modalTips1"}>{item}</p>;
								})
							}
						</Modal>
					</div> :
					null
			}
		</div>
	);
};
