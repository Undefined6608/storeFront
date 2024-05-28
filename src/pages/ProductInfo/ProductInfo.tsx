import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getProductInfoApi, getProductTypeNameByIdApi} from "@/api/productApi";
import {ProductItemType} from "@/types/api/product";
import {useAppDispatch} from "@/app/hooks";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {Button, Card, Flex} from "antd";
import {PayProduct} from "@/components/PayProduct/PayProduct";
import {setUserModuleBoxStatus} from "@/store/reducers/moduleBoxStatusSlice";
import {getUserNameByUidApi} from "@/api/userApi";

export const ProductInfo: React.FC = () => {
	const {state} = useLocation();
	const [productInfo, setProductInfo] = useState<ProductItemType>();
	const dispatch = useAppDispatch();
	const [recommend, setRecommend] = useState<number>(0);
	const [star, setStar] = useState<boolean>();
	useEffect(() => {
		getProductInfo(state.id);
	}, [state.id]);
	const getProductInfo = async (productId: number) => {
		const res = await getProductInfoApi({productId});
		if (res.code !== 200) {
			dispatch(setMessageStatus({typeStatus: "error", message: "获取详细信息失败", description: res.msg}));
			setProductInfo(undefined);
			return;
		}
		const resUser = await getUserNameByUidApi(res.data.productInfo.user_uid);
		if (resUser.code !== 200) {
			dispatch(setMessageStatus({typeStatus: "error", message: "获取用户信息失败", description: res.msg}));
			return;
		}
		const resTypeName = await getProductTypeNameByIdApi(res.data.productInfo.type_id);
		if (resTypeName.code !== 200) {
			dispatch(setMessageStatus({typeStatus: "error", message: "获取类型信息失败", description: res.msg}));
			return;
		}
		setProductInfo({
			...res.data.productInfo,
			user_uid: resUser.data.userName,
			type_name: resTypeName.data.typeName,
		});
	};

	const handlerRecommend = () => {
		if (recommend !== 1) {
			setRecommend(1);
			return;
		}
		setRecommend(0);
	};

	const handlerNotRecommend = () => {
		if (recommend !== 2) {
			setRecommend(2);
			return;
		}
		setRecommend(0);
	};

	const handlerStar = () => {
		setStar(!star);
	};

	const handlerPay = () => {
		dispatch(setUserModuleBoxStatus({payProduct: true}));
	};

	return (
		<div className={"container-page relative"}>
			{
				productInfo ?
					<>
						<Card className={"w-4/5 mt-3"} title={productInfo.name}>
							<Flex className={"w-full flex-col items-center"}>
								<Flex className={"w-full items-center justify-evenly"}>
									<div className={"w-64 h-64 shadow-xl rounded-xl overflow-hidden"}>
										<img className={"w-full h-full"} src={productInfo.icon}/>
									</div>
									<div className="w-96 h-64 bg-sky-200/50 shadow-xl rounded-xl overflow-hidden p-5">
										<Flex className={"w-full items-center justify-between"}>
											<Button
												className={"w-2/5 h-10 m-3"}
												style={recommend === 1 ? {background: "rgb(187,247,208)"} : {}}
												onClick={handlerRecommend}
											>
												<Flex className={"items-center justify-center"}>
													<div className="w-5 h-5"><img src={"/static/icon/recommend.png"}/>
													</div>
													{/*<span className={"ml-3"}>{productInfo.recommend}</span>*/}
												</Flex>
											</Button>
											<Button
												className={"w-2/5 h-10 m-3"}
												style={recommend === 2 ? {background: "rgb(254,202,202)"} : {}}
												onClick={handlerNotRecommend}
											>
												<Flex className={"items-center justify-center"}>
													<div className="w-5 h-5"><img
														src={"/static/icon/not_recommended.png"}/>
													</div>
													{/*<span className={"ml-3"}>{productInfo.not_recommended}</span>*/}
												</Flex>
											</Button>
										</Flex>
										<Button
											className={"w-2/5 h-10 m-3"}
											style={star ? {background: "rgb(253,230,138)"} : {}}
											onClick={handlerStar}
										>
											<Flex className={"items-center justify-center"}>
												<div className="w-5 h-5"><img src={"/static/icon/star.png"}/></div>
												{/*<span className={"ml-3"}>{productInfo.not_recommended}</span>*/}
											</Flex>
										</Button>
										<Button
											type={"primary"}
											className={"w-4/5 h-10 m-3 text-white font-bold"}
											onClick={handlerPay}
										>
											立即购买
										</Button>
									</div>
								</Flex>
								<Flex
									className="w-full flex-wrap text-xl mt-10 bg-amber-200/50 shadow-xl rounded-xl justify-between p-10">
									<Flex className={"w-2/5 m-3"}>
										<div className="text-right">商品名称：</div>
										<div className={"flex-1 font-bold text-left"}>{productInfo.name}</div>
									</Flex>
									<Flex className={"w-2/5 m-3"}>
										<div className="text-right">商品价格：</div>
										<div
											className={"flex-1 font-bold text-left text-blue-400"}>￥{productInfo.price}</div>
									</Flex>
									<Flex className={"w-2/5 m-3"}>
										<div className="text-right">商品类型：</div>
										<div className={"flex-1 font-bold text-left"}>{productInfo.type_name}</div>
									</Flex>
									<Flex className={"w-2/5 m-3"}>
										<div className="text-right">产品提供商：</div>
										<div className={"flex-1 font-bold text-left"}>{productInfo.user_uid}</div>
									</Flex>
									<Flex className={"w-full m-3"}>
										<div className="text-right">产品描述：</div>
										<div className={"flex-1 font-bold text-left"}>{productInfo.content}</div>
									</Flex>
								</Flex>
							</Flex>
						</Card>
						<PayProduct product={productInfo}/>
					</> :
					null
			}
		</div>
	);
};
