import React, {useEffect, useState} from "react";
import {Banner} from "@/components/Banner";
import {getBannerListApi} from "@/api/product";
import { Spin } from "antd";
import "./home.module.scss";
import {BannerResponse} from "@/types/api/product";
import {ProductListComponent} from "@/components/ProductListComponent";
export const Home = () => {
	const [bannerList,setBannerList] = useState<BannerResponse>();
	useEffect(() => {
		getBannerList();
	},[]);
	const getBannerList = async () => {
		const result = await getBannerListApi();
		setBannerList(result.data);
	};

	return (
		<>
			<div className={"container"}>
				{
					bannerList?.bannerList?
						<>
							<Banner bannerList={bannerList.bannerList}/>
							<ProductListComponent/>
						</> :
						<Spin tip="Loading" size="large">
							<div className="content" />
						</Spin>
				}
			</div>
		</>
	);
};
