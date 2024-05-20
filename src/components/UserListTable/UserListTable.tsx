import { UserTableType } from "@/types";
import { Button, Flex, Input, Select, Table, TableColumnsType } from "antd";
import React, { useState } from "react";

export const UserListTable: React.FC<{ userList: UserTableType[] }> = (props) => {

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const columns: TableColumnsType<UserTableType> = [
		{
			title: "序号",
			width: 60,
			dataIndex: "id",
			key: "id",
			render: (_, __, index) => index + 1,
		}, {
			title: "商品图片",
			width: 90,
			dataIndex: "avatar",
			key: "avatar",
			render: (avatar: string) => <img src={avatar} style={{ width: 70, height: 70 }} />,
		}, {
			title: "用户名",
			width: 150,
			dataIndex: "userName",
			key: "userName",
			render: (userName: string, record) => <Input value={userName} disabled={!record.modify} />,
		}, {
			title: "用户ID",
			width: 150,
			dataIndex: "uid",
			key: "uid",
		}, {
			title: "性别",
			width: 100,
			dataIndex: "gender",
			key: "gender",
			render: (gender: boolean,record) => <Select className="w-full" value={gender} disabled={!record.modify}>
				<Select.Option value={false}>男</Select.Option>
				<Select.Option value={true}>女</Select.Option>
			</Select>,
		}, {
			title: "邮箱",
			width: 200,
			dataIndex: "email",
			key: "email",
			render: (price: number, record) => <Input value={price} disabled={!record.modify} />,
		}, {
			title: "电话号码",
			width: 150,
			dataIndex: "phone",
			key: "phone",
			render: (phone: string, record) => <Input value={phone} disabled={!record.modify} />,
		}, {
			title: "用户积分",
			width: 60,
			dataIndex: "integral",
			key: "integral",
		}, {
			title: "余额",
			width: 60,
			dataIndex: "balance",
			key: "balance",
		}, {
			title: "点赞次数",
			width: 60,
			dataIndex: "likeNum",
			key: "likeNum",
		}, {
			title: "被踩次数",
			width: 60,
			dataIndex: "dontLike",
			key: "dontLike",
		}, {
			title: "操作",
			width: 200,
			dataIndex: "tools",
			key: "tools",
			render: (_, record) => (
				<Flex className=" items-center">
					<Button className="mr-3" type="primary" onClick={() => record.modify = !record.modify}>修改</Button>
					<Button type="default">删除</Button>
				</Flex>
			),
		},
	];

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	return (
		<>
			<Table className="w-full mt-5" rowSelection={rowSelection} bordered columns={columns} scroll={{ x: 1600 }} dataSource={props.userList} />
		</>
	);
};