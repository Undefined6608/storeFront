import React from "react";
import { ProductItemType } from "@/types/api/product";
import "./productItem.scss";

export const ProductItem: React.FC<{ item: ProductItemType }> = ({ item }) => {

	return (
		<div className={"productItem shadow-md hover:shadow-xl"}>
			<div className="img">
				<img src={item.icon} alt={item.name} />
			</div>
			<span className={"title"}>{item.name}</span>
			<span className={"price"}>售价：￥{item.price}</span>
			<span className={"content"}>{item.content}</span>
		</div>
	);
};
