import React, {useEffect, useRef, useState} from "react";
import {Banner} from "@/components/Banner/Banner";
import {getBannerListApi} from "@/api/productApi";
import {Spin} from "antd";
import "./home.scss";
import {BannerResponse} from "@/types/api/product";
import {ProductListComponent} from "@/components/ProductList/ProductListComponent";
import {ProductModule} from "@/components/ProductModule/ProductModule";
import {ModuleTitle} from "@/components/ModuleTitle/ModuleTitle";
import {ModuleTitleType} from "@/types";

export const Home = () => {
	// 轮播图列表数据
	const [bannerList, setBannerList] = useState<BannerResponse>();
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

	// 在页面加载的时候调用
	useEffect(() => {
		getBannerList();
	}, []);

	// 获取轮播图列表
	const getBannerList = async () => {
		const result = await getBannerListApi();
		setBannerList(result.data);
	};

	return (
		<>
			<div className={"container-page home"}>
				{
					bannerList?.bannerList ?
						<div className={"w-4/5"}>
							<Banner bannerList={bannerList.bannerList}/>
							<ModuleTitle data={moduleTitleList.current[0]}/>
							<ProductModule/>
							<ModuleTitle data={moduleTitleList.current[1]}/>
							<ProductListComponent/>
						</div> :
						<Spin className={"span w-full mt-60"} tip="Loading" size="large">
							<div className="content"/>
						</Spin>
				}
			</div>
		</>
	);
};
