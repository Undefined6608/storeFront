import React, { useEffect, useRef, useState } from "react";
import {
	Button,
	Card,
	Upload,
	Flex,
	Form,
	GetProp,
	Input,
	Radio,
	Select,
	Space,
	UploadProps,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "@/styles/components/registerForm.scss";
import { getImgVerifyCode, sendEmailCode } from "@/api/verifyCodeApi";
import { useAppDispatch } from "@/app/hooks";
import { setMessageStatus } from "@/store/reducers/messageSlice";
import {
	formRule,
	LoginRegExp,
	validatorEmail,
	validatorPhone,
	validatorUserName,
} from "@/utils/rules";
import { RegisterType } from "@/types/request/userRequest";
import { baseUploadImgUrl, passwordEncryption } from "@/utils";
import { register } from "@/api/userApi";
import { useNavigate } from "react-router-dom";

interface LimitItem {
	value: number;
	label: string;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const RegisterForm: React.FC = () => {
	const [imgCode, setImgCode] = useState("");
	const [email, setEmail] = useState("");
	const [emailBtn, setEmailBtn] = useState("获取邮箱验证码");
	const [emailBtnStatus, setEmailBtnStatus] = useState(false);
	const dispatch = useAppDispatch();
	const history = useNavigate();
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();
	const baseUploadUrl = baseUploadImgUrl();
	// 表单实例
	const [form] = Form.useForm();
	const limitList = useRef<LimitItem[]>([
		{ value: 2, label: "商户" },
		{ value: 3, label: "普通用户" },
	]);
	let timer: NodeJS.Timer | null = null;
	let btnTimer = 60;

	const beforeUpload = (file: FileType) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			dispatch(
				setMessageStatus(
					{ typeStatus: "warning", message: "上传失败", description: "格式不为JPG/PNG" },
				),
			);
		}
		const isLt10M = file.size / 1024 / 1024 < 10;
		if (!isLt10M) {
			dispatch(
				setMessageStatus(
					{ typeStatus: "warning", message: "上传失败", description: "大小超过10MB" },
				),
			);
		}
		return isJpgOrPng && isLt10M;
	};

	const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};
	const getImgCode = async () => {
		const result = await getImgVerifyCode();
		setImgCode(result.data.img);
	};
	const handlerEmailCode = async () => {
		if (timer != null) return;
		if (email === "")
			return dispatch(
				setMessageStatus({ typeStatus: "warning", message: "发送失败", description: "邮箱为空" }),
			);
		setEmailBtnStatus(true);
		const result = await sendEmailCode(email);
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
				setEmailBtn("重新获取");
				clearInterval(timer);
				return;
			}
			btnTimer--;
			setEmailBtn(btnTimer.toString());
		}, 1000);
	};

	const handlerRegister = async (value: RegisterType) => {
		if (!imageUrl)
			return dispatch(
				setMessageStatus(
					{ typeStatus: "warning", message: "注册失败", description: "请选择头像" },
				),
			);
		if (value.password !== value.verPassword)
			return dispatch(
				setMessageStatus(
					{ typeStatus: "warning", message: "注册失败", description: "两次密码不一致" },
				),
			);
		value.avatar = imageUrl;
		value.password = passwordEncryption(value.password);
		value.verPassword = passwordEncryption(value.verPassword);
		const result = await register(value);
		if (result.code !== 200)
			return dispatch(
				setMessageStatus(
					{ typeStatus: "error", message: "注册失败", description: result.msg },
				),
			);
		dispatch(
			setMessageStatus({ typeStatus: "success", message: "注册成功", description: result.msg }),
		);
		history("/");
	};

	const handleChange: UploadProps["onChange"] = (info) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			const result = info.file.response;
			if (result.code !== 200) return;
			setImageUrl(result.data.url);
			setLoading(false);
		}
	};

	const uploadButton = (
		<button style={{ border: 0, background: "none" }} type="button">
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	useEffect(() => {
		getImgCode();
	}, []);
	return (
		<>
			<Card className={"register-card"} title={"Register"}>
				<Form
					form={form}
					labelCol={{ md: 5 }}
					name="register-form"
					onFinish={handlerRegister}
					validateTrigger={"onBlur"}
					scrollToFirstError
					initialValues={{ limitType: 3, gender: 1 }}
				>
					<Form.Item label={"用户名："}
						name={"userName"}
						htmlFor={"register-username"}
						rules={[
							{ required: true, message: "用户名不能为空" },
							{ validator: validatorUserName },
						]}>
						<Input
							id={"register-username"}
							placeholder={"请输入用户名"}
							autoComplete={"username"}
						/>
					</Form.Item>
					<Form.Item label={"密码："}
						name={"password"}
						htmlFor={"register-password"}
						rules={[{ required: true, message: "密码不能为空" }]}>
						<Input.Password
							id={"register-password"}
							autoComplete={"new-password"}
							placeholder={"请输入密码"}
						/>
					</Form.Item>
					<Form.Item label={"再次输入密码："}
						name={"verPassword"}
						htmlFor={"register-verPassword"}
						rules={[
							{ required: true, message: "密码不能为空" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("两次密码不一致!"));
								},
							}),
						]}>
						<Input.Password
							id={"register-verPassword"}
							autoComplete={"new-password"}
							placeholder={"请再次输入密码"}
						/>
					</Form.Item>
					<Form.Item label={"性别："}
						name={"gender"}
						id={"register-gender"}
						rules={[{ required: true, message: "用户名不能为空" }]}>
						<Radio.Group id={"register-gender"}>
							<Space
								style={{ width: "70vw" }}
								align={"start"}
								direction={"horizontal"}
							>
								<Radio value={1}>男</Radio>
								<Radio value={2}>女</Radio>
							</Space>
						</Radio.Group>
					</Form.Item>
					<Form.Item label={"电话号码："}
						name={"phone"}
						htmlFor={"register-phone"}
						rules={[
							{ required: true, message: "电话号码不能为空" },
							{ required: true, message: "电话号码不能为空！" }, {
								pattern: LoginRegExp.phone,
								whitespace: false,
								message: "电话号码格式错误",
							},
							{ validator: validatorPhone },
						]}>
						<Input
							id={"register-phone"}
							placeholder={"请输入电话号码"}
							autoComplete={"phone"}
						/>
					</Form.Item>
					<Form.Item label={"邮箱："}
						name={"email"}
						htmlFor={"register-email"}
						rules={[
							{ required: true, message: "邮箱不能为空！" },
							{
								pattern: LoginRegExp.email,
								whitespace: false,
								message: "邮箱格式错误",
							},
							{ validator: validatorEmail }]}>
						<Input
							id={"register-email"}
							placeholder={"请输入邮箱"}
							value={email}
							autoComplete={"email"}
							onChange={handlerChange}
						/>
					</Form.Item>
					<Form.Item label={"邮箱验证码："}
						name={"emailCode"}
						htmlFor={"register-emailCode"}
						rules={formRule.emailCode}>
						<Flex>
							<Input id={"register-emailCode"} placeholder={"请输入邮箱验证码"} />
							<Button
								className={"btn-code"}
								type={"primary"}
								disabled={emailBtnStatus}
								onClick={() => handlerEmailCode()}
							>
								{emailBtn}
							</Button>
						</Flex>
					</Form.Item>
					<Form.Item label={"图像验证码(区分大小写)："}
						name={"imgCode"}
						htmlFor={"register-imgCode"}
						rules={formRule.imgCode}>
						<Flex>
							<Input id={"register-imgCode"} placeholder={"请输入图像验证码"} />
							<img
								src={imgCode}
								className={"img-code"}
								onClick={() => getImgCode()} alt={"imgCode"}
							/>
						</Flex>
					</Form.Item>
					<Form.Item label={"头像："}
						name={"avatar"}>
						<Space style={{ width: "70vw" }} align={"start"} direction={"horizontal"}>
							<Upload
								name="image"
								listType="picture-circle"
								style={{ width: "70px", height: "70px" }}
								className="avatar-uploader"
								showUploadList={false}
								method={"put"}
								action={baseUploadUrl + "/userAvatar"}
								beforeUpload={beforeUpload}
								onChange={handleChange}
							>
								{imageUrl ?
									<img
										src={imageUrl}
										alt="avatar"
										style={
											{ width: "100%", borderRadius: "50%" }
										}
									/> :
									uploadButton
								}
							</Upload>
						</Space>
					</Form.Item>
					<Form.Item label={"用户类型："}
						name={"limitType"}>
						<Select
							options={limitList.current}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							className={"register-btn"}
							type={"primary"}
							htmlType={"submit"}
						>
							注册
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</>
	);
};
