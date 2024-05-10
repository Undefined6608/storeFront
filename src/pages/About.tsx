import React from "react";
import {Card, Flex, Watermark} from "antd";
import "./about.module.scss";

export const About = () => {
    return (
        <>
            <Watermark className={"container about"} content={["张杰的毕业设计项目", "淄博职业学院"]}>
                <Card className={"about-card"} title={"Co-Store"}>
                    <Flex align={"center"} justify={"space-around"}>
                        <img className={"icon"} src="http://localhost:89/icon/3a5d5fe5-bb9a-44b7-a460-416a7f0ffb8d.jpg" alt="icon"/>

                    </Flex>
                </Card>
            </Watermark>
        </>
    );
};
