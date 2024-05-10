import React from "react";
import { ProductResponse } from "@/types/api/product";
import { ProductItem } from "@/components/item/ProductItem";
import "@/styles/components/productList.scss";

export const ProductList: React.FC<ProductResponse> = ({ productList }) => {
	return (
		<div className={"productList"}>
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
