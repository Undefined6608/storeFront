import React from "react";
import {ProductItemType} from "@/types/api/product";
import "./productItem.scss";
import {Card} from "antd";
import {useNavigate} from "react-router-dom";

export const ProductItem: React.FC<{ item: ProductItemType }> = ({item}) => {

	const history = useNavigate();
	const handlerProductInfo = () => {
		history("/productInfo", {state: {id: item.id}});
	};

	return (
		<Card className={"w-full m-3 cursor-pointer shadow-md hover:shadow-xl"} onClick={handlerProductInfo}>
			<div className={"flex w-full flex-wrap box-border"}>
				<div className="w-36 h-32">
					<img className={"w-full h-full"} src={item.icon} alt={item.name}/>
				</div>
				<div className={"flex flex-col items-center justify-around flex-1 ml-10 mr-10 line-clamp-3"}>
					<span className={"text-xl"}>{item.name}</span>
					<span className={"text-base text-blue-600"}>售价：￥{item.price}</span>
					<span className={"m-auto mt-0 mb-0 text-sm text-gray-600 text-left indent-7"}>{item.content}</span>
				</div>
			</div>
		</Card>
	);
};
