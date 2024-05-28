import React, {ReactNode, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

interface AuthorGuardProps {
	children: ReactNode
}

export const TokenGuard: React.FC<AuthorGuardProps> = ({children}) => {
	const history = useNavigate();
	useEffect(() => {
		const token = Cookies.get("token");
		if (!token) {
			history("/login");
		}
	}, []);
	return (
		<>
			{children}
		</>
	);
};
