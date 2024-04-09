import React, {useEffect, useState} from "react";
import { LockOutlined, GlobalOutlined } from "@ant-design/icons";
import {Button, Form, Input, Checkbox, type GetProp, Flex} from "antd";
import "@/styles/components/loginForm/loginType.scss";
import {getImgVerifyCode} from "@/api/verifyCodeApi";
import {EmailLoginType} from "@/types/request/userRequest";
import {emailLogin} from "@/api/userApi";
import {loginSuccess} from "@/config/request";
import {passwordEncryption} from "@/utils";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/app/hooks";
import {userInfoAsync} from "@/store/actions/userInfoAction";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {LoginRegExp} from "@/utils/rules";

export const EmailLogin: React.FC = () => {
	const [imgCode, setImgCode] = useState("");
	const [code,setCode] = useState("");
	const history = useNavigate();
	const dispatch = useAppDispatch();
	const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
		setCode(text);
	};

	const sharedProps = {
		onChange,
	};

	const onFinish = (values: EmailLoginType) => {
		values.imgCode = code;
		if (!values.remember) return;
		// 进行密码加密
		values.password = passwordEncryption(values.password);
		emailLogin(values).then(r=>{
			if (r.code !== 200) return dispatch(setMessageStatus({typeStatus:"error", message:"登录失败",description:r.msg}));
			loginSuccess(r.data.token);
			dispatch(userInfoAsync());
			dispatch(setMessageStatus({typeStatus:"success", message:"登录成功",description:r.msg}));
			history("/");
		});
	};
	const getImgCode = ()=>{
		getImgVerifyCode()
			.then(res=>{
				console.log(res);
				setImgCode(res.data.img);
			});
	};

	useEffect(()=>{
		getImgCode();
	},[]);
	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			labelCol={{md:3}}
			onFinish={onFinish}
		>
			<Form.Item
				label="邮箱："
				className="login-item"
				name="email"
				rules={[{ required: true, message: "请输入邮箱" },
					{
						pattern: LoginRegExp.email,
						whitespace: false,
						message: "邮箱格式错误"
					},]}
			>
				<Input className="login-input" autoComplete={"email"} prefix={<GlobalOutlined className="site-form-item-icon" />} placeholder="请输入电话号码" />
			</Form.Item>
			<Form.Item
				label="密码："
				name="password"
				className="login-item"
				rules={[{ required: true, message: "请输入密码" }]}
			>
				<Input.Password
					className="login-input"
					prefix={<LockOutlined className="site-form-item-icon" />}
					autoComplete={"new-password"}
					type="password"
					placeholder="请输入密码"
				/>
			</Form.Item>
			<Form.Item
				label="图像验证码："
				className="login-item"
				name="imgCode"
				rules={[{ required: true, message: "请输入图像验证码" }]}>
				<Flex>
					<Input.OTP length={6} {...sharedProps} />
					<img className={"img-code"} src={imgCode} onClick={getImgCode} alt={"imgCode"}/>
				</Flex>
			</Form.Item>
			<Form.Item
				className="login-item">
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>
						<div className={"check"}>
							<span className={"check-item"}>我已知晓</span>
							<Link className={"check-item"} to={""}>用户隐私协议</Link>
							<Link className={"check-item"} to={""}>用户使用协议</Link>
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
