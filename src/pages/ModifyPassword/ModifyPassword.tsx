import React, { useEffect, useState } from "react";
import "./modifyPassword.scss";
import { Button, Card, Flex, Form, Input, Modal } from "antd";
import { getImgVerifyCode } from "@/api/verifyCodeApi";
import { ModifyPasswordType } from "@/types/request/userRequest";
import { modifyPasswordApi } from "@/api/userApi";
import { useAppDispatch } from "@/app/hooks";
import { setMessageStatus } from "@/store/reducers/messageSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { passwordEncryption } from "@/utils";
import { removeUserInfo } from "@/store/reducers/userInfoSlice";

export const ModifyPassword: React.FC = () => {

	// 图像验证码
	const [imgCode, setImgCode] = useState("");

	// 修改密码数据
	const [formData, setFormData] = useState<ModifyPasswordType>({
		oldPassword: "",
		newPassword: "",
		verifiedPassword: "",
		imgCode: "",
	});

	// 弹出提示
	const [modal, setModal] = useState({
		title: "",
		open: false,
		content: [],
	});

	// store调用
	const dispatch = useAppDispatch();

	// 路由获取
	const history = useNavigate();

	// 获取图像验证码
	const getImgCode = async () => {
		const result = await getImgVerifyCode();
		setImgCode(result.data.img);
	};

	// 修改（更新）密码
	const uploadPassword = () => {
		setModal({ title: "确认要更新密码吗？", open: true, content: [] });
	};

	// 取消更新
	const cancel = () => {
		setFormData({ oldPassword: "", newPassword: "", verifiedPassword: "", imgCode: "" });
	};

	// 弹窗确定
	const handlerOk = async () => {
		// 表单数据
		const formVal = formData;

		// 密码加密
		formVal.oldPassword = passwordEncryption(formVal.oldPassword.trim());
		formVal.newPassword = passwordEncryption(formVal.newPassword.trim());
		formVal.verifiedPassword = passwordEncryption(formVal.verifiedPassword.trim());

		// 调用修改密码接口
		const result = await modifyPasswordApi(formData);

		// 响应值code是否为200
		if (result.code === 200) {
			// 弹出提示框
			dispatch(setMessageStatus({ typeStatus: "success", message: "密码修改成功", description: "请重新登录！" }));
			// 清除Cookie
			Cookies.remove("token");
			// 清除用户信息
			dispatch(removeUserInfo(null));
			// 跳转到登录页面
			history("/login");
		}
		// 关闭弹窗
		handlerCancel();
	};

	// 弹窗取消
	const handlerCancel = () => {
		setModal({ title: "", open: false, content: [] });
	};

	// 页面加载获取数据
	useEffect(() => {
		getImgCode();
	}, []);

	return (
		<>
			<div className={"container-page w-full modifyPassword flex flex-col items-end justify-center"}>
				<Card className={"w-4/5"} title="修改密码">
					<Form className="w-full" labelCol={{ md: 3 }}>
						<Form.Item label="旧密码" name="oldPassword" htmlFor="oldPwd">
							<Input.Password id="oldPwd" autoComplete="current-password" value={formData.oldPassword} onChange={(e) => {
								setFormData({ ...formData, oldPassword: e.target.value });
							}} />
						</Form.Item>
						<Form.Item label="新密码" name="newPassword" htmlFor="newPwd">
							<Input.Password id="newPwd" autoComplete="new-password" value={formData.newPassword} onChange={(e) => {
								setFormData({ ...formData, newPassword: e.target.value });
							}} />
						</Form.Item>
						<Form.Item label="再次输入新密码" name="verifiedPassword" htmlFor="verPwd">
							<Input.Password id="verPwd" autoComplete="new-password" value={formData.verifiedPassword} onChange={(e) => {
								setFormData({ ...formData, verifiedPassword: e.target.value });
							}} />
						</Form.Item>
						<Form.Item label="验证码" name="imgCode" htmlFor="imgCode">
							<Flex>
								<Input id="imgCode" className="flex-1 mr-3" value={formData.imgCode} onChange={(e) => {
									setFormData({ ...formData, imgCode: e.target.value });
								}} />
								<img className="w-1/5 h-8 cursor-pointer" src={imgCode} alt="验证码" onClick={getImgCode} />
							</Flex>
						</Form.Item>
						<Form.Item>
							<Flex className="items-center justify-around">
								<Button className="w-1/3" type="primary" onClick={uploadPassword}>提交</Button>
								<Button className="w-1/3" type="default" onClick={cancel}>取消</Button>
							</Flex>
						</Form.Item>
					</Form>
				</Card>
				<Modal title={modal.title} open={modal.open} onOk={ handlerOk } onCancel={ handlerCancel }>
					{
						modal.content.map((item, index) => {
							return <p key={index+"uploadPassword"}>{item}</p>;
						})
					}
				</Modal>
			</div>
		</>
	);
};
