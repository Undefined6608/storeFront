import React from "react";
import { ProductResponse } from "@/types/api/product";
import { ProductItem } from "@/components/item/ProductItem/ProductItem";
import "./productList.scss";

export const ProductList: React.FC<ProductResponse> = ({ productList }) => {

	return (
		<div className={"productList w-full flex items-center justify-between flex-wrap justify-start"}>
			{
				productList.map(value => (
					<ProductItem key={"productItem" + value.id} item={value} />
				))
			}
			{
				productList.length / 4 !== 0 ?
					<div className={"empty"}></div> :
					null
			}
		</div>
	);
};
