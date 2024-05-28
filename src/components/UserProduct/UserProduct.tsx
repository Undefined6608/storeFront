import {deleteProductApi, getProductTypeApi} from "@/api/productApi";
import {ProductTableType} from "@/types";
import {ProductTypeItem} from "@/types/api/product";
import {Button, Flex, Input, InputNumber, Popconfirm, Select, Switch, Table, TableColumnsType} from "antd";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "@/app/hooks";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {useNavigate} from "react-router-dom";

export const UserProduct: React.FC<{ data: ProductTableType[] }> = (props) => {

	const dispatch = useAppDispatch();

	const history = useNavigate();

	const columns: TableColumnsType<ProductTableType> = [
		{
			title: "序号",
			width: 60,
			dataIndex: "id",
			key: "id",
			render: (_, __, index) => index + 1,
		}, {
			title: "商品图片",
			width: 120,
			dataIndex: "icon",
			key: "icon",
			render: (icon: string) => <img src={icon} style={{width: 120, height: 70}}/>,
		}, {
			title: "商品名称",
			width: 150,
			dataIndex: "name",
			key: "name",
			render: (name: string, record) => <Input value={name} disabled={!record.modify}/>,
		}, {
			title: "商品类型",
			width: 150,
			dataIndex: "type_id",
			key: "type_id",
			render: (type_id: number, record) => <Select className={"w-full"} value={type_id} disabled={!record.modify}>
				{
					productTypeOptions.map(item =>
						<Select.Option key={item.id + "productType"} value={item.id}>{item.type}</Select.Option>,
					)
				}
			</Select>,
		}, {
			title: "商品ID",
			width: 150,
			dataIndex: "uid",
			key: "uid",
		}, {
			title: "商户ID",
			width: 150,
			dataIndex: "user_uid",
			key: "user_uid",
		}, {
			title: "商品价格",
			width: 100,
			dataIndex: "price",
			key: "price",
			render: (price: number, record) =>
				<Flex className="items-center w-full">
					<InputNumber
						className={"flex-1"}
						value={price}
						disabled={!record.modify}
					/>
					<span>￥</span>
				</Flex>,
		}, {
			title: "商品描述",
			width: 200,
			dataIndex: "content",
			key: "content",
			render: (content: string, record) => <Input.TextArea value={content} disabled={!record.modify}/>,
		}, {
			title: "推荐次数",
			width: 60,
			dataIndex: "recommend",
			key: "recommend",
		}, {
			title: "收藏次数",
			width: 60,
			dataIndex: "collect",
			key: "collect",
		}, {
			title: "上架状态",
			width: 80,
			dataIndex: "status",
			key: "status",
			render: (_, record) => (
				<Switch className="mr-3" value={record.status}/>
			),
		}, {
			title: "操作",
			width: 200,
			dataIndex: "tools",
			key: "tools",
			render: (_, record) => (
				<Flex className=" items-center">
					{/*<Button className="mr-3" type="primary" onClick={() => record.modify = !record.modify}>修改</Button>*/}
					<Popconfirm
						title="删除商品"
						description="确认要删除商品吗？"
						onConfirm={() => handlerDelete(record.id)}
						okText="Yes"
						cancelText="No"
					>
						<Button
							type="default"
							danger
						>
							删除
						</Button>
					</Popconfirm>
				</Flex>
			),
		},
	];

	const [productTypeOptions, setProductTypeOptions] = useState<ProductTypeItem[]>([]);

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const getProductType = async () => {
		const res = await getProductTypeApi();
		if (res.code === 200) {
			setProductTypeOptions(res.data.productType);
		}
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const handlerDelete = async (id: number) => {
		const res = await deleteProductApi({productId: id});
		if (res.code !== 200) {
			dispatch(setMessageStatus({typeStatus: "error", message: "删除失败！", description: res.msg}));
			return;
		}
		dispatch(setMessageStatus({typeStatus: "success", message: "删除成功！", description: ""}));
		history(0);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	useEffect(() => {
		getProductType();
	}, []);

	return (
		<>
			<Table
				className="w-full mt-5"
				rowSelection={rowSelection}
				bordered
				columns={columns}
				scroll={{x: 1600}}
				dataSource={props.data}
			/>
		</>
	);
};
