import React, {useRef} from "react";
import { ProductListComponent } from "@/components/ProductList/ProductListComponent";
import {ModuleTitle} from "@/components/ModuleTitle/ModuleTitle";
import {ProductModule} from "@/components/ProductModule/ProductModule";
import {ModuleTitleType} from "@/types";

export const Shop: React.FC = () => {

	// 模块标题列表数据
	const moduleTitleList = useRef<ModuleTitleType[]>([
		{
			title: "商品模块",
			subTitle: "",
		}, {
			title: "商品列表",
			subTitle: "",
		},
	]);

	return (
		<>
			<div className={"container-page"}>
				<div className={"w-4/5"}>
					<ModuleTitle data={moduleTitleList.current[0]}/>
					<ProductModule/>
					<ModuleTitle data={moduleTitleList.current[1]}/>
					<ProductListComponent/>
				</div>
			</div>
		</>
	);
};
