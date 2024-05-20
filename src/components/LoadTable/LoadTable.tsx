import { UserLoadTableType } from "@/types";
import { Input, Select, Table, TableColumnsType } from "antd";
import React, { useState } from "react";

export const LoadTable: React.FC<{ loadList: UserLoadTableType[] }> = (props) => {

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const columns: TableColumnsType<UserLoadTableType> = [
		{
			title: "序号",
			width: 60,
			dataIndex: "id",
			key: "id",
			render: (_, __, index) => index + 1,
		}, {
			title: "收货人",
			width: 90,
			dataIndex: "consignee",
			key: "consignee",
			render: (consignee: string, record) => <Input value={consignee} disabled={!record.modify} />,
		}, {
			title: "电话号码",
			width: 150,
			dataIndex: "phone",
			key: "phone",
			render: (phone: string, record) => <Input value={phone} disabled={!record.modify} />,
		}, {
			title: "收货地址",
			width: 200,
			dataIndex: "address",
			key: "address",
			render: (address: string, record) => <Input value={address} disabled={!record.modify} />,
		}, {
			title: "性别",
			width: 100,
			dataIndex: "gender",
			key: "gender",
			render: (gender: boolean, record) => <Select className="w-full" value={gender} disabled={!record.modify}>
				<Select.Option value={false}>男</Select.Option>
				<Select.Option value={true}>女</Select.Option>
			</Select>,
		}, {
			title: "是否默认",
			width: 60,
			dataIndex: "def",
			key: "def",
			render: (def: boolean) => <span>{def ? "是" : "否"}</span>,
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
			<Table className="w-full mt-5" rowSelection={rowSelection} bordered columns={columns} scroll={{ x: 1600 }} dataSource={props.loadList} />
		</>
	);
};