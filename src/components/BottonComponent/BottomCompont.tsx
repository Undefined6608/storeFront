import { BottomQrType } from "@/types";
import { Flex } from "antd";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

export const BottomComponent: React.FC = () => {
	const location = useLocation();
	const bottomPaths = useRef<string[]>([
		"/",
		"/shop",
		"/contact-us",
	]);
	const bottomQr = useRef<BottomQrType[]>([
		{ id: 1, title: "Blog", qrCode: "/static/bottom/blog.png" },
		{ id: 2, title: "GitHub", qrCode: "/static/bottom/github.png" },
		{ id: 3, title: "线上地址", qrCode: "/static/bottom/project.png" },
	]);
	return (
		<>
			{
				bottomPaths.current.includes(location.pathname) ? (
					<div className="w-full h-48 mt-10 bg-white border-dashed border-t-2 border-gray-300 flex justify-center items-center">
						<div className="w-full">
							<Flex className="w-full h-36 items-end justify-around">
								{
									bottomQr.current.map(item => (
										<Flex key={"bottomQr"+item.id} className="qr-box w-36 h-full items-center flex-col justify-around">
											<img src={item.qrCode} className="w-28 h-28" />
											<span>{item.title}</span>
										</Flex>
									))
								}
							</Flex>
							<span>Co-Store @Auth: ZhangJie © 2024</span>
						</div>
					</div>
				) : null
			}
		</>
	);
};