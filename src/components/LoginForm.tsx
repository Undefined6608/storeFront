import React, { useRef, useState } from "react";
import "@/styles/components/loginForm.scss";
import { PhoneLogin } from "./loginForm/PhoneLogin";
import { EmailLogin } from "./loginForm/EmailLogin";
import { Segmented, Card } from "antd";
import { BaseProps } from "@/types";


export const LoginForm: React.FC<BaseProps> = (props) => {
	const [value, setValue] = useState<string | number>("手机号登录");
	const labelList = useRef(["手机号登录", "邮箱登录"]);
	return (
		<div className="login-form" style={props.style} >
			<Card className="login-card">
				<Segmented className="segment" options={labelList.current} value={value} onChange={setValue} block />
				{
					value === labelList.current[0] ?
						<PhoneLogin /> :
						<EmailLogin />
				}
			</Card>
		</div>
	);
};
