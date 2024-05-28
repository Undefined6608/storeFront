import React from "react";
import {ProductItemType} from "@/types/api/product";
import "./productModuleItem.scss";
import {useNavigate} from "react-router-dom";

export const ProductModuleItem: React.FC<{ item: ProductItemType }> = (props) => {
	const history = useNavigate();
	const handlerProductInfo = () => {
		history("/productInfo", {state: {id: props.item.id}});
	};
	return (
		<div
			className={"productModuleItem h-48 box-border p-3 flex flex-col items-center bg-white justify-around shadow rounded-md cursor-pointer hover:shadow-xl"}
			onClick={handlerProductInfo}>
			<div className="moduleItem-img h-36">
				<img className={"w-full h-full"} src={props.item.icon} alt=""/>
			</div>
			<span>{props.item.name}</span>
		</div>
	);
};
