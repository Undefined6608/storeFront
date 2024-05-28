import {UserTableType} from "@/types";
import {Button, Flex, Input, Popconfirm, Select, Table, TableColumnsType} from "antd";
import React, {useState} from "react";
import {deleteUserApi} from "@/api/userApi";
import {useAppDispatch} from "@/app/hooks";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {useNavigate} from "react-router-dom";

export const UserListTable: React.FC<{ userList: UserTableType[] }> = (props) => {

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const dispatch = useAppDispatch();

	const history = useNavigate();

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
			render: (avatar: string) => <img src={avatar} style={{width: 70, height: 70}}/>,
		}, {
			title: "用户名",
			width: 150,
			dataIndex: "userName",
			key: "userName",
			render: (userName: string, record) => <Input value={userName} disabled={!record.modify}/>,
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
			render: (gender: boolean, record) => <Select className="w-full" value={gender} disabled={!record.modify}>
				<Select.Option value={false}>男</Select.Option>
				<Select.Option value={true}>女</Select.Option>
			</Select>,
		}, {
			title: "邮箱",
			width: 200,
			dataIndex: "email",
			key: "email",
			render: (price: number, record) => <Input value={price} disabled={!record.modify}/>,
		}, {
			title: "电话号码",
			width: 150,
			dataIndex: "phone",
			key: "phone",
			render: (phone: string, record) => <Input value={phone} disabled={!record.modify}/>,
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
			width: 100,
			dataIndex: "tools",
			key: "tools",
			render: (_, record) => (
				<Flex className=" items-center">
					{/*<Button className="mr-3" type="primary" onClick={() => record.modify = !record.modify}>修改</Button>*/}
					<Popconfirm
						title="删除用户"
						description="确认要删除用户吗？"
						onConfirm={() => handlerDelete(record.uid)}
						okText="Yes"
						cancelText="No"
					>
						<Button type="default" danger>删除</Button>
					</Popconfirm>
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

	// 确定删除用户
	const handlerDelete = async (uid: string) => {
		const res = await deleteUserApi({userUid: uid});
		if (res.code !== 200) {
			dispatch(setMessageStatus({typeStatus: "error", message: "用户删除失败！", description: res.msg}));
			return;
		}
		dispatch(setMessageStatus({typeStatus: "success", message: "用户删除成功！", description: ""}));
		history(0);
	};

	return (
		<>
			<Table className="w-full mt-5" rowSelection={rowSelection} bordered columns={columns} scroll={{x: 1600}} dataSource={props.userList}/>
		</>
	);
};
