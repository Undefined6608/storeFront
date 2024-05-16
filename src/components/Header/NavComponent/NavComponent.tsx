import { NavType } from "@/types";
import React from "react";
import { Link } from "react-router-dom";
import "./navComponent.scss";

export const NavComponent: React.FC<{ navList: NavType[] }> = (props) => {
	return (
		<div className="nav-component">
			{
				props.navList.map((item) => {
					return (
						<Link to={item.link} key={item.id} className="nav-link text-lg no-underline cursor-pointer text-black m-4">
							{item.title}
						</Link>
					);
				})

			}
		</div>
	);
};
