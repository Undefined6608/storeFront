import React, { useEffect, useState } from "react";
import { Banner } from "@/components/Banner/Banner";
import { getBannerListApi } from "@/api/productApi";
import { Spin } from "antd";
import "./home.scss";
import { BannerResponse } from "@/types/api/product";
import { ProductListComponent } from "@/components/ProductList/ProductListComponent";
export const Home = () => {

	const [bannerList, setBannerList] = useState<BannerResponse>();

	useEffect(() => {
		getBannerList();
	}, []);

	const getBannerList = async () => {
		const result = await getBannerListApi();
		setBannerList(result.data);
	};

	return (
		<>
			<div className={"container-page home"}>
				{
					bannerList?.bannerList ?
						<>
							<Banner bannerList={bannerList.bannerList} />
							<ProductListComponent />
						</> :
						<div className="span w-full mt-60">
							<Spin tip="Loading" size="large">
								<div className="content" />
							</Spin>
						</div>
				}
			</div>
		</>
	);
};