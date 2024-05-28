import { getProductListApi } from "@/api/productApi";
import { UserProduct } from "@/components/UserProduct/UserProduct";
import { ProductTableType } from "@/types";
import { Button, Card, Flex } from "antd";
import React, { useEffect, useState } from "react";
import {AddProduct} from "@/components/AddProduct/AddProduct";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {getModuleBoxStatus, setUserModuleBoxStatus} from "@/store/reducers/moduleBoxStatusSlice";

export const AllProductList: React.FC = () => {

	// 创建列表
	const [productList, setProductList] = useState<ProductTableType[]>([]);
	// 获取模块显示状态
	const moduleStatus = useAppSelector(getModuleBoxStatus);
	// 获取store修改
	const dispatch = useAppDispatch();

	// 获取全部商品列表
	const getAllProduct = async () => {
		const res = await getProductListApi();
		if (res.code === 200) {
			const list: ProductTableType[] = res.data.productList.map(item => { return { ...item, key: item.id, modify: false }; });
			setProductList(list);
		}
	};

	// 添加商品
	const addProduct = () => {
		dispatch(setUserModuleBoxStatus({addProduct:true}));
	};

	// 页面加载时调用
	useEffect(() => {
		getAllProduct();
	}, []);

	return (
		<>
			<div className={"container-page w-full relative"}>
				<AddProduct open={moduleStatus.addProduct}/>
				<Card className=" w-11/12 mt-3" title="全部商品管理">
					<Flex>
						<Button type="primary" className="mr-3" onClick={addProduct}>添加商品</Button>
						{/*<Button type="default" danger>删除商品</Button>*/}
					</Flex>
					<UserProduct data={productList} />
				</Card>
			</div>
		</>
	);
};
