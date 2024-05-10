import React, { useRef } from "react";
import "@/styles/components/header.scss";
import { NavType } from "@/types";
import { NavComponent } from "./header/NavComponent";
import { UserComponent } from "./header/UserComponent";
import { useNavigate } from "react-router-dom";
import { UserBtnList } from "@/components/header/UserBtnList";
export const Header = () => {
	const history = useNavigate();
	const navList = useRef<NavType[]>([
		{ id: "nav1", title: "Home", link: "/" },
		{ id: "nav2", title: "Shop", link: "/shop" },
		{ id: "nav3", title: "About", link: "/about" },
	]);
	return (
		<div className="header">
			<div className="title" onClick={() => history("/")}>Co-Store</div>
			<NavComponent navList={navList.current} />
			<UserComponent />
			<UserBtnList />
		</div>
	);
};
