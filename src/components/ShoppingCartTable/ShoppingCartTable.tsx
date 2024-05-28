import React, {useState} from "react";
import {ShoppingCartStatus} from "@/types/global";
import {Button, Flex, Popconfirm, Table, TableColumnsType} from "antd";
import {useAppDispatch} from "@/app/hooks";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {deleteShoppingCartStatus} from "@/store/reducers/shoppingCartSlice";
import {useNavigate} from "react-router-dom";

export const ShoppingCartTable: React.FC<{ list: ShoppingCartStatus[] }> = ({list}) => {
	const columns: TableColumnsType<ShoppingCartStatus> = [
		{
			title: "序号",
			width: 60,
			dataIndex: "id",
			key: "id",
			render: (_, __, index) => index + 1,
		}, {
			title: "商品图片",
			width: 100,
			dataIndex: "icon",
			key: "icon",
			render: (icon: string) => <img src={icon} style={{width: 120, height: 70}}/>,
		}, {
			title: "商品名称",
			width: 100,
			dataIndex: "name",
			key: "name",
		}, {
			title: "商品类型",
			width: 100,
			dataIndex: "type_name",
			key: "type_name",
		}, {
			title: "商户",
			width: 100,
			dataIndex: "user_uid",
			key: "user_uid",
		},
		{
			title: "商品单价",
			width: 100,
			dataIndex: "price",
			key: "price",
		}, {
			title: "购买数量",
			width: 100,
			dataIndex: "num",
			key: "num",
		}, {
			title: "总价",
			width: 100,
			dataIndex: "sum",
			key: "sum",
			render: (_, record) => (<>{record.price * record.num}</>),
		},
	];

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const dispatch = useAppDispatch();

	const history = useNavigate();

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const handlerPay = () => {
		if (selectedRowKeys.length > 0) {
			dispatch(setMessageStatus({typeStatus: "success", message: "支付成功！", description: ""}));
			handlerDelete();
			history(0);
		}
	};

	const handlerDelete = () => {
		if (selectedRowKeys.length > 0) {
			selectedRowKeys.forEach(item => {
				dispatch(deleteShoppingCartStatus(list.filter(value => value.key === item)[0]));
			});
		}
	};

	return (
		<>
			<Table
				className="w-full mt-5"
				rowSelection={rowSelection}
				bordered columns={columns}
				scroll={{x: 1600}}
				dataSource={list}
			/>
			<Flex className={"w-full items-center justify-evenly mt-10"}>
				<Button
					className={"w-2/5"}
					type={"primary"}
					disabled={selectedRowKeys.length === 0}
					onClick={handlerPay}
				>
					结算
				</Button>

				<Popconfirm
					title="删除商品"
					description="确认要删除商品吗？"
					onConfirm={() => handlerDelete()}
					okText="Yes"
					cancelText="No"
				>
					<Button
						className={"w-2/5"}
						danger
						disabled={selectedRowKeys.length === 0}
					>
						删除
					</Button>
				</Popconfirm>
			</Flex>
		</>
	);
};
