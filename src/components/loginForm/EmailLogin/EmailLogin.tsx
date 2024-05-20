import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Checkbox, Flex } from "antd";
import "../loginType.scss";
import { getImgVerifyCode } from "@/api/verifyCodeApi";
import { EmailLoginType } from "@/types/request/userRequest";
import { emailLogin } from "@/api/userApi";
import { loginSuccess } from "@/config/request";
import { passwordEncryption } from "@/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { userInfoAsync } from "@/store/actions/userInfoAction";
import { setMessageStatus } from "@/store/reducers/messageSlice";
import { formRule, LoginRegExp } from "@/utils/rules";

export const EmailLogin: React.FC = () => {

	const [imgCode, setImgCode] = useState("");

	const history = useNavigate();

	const dispatch = useAppDispatch();

	const onFinish = (values: EmailLoginType) => {
		if (!values.remember) return;
		// 进行密码加密
		values.password = passwordEncryption(values.password);
		emailLogin(values).then(r => {
			if (r.code !== 200)
				return dispatch(
					setMessageStatus({ typeStatus: "error", message: "登录失败", description: r.msg }),
				);
			loginSuccess(r.data.token);
			dispatch(userInfoAsync());
			dispatch(
				setMessageStatus({ typeStatus: "success", message: "登录成功", description: r.msg }),
			);
			history("/");
		});
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
				label="邮箱："
				className="login-item"
				name="email"
				htmlFor="email"
				rules={[
					{ required: true, message: "请输入邮箱" },
					{
						pattern: LoginRegExp.email,
						whitespace: false,
						message: "邮箱格式错误",
					},
				]}
			>
				<Input
					id="email"
					className="login-input"
					autoComplete={"email"}
					prefix={
						<MailOutlined className="site-form-item-icon" />
					}
					placeholder="请输入邮箱地址"
				/>
			</Form.Item>
			<Form.Item
				label="密码："
				name="password"
				className="login-item"
				rules={[{ required: true, message: "请输入密码" }]}
				htmlFor="password"
			>
				<Input.Password
					id="password"
					className="login-input"
					prefix={<LockOutlined className="site-form-item-icon" />}
					autoComplete={"new-password"}
					type="password"
					placeholder="请输入密码"
				/>
			</Form.Item>
			<Form.Item
				label="图像验证码(区分大小写)："
				className="login-item"
				htmlFor={"email-imgCode"}
				name="imgCode"
				rules={formRule.imgCode}>
				<Flex>
					<Input
						id={"email-imgCode"}
						className="login-input"
						placeholder={"请输入验证码"}
					/>
					{
						imgCode ?
							<img
								className={"img-code"}
								title="点击刷新图像验证码"
								src={imgCode}
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
							<span className={"check-item"}>我已知晓</span>
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
