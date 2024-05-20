import React, { useRef, useState } from "react";
import "./loginForm.scss";
import { PhoneFilled, MailFilled } from "@ant-design/icons";
import { PhoneLogin } from "@/components/loginForm/PhoneLogin/PhoneLogin";
import { EmailLogin } from "@/components/loginForm/EmailLogin/EmailLogin";
import { Segmented, Card } from "antd";
import { BaseProps } from "@/types";
import { SegmentedOptions } from "antd/es/segmented";

export const LoginForm: React.FC<BaseProps> = (props) => {

	const [value, setValue] = useState<number>(1);

	const options = useRef<SegmentedOptions<number>>([
		{
			label: "手机号登录",
			value: 1,
			icon: <PhoneFilled />,
		},
		{
			label: "邮箱登录",
			value: 2,
			icon: <MailFilled />,
		},
	]);

	return (
		<div className="login-form" style={props.style}>
			<Card className="login-card">
				<Segmented
					className="segment"
					options={options.current}
					value={value}
					onChange={setValue}
					block
				/>
				{
					value === 1 ?
						<PhoneLogin /> :
						<EmailLogin />
				}
			</Card>
		</div>
	);
};
