import React, { useEffect, useState } from "react";
import { Empty, Segmented, Spin } from "antd";
import { ProductList } from "@/components/ProductList";
import { getProductListApi, getProductTypeApi } from "@/api/productApi";
import { ProductResponse, ProductTypeResponse } from "@/types/api/product";
import { SegmentedOptions } from "antd/es/segmented";

export const ProductListComponent: React.FC = () => {

	const [productType, setProductType] = useState<ProductTypeResponse>();
	const [typeOptions, setTypeOptions] = useState<SegmentedOptions<number>>([]);
	const [selectOption, setSelectOption] = useState<number>(1);
	const [productList, setProductList] = useState<ProductResponse>();

	useEffect(() => {
		getProductType();
		getProductList(1);
	}, []);

	const getProductList = async (typeId: number) => {
		const result = await getProductListApi(typeId);
		setProductList(result.data);
	};

	const getProductType = async () => {
		const result = await getProductTypeApi();
		setProductType(result.data);
		const option: SegmentedOptions<number> = [];
		result.data.productType.map(value => {
			option.push({
				label: value.type,
				value: value.id,
			});
		});
		setTypeOptions(option);
	};
	const typeHandler = (value: number) => {
		setSelectOption(value);
		getProductList(value);
	};
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
						<Spin tip="Loading" size="large">
							<div className="content" />
						</Spin>
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
