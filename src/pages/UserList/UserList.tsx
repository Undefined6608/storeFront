import { getAllUserApi } from "@/api/userApi";
import { useAppDispatch } from "@/app/hooks";
import { UserListTable } from "@/components/UserListTable/UserListTable";
import { setMessageStatus } from "@/store/reducers/messageSlice";
import { UserTableType } from "@/types";
import { UserInfoType } from "@/types/api/user";
import { Card } from "antd";
import React, { useEffect, useState } from "react";

export const UserList: React.FC = () => {

	// 定义全部用户信息
	const [allUserList, setAllUserList] = useState<UserTableType[]>([]);

	// 获取Store
	const dispatch = useAppDispatch();

	// 获取全部用户列表
	const getAllUserList = async () => {

		// 调取接口
		const res = await getAllUserApi();

		if (res.code !== 200) {
			dispatch(setMessageStatus({ typeStatus: "error", message: "获取用户列表失败", description: res.msg }));
			return;
		}

		// 列表添加
		const list: UserTableType[] = res.data.allUserList.map((item: UserInfoType) => {
			return {
				key: item.uid,
				modify: false,
				userName: item.userName,
				email: item.email,
				phone: item.phone,
				gender: item.gender,
				limitType: item.limitType,
				avatar: item.avatar,
				integral: item.integral,
				balance: item.balance,
				likeNum: item.likeNum,
				dontLike: item.dontLike,
				uid: item.uid,
			};
		});

		// 设置数据
		setAllUserList(list);
	};

	// 页面加载时获取
	useEffect(() => {
		getAllUserList();
	}, []);

	return (
		<>
			{
				allUserList.length > 0 ? (
					<div className={"container-page w-full"}>
						<Card className="w-10/12 mt-3" title={"用户列表"}>
							<UserListTable userList={allUserList} />
						</Card>
					</div>
				):null
			}
		</>
	);
};
