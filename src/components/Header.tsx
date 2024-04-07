import React, { useRef } from "react";
import "@/styles/components/header.scss";
import { navType } from "@/types";
import { NavComponent } from "./header/NavComponent";
import { UserComponent } from "./header/UserComponent";
export const Header = () => {
	const navList = useRef<navType[]>([
		{ id: "nav1", title: "Home", link: "/" },
		{ id: "nav2", title: "About", link: "/about" }
	]);
	return (
		<div className="header">
			<div className="title">Store</div>
			<NavComponent navList={navList.current} />
			<UserComponent />
		</div>
	);
};