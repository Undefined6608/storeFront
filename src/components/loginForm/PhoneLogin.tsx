import React, {useEffect, useState} from "react";
import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import {Button, Form, Input, Checkbox, type GetProp, Flex} from "antd";
import "@/styles/components/loginForm/loginType.scss";
import {getImgVerifyCode} from "@/api/verifyCodeApi";
import {PhoneLoginType} from "@/types/request/userRequest";
import {phoneLogin} from "@/api/userApi";
import {loginSuccess} from "@/config/request";
import {passwordEncryption} from "@/utils";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/app/hooks";
import {userInfoAsync} from "@/store/actions/userInfoAction";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {LoginRegExp} from "@/utils/rules";

export const PhoneLogin: React.FC = () => {
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

	const onFinish = async (values: PhoneLoginType) => {
		values.imgCode = code;
		if (!values.remember) return dispatch(setMessageStatus({typeStatus:"warning", message:"登录失败",description:"请先同意《用户隐私协议》和《用户使用协议》"}));
		// 进行密码加密
		values.password = passwordEncryption(values.password);
		const result = await phoneLogin(values);
		if (result.code !== 200) return dispatch(setMessageStatus({typeStatus:"error", message:"登录失败",description:result.msg}));
		loginSuccess(result.data.token);
		dispatch(userInfoAsync());
		dispatch(setMessageStatus({typeStatus:"success", message:"登录成功",description:result.msg}));
		history("/");
	};
	const getImgCode = async ()=>{
		const result = await getImgVerifyCode();
		setImgCode(result.data.img);
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
				label="电话号码："
				className="login-item"
				name="phone"
				rules={[{ required: true, message: "请输入电话号码" },
					{ required: true, message: "电话号码不能为空！" }, {
						pattern: LoginRegExp.phone,
						whitespace: false,
						message: "电话号码格式错误"
					},]}
			>
				<Input className="login-input" autoComplete={"phone"} prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="请输入电话号码" />
			</Form.Item>
			<Form.Item
				label="密码："
				name="password"
				className="login-item"
				rules={[{ required: true, message: "请输入密码" }]}
			>
				<Input.Password
					className="login-input"
					autoComplete={"new-password"}
					prefix={<LockOutlined className="site-form-item-icon" />}
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
