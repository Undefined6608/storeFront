import React, { useState } from "react";
import "@/styles/components/banner.scss";
import { BannerResponse } from "@/types/api/product";
import { Carousel, CarouselProps } from "antd";

type DotPosition = CarouselProps["dotPosition"];

export const Banner: React.FC<BannerResponse> = ({ bannerList }) => {
	const [dotPosition] = useState<DotPosition>("bottom");
	return (
		<>
			{
				<div className={"banner"}>
					<Carousel className={"swiper"} autoplay effect="fade" dotPosition={dotPosition}>
						{
							bannerList.map(value => (
								<div key={"banner" + value.id} className="imgBox">
									<img
										className={"img"}
										src={value.banner}
										alt={value.productName}
									/>
									<span className={"title"}>{value.productName}</span>
								</div>
							))
						}
					</Carousel>
				</div>
			}
		</>
	);
};
