import React, { useRef } from "react";
import "./header.scss";
import { NavType } from "@/types";
import { NavComponent } from "./NavComponent/NavComponent";
import { UserComponent } from "./UserComponent/UserComponent";
import { useNavigate } from "react-router-dom";
import { UserBtnList } from "@/components/Header/UserBtnList/UserBtnList";
// import { SearchComponent } from "./SearchComponent/SearchComponent";
export const Header = () => {

	const history = useNavigate();

	const navList = useRef<NavType[]>([
		{ id: "nav1", title: "Home", link: "/" },
		{ id: "nav2", title: "Shop", link: "/shop" },
		{ id: "nav3", title: "ContactUs", link: "/contact-us" },
		{ id: "nav4", title: "About", link: "/about" },
	]);

	return (
		<div className="header">
			<div className="title" onClick={() => history("/")}>Co-Store</div>
			<NavComponent navList={navList.current} />
			{/*<SearchComponent/>*/}
			<UserComponent />
			<UserBtnList />
		</div>
	);
};
