import React, { useEffect, useState } from "react";
import { Empty, Segmented, Spin } from "antd";
import { ProductList } from "./ProductList";
import { getProductListByTypeIdApi, getProductTypeApi } from "@/api/productApi";
import { ProductResponse, ProductTypeResponse } from "@/types/api/product";
import { SegmentedOptions } from "antd/es/segmented";

export const ProductListComponent: React.FC = () => {

	const [productType, setProductType] = useState<ProductTypeResponse>();
	const [typeOptions, setTypeOptions] = useState<SegmentedOptions<number>>([]);
	const [selectOption, setSelectOption] = useState<number>(1);
	const [productList, setProductList] = useState<ProductResponse>();

	// 初始化
	useEffect(() => {
		getProductType();
		getProductList(1);
	}, []);

	// 获取商品列表
	const getProductList = async (typeId: number) => {
		const result = await getProductListByTypeIdApi(typeId);
		setProductList(result.data);
	};

	// 获取商品类型
	const getProductType = async () => {
		// 获取商品类型接口
		const result = await getProductTypeApi();
		if (result.code === 200) {
			// 添加到 State
			setProductType(result.data);
			// 定义选择选项
			const option: SegmentedOptions<number> = [];
			// 向选项中添加数据
			result.data.productType.map(value => {
				option.push({
					label: value.type,
					value: value.id,
				});
			});
			// 添加类型选项
			setTypeOptions(option);
		}
	};
	// 商品类型选择
	const typeHandler = (value: number) => {
		setSelectOption(value);
		getProductList(value);
	};
	// 抛出 TSX 组件
	return (
		<>
			<div className={"typeSelect"}>
				{
					productType?.productType ?
						<Segmented
							className={"select"}
							options={typeOptions}
							value={selectOption}
							onChange={value => typeHandler(value)}
							block
						/> :
						<div className="spin w-full mt-60">
							<Spin tip="Loading" size="large">
								<div className="content" />
							</Spin>
						</div>
				}
			</div>
			{
				productList?.productList ?
					<ProductList productList={productList?.productList} /> :
					<Empty description={"暂无数据"} />
			}
		</>
	);
};
