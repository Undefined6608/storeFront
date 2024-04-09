import { NavType } from "@/types";
import React from "react";
import { Link } from "react-router-dom";
import "@/styles/components/header/navComponent.scss";

export const NavComponent: React.FC<{ navList: NavType[] }> = (props) => {
	return (
		<div className="nav-component">
			{
				props.navList.map((item) => {
					return (
						<Link to={item.link} key={item.id} className="nav-link">
							{item.title}
						</Link>
					);
				})

			}
		</div>
	);
};
