import React from "react";
import { ProductListComponent } from "@/components/ProductListComponent";

export const Shop: React.FC = () => {
	return (
		<>
			<div className={"container"}>
				<ProductListComponent />
			</div>
		</>
	);
};
