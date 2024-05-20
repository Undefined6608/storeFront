import React from "react";
import { Card, Flex, Watermark } from "antd";
import "./about.scss";

export const About = () => {

	return (
		<>
			<Watermark
				className={"container-page about justify-center"}
				content={["张杰的毕业设计项目", "淄博职业学院"]}
			>
				<Card className={"about-card shadow-xl box-border font-sans w-7/12"}>
					<Flex className={"data-box"} align={"center"} gap="middle" vertical>
						<img
							className={"icon shadow-xl"}
							src="http://118.31.43.239:81/image/my-self.jpg"
							alt="icon"
						/>
						<span className={"title"}>项目名称：Co-Store</span>
						<span>作者：张杰</span>
						<span>项目介绍：本项目是一个 Co 系列的商城项目</span>
						<span>版本：1.0</span>
						<span>作者 QQ ：1105149059</span>
						<span>作者微信：reactive_undefined</span>
						<span>
							作者 GitHub ：
							<a
								href="https://github.com/Undefined6608"
							>
								https://github.com/Undefined6608
							</a>
						</span>
						<span>
							友情连接 Co-Blog (作者博客)：
							<a href="http://118.31.43.239/">
								http://118.31.43.239
							</a>
						</span>
					</Flex>
				</Card>
			</Watermark>
		</>
	);
};
