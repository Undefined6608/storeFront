import React from "react";
import "./login.scss";
import { LoginForm } from "@/components/loginForm/LoginForm";

export const Login = () => {

	return (
		<>
			<div className="container-page login-container">
				<LoginForm/>
			</div>
		</>
	);
};
