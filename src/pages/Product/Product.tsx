import { getProductListByUserUidApi } from "@/api/productApi";
import { useAppSelector } from "@/app/hooks";
import { UserProduct } from "@/components/UserProduct/UserProduct";
import { fetchUserInfo } from "@/store/reducers/userInfoSlice";
import { ProductTableType } from "@/types";
import { Button, Card, Flex } from "antd";
import React, { useEffect, useState } from "react";

export const Product: React.FC = () => {
	// 获取用户信息
	const userInfo = useAppSelector(fetchUserInfo);
	// 创建列表
	const [productList, setProductList] = useState<ProductTableType[]>([]);

	// 通过用户获取商品列表
	const getProductListByUser = async () => {
		if (userInfo) {
			const res = await getProductListByUserUidApi(userInfo.uid);
			if (res.code === 200) {
				const list: ProductTableType[] = res.data.productList.map(item => { return { ...item, key: item.id ,modify:false}; });
				setProductList(list);
			}
		}
	};
	// 添加商品
	const addProduct = () => {
		setProductList([]);
	};

	// 页面加载时调用
	useEffect(() => {
		getProductListByUser();
	}, [userInfo]);

	return (
		<>
			<div className={"container-page w-full"}>
				<Card className=" w-11/12 mt-3" title="商品管理">
					<Flex>
						<Button type="primary" className="mr-3" onClick={addProduct}>添加商品</Button>
						<Button type="default" danger>删除商品</Button>
					</Flex>
					<UserProduct data={productList} />
				</Card>
			</div>
		</>
	);
};
