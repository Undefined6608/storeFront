import React, {useEffect, useState} from "react";
import {Card, Empty} from "antd";
import {ProductResponse, ProductTypeItem} from "@/types/api/product";
import {getProductListByTypeIdApi, getProductTypeApi} from "@/api/productApi";
import "./productModule.scss";
import {ProductModuleItem} from "@/components/ProductModule/ProductModuleItem";

export const ProductModule: React.FC = () => {
	// 商品类型列表
	const [productTypeList, setProductTypeList] = useState<ProductTypeItem[]>([]);
	// 商品列表
	const [productList, setProductList] = useState<ProductResponse>();
	// 选择商品类型
	const [selectProductTypeId, setSelectProductTypeId] = useState<number>(1);

	// 获取商品类型列表
	const getProductTypeList = async () => {
		const res = await getProductTypeApi();
		if (res.code === 200) {
			setProductTypeList(res.data.productType);
		}
	};

	// 获取商品列表
	const getProductList = async (id: number) => {
		const res = await getProductListByTypeIdApi(id);
		setProductList(res.data);
	};

	// 选择商品类型
	const selectProductType = (id: number) => {
		setSelectProductTypeId(id);
	};

	// 在页面加载时获取
	useEffect(() => {
		getProductTypeList();
	}, []);

	// 在选择商品类型时获取数据
	useEffect(() => {
		getProductList(selectProductTypeId);
	}, [selectProductTypeId]);

	return (
		<>
			{
				productTypeList.length > 0 ?
					<Card className={"w-full mt-3"}>
						<div className={"w-full h-96 flex flex-wrap justify-between"}>
							<div className={"moduleLeft h-full flex flex-col space-y-3 justify-start overflow-y-auto"}>
								{
									productTypeList.map(value => (
										<span
											key={value.id + "productType"}
											className={selectProductTypeId === value.id ? "cursor-pointer pt-2 pb-2 pl-8 pr-8 bg-amber-200 rounded-md" : "cursor-pointer pt-2 pb-2 pl-8 pr-8 rounded-md"}
											onClick={() => selectProductType(value.id)}
										>
											{value.type}
										</span>
									))
								}
							</div>
							<div
								className={"moduleRight h-full flex-1 bg-sky-200 rounded-md overflow-y-auto flex flex-wrap items-start"}>
								{
									productList?.productList ?
										productList?.productList.map(value => (
											<ProductModuleItem key={value.id + "moduleItem"} item={value}/>
										)) :
										<Empty className={"m-auto"} description={"暂无数据"}/>
								}
							</div>
						</div>
					</Card> :
					null
			}
		</>
	);
};
