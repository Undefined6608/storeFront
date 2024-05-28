import React from "react";
import {Card} from "antd";
import {ShoppingCartTable} from "@/components/ShoppingCartTable/ShoppingCartTable";
import {useAppSelector} from "@/app/hooks";
import {getShoppingCartStatus} from "@/store/reducers/shoppingCartSlice";

export const ShoppingCart: React.FC = () => {
	const shoppingCartData = useAppSelector(getShoppingCartStatus);
	return (
		<>
			<div className={"container-page w-full"}>
				<Card className={"w-10/12 mt-3"} title={"购物车"}>
					<ShoppingCartTable list={shoppingCartData}/>
				</Card>
			</div>
		</>
	);
};
