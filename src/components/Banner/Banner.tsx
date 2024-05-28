import React, {useState} from "react";
import "./banner.scss";
import {BannerResponse} from "@/types/api/product";
import {Carousel, CarouselProps} from "antd";
import {useNavigate} from "react-router-dom";

type DotPosition = CarouselProps["dotPosition"];

export const Banner: React.FC<BannerResponse> = ({bannerList}) => {

	const [dotPosition] = useState<DotPosition>("bottom");

	const history = useNavigate();

	const handlerProductInfo = (id: number) => {
		history("/productInfo", {state: {id: id}});
	};

	return (
		<>
			{
				<div className={"banner w-full rounded-xl"}>
					<Carousel
						className={"main-banner"}
						autoplay effect="fade"
						dotPosition={dotPosition}
					>
						{
							bannerList.map(value => (
								<div
									key={"banner" + value.id} className="imgBox"
									onClick={() => handlerProductInfo(value.product_id)}
								>
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
