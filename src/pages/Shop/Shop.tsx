import React from "react";
import { ProductListComponent } from "@/components/ProductList/ProductListComponent";

export const Shop: React.FC = () => {
	return (
		<>
			<div className={"container-page"}>
				<ProductListComponent />
			</div>
		</>
	);
};