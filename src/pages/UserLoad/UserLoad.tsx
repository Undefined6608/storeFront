import { getUserLoadListApi } from "@/api/loadApi";
import { useAppDispatch } from "@/app/hooks";
import { LoadTable } from "@/components/LoadTable/LoadTable";
import { setMessageStatus } from "@/store/reducers/messageSlice";
import { UserLoadTableType } from "@/types";
import { Button, Card, Flex } from "antd";
import React, { useEffect, useState } from "react";

export const UserLoad: React.FC = () => {

	// 定义用户load列表
	const [userLoadList, setUserLoadList] = useState<UserLoadTableType[]>([]);

	// 获取store
	const dispatch = useAppDispatch();

	// 获取列表
	const getUserLoadList = async () => {

		const res = await getUserLoadListApi();

		if (res.code !== 200) {
			dispatch(setMessageStatus({ typeStatus: "error", message: res.msg, description: "" }));
			return;
		}

		setUserLoadList(res.data.userAddress.map((item) => {
			return {
				key: item.id,
				modify: false,
				...item,
			};
		}));
	};

	// 页面加载获取数据
	useEffect(() => {
		getUserLoadList();
	}, []);

	return (
		<>
			<div className={"container-page w-full"}>
				<Card className={"w-10/12 mt-3"} title={"用户收货地址列表"}>
					<Flex>
						<Button className="mr-3" type="primary">添加收货地址</Button>
						<Button type="default" danger>删除收货地址</Button>
					</Flex>
					<LoadTable loadList={userLoadList} />
				</Card>
			</div>
		</>
	);
};
