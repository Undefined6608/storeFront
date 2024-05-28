import React from "react";
import {ModuleTitleType} from "@/types";
import "./moduleTitle.scss";

export const ModuleTitle:React.FC<{data:ModuleTitleType}> = (props) => {
	return (
		<div className={"moduleTitle w-full h-10 flex items-center mt-3 mb-3 text-left pl-2"}>
			<span className={"text-2xl font-bold"}>{props.data.title}</span>
			<span>{props.data.subTitle}</span>
		</div>
	);
};
