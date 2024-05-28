import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {getModuleBoxStatus, setUserModuleBoxStatus} from "@/store/reducers/moduleBoxStatusSlice";
import {Button, Card, Flex, Form, Input, Select} from "antd";
import {ProductItemType} from "@/types/api/product";
import {useNavigate} from "react-router-dom";
import {getUserLoadListApi} from "@/api/loadApi";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {addShoppingCartStatus} from "@/store/reducers/shoppingCartSlice";
import {v4} from "uuid";

interface PayProductProps {
	product: ProductItemType
}

interface FormDataType {
	num: number;
	loadId: number;
}

export const PayProduct: React.FC<PayProductProps> = ({product}) => {
	const moduleStatus = useAppSelector(getModuleBoxStatus);
	const dispatch = useAppDispatch();
	const history = useNavigate();

	// 定义用户load列表
	const [userLoadList, setUserLoadList] = useState<{label:string,value:number}[]>([]);

	const handlerClose = () => {
		dispatch(setUserModuleBoxStatus({payProduct: false}));
	};

	const jumpAddLocation = () => {
		history("/userLoad");
	};

	const handlerAddShoppingCart = (body:FormDataType) => {
		// console.log(body);
		if (!body.loadId){
			dispatch(setMessageStatus({typeStatus:"warning",message:"参数错误！",description:"收货地址为空"}));
			return;
		}
		dispatch(addShoppingCartStatus({key:v4(),...product,...body}));
		dispatch(setMessageStatus({typeStatus:"success",message:"添加成功！",description:""}));
		setTimeout(()=>{
			handlerClose();
			history("/shoppingCart");
		},500);
	};

	// 获取列表
	const getUserLoadList = async () => {

		const res = await getUserLoadListApi();

		if (res.code !== 200) {
			dispatch(setMessageStatus({typeStatus: "error", message: res.msg, description: ""}));
			return;
		}
		if (res.data.userAddress) {
			setUserLoadList(res.data.userAddress.map((item) => {
				return {
					label: item.address,
					value: item.id,
				};
			}));
		}

	};

	// 页面加载获取数据
	useEffect(() => {
		getUserLoadList();
	}, []);
	return (
		<>
			{
				moduleStatus.payProduct ?
					<div
						className={"w-full h-full bg-gray-800/50 fixed top-0 left-0 z-20 overflow-y-auto"}
						onClick={handlerClose}
					>
						<Card
							className={"w-4/5 m-auto mt-3"} title={"购买商品"}
							onClick={event => event.stopPropagation()}
						>
							<Form
								labelCol={{span: 3}}
								onFinish={handlerAddShoppingCart}
							>
								<Form.Item label={"商品名称"}>
									<Input value={product.name} disabled/>
								</Form.Item>
								<Form.Item label={"商品类型"}>
									<Input value={product.type_name} disabled/>
								</Form.Item>
								<Form.Item label={"商品价格"}>
									<Input value={product.price} disabled/>
								</Form.Item>
								<Form.Item
									label={"购买数量"}
									name={"num"}
									htmlFor={"num"}
									rules={[
										{required:true,message:"请输入购买数量"},
									]}
								>
									<Input id={"num"} type={"number"}/>
								</Form.Item>
								<Form.Item
									label={"请选择收货地址"}
									name={"loadId"}
									htmlFor={"loadId"}
								>
									<Select id={"loadId"} options={userLoadList}/>
								</Form.Item>
								<div
									className={"w-full ml-5 cursor-pointer text-right pr-5 text-amber-500 hover:underline"}
									onClick={jumpAddLocation}
								>
									没找到想要的收货地址,前往添加
								</div>
								<Form.Item className={"mt-10"}>
									<Flex className={"w-full items-center justify-evenly"}>
										<Button
											className={"w-2/5"}
											htmlType={"submit"}
											type={"primary"}
										>加入到购物车</Button>
										<Button className={"w-2/5"} onClick={handlerClose}>取消</Button>
									</Flex>
								</Form.Item>
							</Form>
						</Card>
					</div> :
					null
			}
		</>
	);
};
