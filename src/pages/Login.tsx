import React from "react";
import "@/styles/pages/login.scss";
import { LoginForm } from "@/components/LoginForm";

export const Login = () => {
	return (
		<>
			<div className="container login-container">
				<LoginForm />
			</div>
		</>
	);
};
