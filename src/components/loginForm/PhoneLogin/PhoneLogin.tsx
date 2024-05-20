import React, { useEffect, useState } from "react";
import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input, Checkbox, Flex } from "antd";
import "../loginType.scss";
import { getImgVerifyCode } from "@/api/verifyCodeApi";
import { PhoneLoginType } from "@/types/request/userRequest";
import { phoneLogin } from "@/api/userApi";
import { loginSuccess } from "@/config/request";
import { passwordEncryption } from "@/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { userInfoAsync } from "@/store/actions/userInfoAction";
import { setMessageStatus } from "@/store/reducers/messageSlice";
import { formRule, LoginRegExp } from "@/utils/rules";

export const PhoneLogin: React.FC = () => {

	const [imgCode, setImgCode] = useState<string>("");

	const history = useNavigate();

	const dispatch = useAppDispatch();

	const onFinish = async (values: PhoneLoginType) => {
		if (!values.remember)
			return dispatch(
				setMessageStatus(
					{
						typeStatus: "warning",
						message: "登录失败",
						description: "请先同意《用户隐私协议》和《用户使用协议》",
					},
				),
			);
		// 进行密码加密
		values.password = passwordEncryption(values.password);
		const result = await phoneLogin(values);
		if (result.code !== 200)
			return dispatch(
				setMessageStatus(
					{ typeStatus: "error", message: result.msg, description: result.msg },
				),
			);
		loginSuccess(result.data.token);
		dispatch(userInfoAsync());
		dispatch(
			setMessageStatus({ typeStatus: "success", message: "登录成功", description: result.msg }),
		);
		history("/");
	};

	const getImgCode = async () => {
		const result = await getImgVerifyCode();
		setImgCode(result.data.img);
	};

	const handlerImg: React.MouseEventHandler = () => {
		getImgCode();
	};

	useEffect(() => {
		getImgCode();
	}, []);

	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			labelCol={{ md: 5 }}
			onFinish={onFinish}
		>
			<Form.Item
				label="电话号码："
				className="login-item"
				name="phone"
				htmlFor="phone"
				rules={[
					{ required: true, message: "请输入电话号码" },
					{ required: true, message: "电话号码不能为空！" }, {
						pattern: LoginRegExp.phone,
						whitespace: false,
						message: "电话号码格式错误",
					},
				]}
			>
				<Input
					id="phone"
					className="login-input"
					autoComplete={"phone"}
					prefix={
						<PhoneOutlined className="site-form-item-icon" />
					}
					placeholder="请输入电话号码" />
			</Form.Item>
			<Form.Item
				label="密码："
				name="password"
				className="login-item"
				htmlFor="password"
				rules={[{ required: true, message: "请输入密码" }]}
			>
				<Input.Password
					id="password"
					className="login-input"
					autoComplete={"new-password"}
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="请输入密码"
				/>
			</Form.Item>
			<Form.Item
				label="图像验证码(区分大小写)："
				className="login-item"
				name="imgCode"
				htmlFor={"phone-imgCode"}
				rules={formRule.imgCode}>
				<Flex>
					<Input id={"phone-imgCode"} className="login-input" placeholder={"请输入验证码"} />
					{
						imgCode ?
							<img
								className={"img-code"}
								src={imgCode}
								title="点击刷新图像验证码"
								onClick={handlerImg}
								alt={"imgCode"}
							/> :
							null
					}
				</Flex>
			</Form.Item>
			<Form.Item
				className="login-item">
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>
						<div className={"check"}>
							<span className={"check-item"}>我同意</span>
							<Link className={"check-item"} to={""}>《用户隐私协议》</Link>
							<Link className={"check-item"} to={""}>《用户使用协议》</Link>
						</div>
					</Checkbox>
				</Form.Item>
			</Form.Item>
			<Form.Item
				className="login-item">
				<Button type="primary" htmlType="submit" className="login-form-button">
					登录
				</Button>
			</Form.Item>
			<Form.Item
				className="login-item">
				<Link to="/register" className={"login-link"}>注册</Link>
				<Link to="/forgotPassword" className={"login-link"}>忘记密码</Link>
			</Form.Item>
		</Form>
	);
};
