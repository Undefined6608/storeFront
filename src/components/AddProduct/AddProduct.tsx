import React, {useEffect, useState} from "react";
import {Button, Card, Flex, Form, GetProp, Input, Select, Space, Upload, UploadProps} from "antd";
import {addProductApi, getProductTypeApi} from "@/api/productApi";
import {useAppDispatch} from "@/app/hooks";
import {setUserModuleBoxStatus} from "@/store/reducers/moduleBoxStatusSlice";
import {baseUploadImgUrl} from "@/utils";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {AddProductType} from "@/types/request/productRequest";
import {useNavigate} from "react-router-dom";

interface ProductType {
	value: number;
	label: string;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const AddProduct: React.FC<{ open: boolean }> = (props) => {
	const [productTypeList, setProductTypeList] = useState<ProductType[]>([]);
	// 表单实例
	const [form] = Form.useForm();
	// 获取store
	const dispatch = useAppDispatch();
	// 基础图片上传地址
	const baseUploadUrl = baseUploadImgUrl();
	// 商品图片上传状态
	const [iconLoading, setIconLoading] = useState(false);
	// 商品图片上传状态
	const [bannerLoading, setBannerLoading] = useState(false);
	// 商品图片上传后地址
	const [iconUrl, setIconUrl] = useState<string>();
	// 商品轮播图片上传后地址
	const [bannerUrl, setBannerUrl] = useState<string>();
	// 获取 router
	const history = useNavigate();

	// 获取商品类型
	const getProductType = async () => {
		const res = await getProductTypeApi();
		if (res.code === 200) {
			const typeList: ProductType[] = res.data.productType.map(value => {
				return {value: value.id, label: value.type};
			});
			setProductTypeList(typeList);
		}
	};

	// 关闭弹窗
	const handlerClose = () => {
		dispatch(setUserModuleBoxStatus({addProduct: false}));
	};

	// 商品图片上传之前
	const beforeProductImgUpload = (file: FileType) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			dispatch(
				setMessageStatus(
					{typeStatus: "warning", message: "上传失败", description: "格式不为JPG/PNG"},
				),
			);
		}
		const isLt10M = file.size / 1024 / 1024 < 10;
		if (!isLt10M) {
			dispatch(
				setMessageStatus(
					{typeStatus: "warning", message: "上传失败", description: "大小超过10MB"},
				),
			);
		}
		return isJpgOrPng && isLt10M;
	};

	// 商品图片上传之后
	const handleIconChange: UploadProps["onChange"] = (info) => {
		if (info.file.status === "uploading") {
			setIconLoading(true);
			return;
		}
		if (info.file.status === "done") {
			const result = info.file.response;
			if (result.code !== 200) return;
			setIconUrl(result.data.url);
			setIconLoading(false);
		}
	};

	// 商品图片上传之后
	const handleBannerChange: UploadProps["onChange"] = (info) => {
		if (info.file.status === "uploading") {
			setBannerLoading(true);
			return;
		}
		if (info.file.status === "done") {
			const result = info.file.response;
			if (result.code !== 200) return;
			setBannerUrl(result.data.url);
			setBannerLoading(false);
		}
	};

	// 商品图标上传按钮
	const uploadIconButton = (
		<button style={{border: 0, background: "none"}} type="button">
			{iconLoading ? <LoadingOutlined/> : <PlusOutlined/>}
			<div style={{marginTop: 8}}>Upload</div>
		</button>
	);

	// 商品轮播上传按钮
	const uploadBannerButton = (
		<button style={{border: 0, background: "none"}} type="button">
			{bannerLoading ? <LoadingOutlined/> : <PlusOutlined/>}
			<div style={{marginTop: 8}}>Upload</div>
		</button>
	);

	// 添加商品
	const handlerAdd = async (value: AddProductType) => {
		if (!iconUrl)
			return dispatch(
				setMessageStatus(
					{typeStatus: "warning", message: "添加失败", description: "请选择商品图标"},
				),
			);
		if (!bannerUrl)
			return dispatch(
				setMessageStatus(
					{typeStatus: "warning", message: "添加失败", description: "请选择商品轮播图"},
				),
			);
		value.banner = bannerUrl;
		value.icon = iconUrl;
		value.price = parseInt(String(value.price));
		const res = await addProductApi(value);
		if (res.code !== 200)
			return dispatch(
				setMessageStatus(
					{typeStatus: "error", message: "添加失败", description: res.msg},
				),
			);
		dispatch(
			setMessageStatus(
				{typeStatus: "success", message: "添加成功!", description: ""},
			),
		);
		handlerClose();
		history(0);
	};

	useEffect(() => {
		getProductType();
	}, []);
	return (
		<>
			{props.open ?
				<div
					className={"addProduct z-20 w-full h-full fixed top-0 left-0 bg-gray-800/50 flex flex-col items-center justify-center overflow-y-auto"}
					onClick={handlerClose}>
					<Card className={"w-4/5"} title={"添加商品"} onClick={event => event.stopPropagation()}>
						<Form
							form={form}
							initialValues={{status: true, typeId: 1, price: 0}}
							labelCol={{span: 2}}
							onFinish={handlerAdd}
						>
							<Form.Item
								label={"商品名称"}
								htmlFor={"name"}
								name={"name"}
								rules={[
									{required: true, message: "商品名称不能为空"},
								]}
							>
								<Input id={"name"} placeholder={"请输入商品名称"}/>
							</Form.Item>
							<Form.Item
								label={"商品类型"}
								name={"typeId"}
								htmlFor={"typeId"}
								rules={[
									{required: true, message: "商品类型不能为空"},
								]}
							>
								<Select id={"typeId"} className={"text-left"} options={productTypeList}/>
							</Form.Item>
							<Form.Item
								label={"商品价格"}
								htmlFor={"price"}
								name={"price"}
								rules={[
									{required: true, message: "商品价格不能为空"},
								]}
							>
								<Flex className={"items-center"}>
									<Input type={"number"} id={"price"} placeholder={"请输入商品价格"}/>
									<span>￥</span>
								</Flex>
							</Form.Item>
							<Form.Item
								label={"商品图标"}
								name={"icon"}
								htmlFor={"icon"}
							>
								<Space style={{width: "70vw"}} align={"start"} direction={"horizontal"}>
									<Upload
										id="icon"
										name="image"
										listType="picture-circle"
										style={{width: "70px", height: "70px"}}
										className="ml-3"
										showUploadList={false}
										method={"put"}
										action={baseUploadUrl + "/productIcon"}
										beforeUpload={beforeProductImgUpload}
										onChange={handleIconChange}
									>
										{iconUrl ?
											<img
												src={iconUrl}
												alt="avatar"
												style={
													{width: "100%", borderRadius: "50%"}
												}
											/> :
											uploadIconButton
										}
									</Upload>
								</Space>
							</Form.Item>

							<Form.Item
								label={"商品轮播图片"}
								name={"banner"}
								htmlFor={"banner"}
								className={"flex items-center"}
							>
								<Space style={{width: "70vw"}} align={"start"} direction={"horizontal"}>
									<Upload
										id="banner"
										name="image"
										listType="picture-circle"
										style={{width: "70px", height: "70px"}}
										className="ml-3"
										showUploadList={false}
										method={"put"}
										action={baseUploadUrl + "/productIcon"}
										beforeUpload={beforeProductImgUpload}
										onChange={handleBannerChange}
									>
										{bannerUrl ?
											<img
												src={bannerUrl}
												alt="avatar"
												style={
													{width: "100%", borderRadius: "50%"}
												}
											/> :
											uploadBannerButton
										}
									</Upload>
								</Space>
							</Form.Item>

							<Form.Item
								label={"商品描述"}
								htmlFor={"content"}
								name={"content"}
								rules={[
									{required: true, message: "商品描述不能为空"},
								]}
							>
								<Input.TextArea id={"content"} placeholder={"请输入商品描述"}/>
							</Form.Item>
							<Form.Item>
								<Flex className={"w-full items-center justify-evenly"}>
									<Button className={"w-1/3"} type={"primary"} htmlType={"submit"}>保存</Button>
									<Button className={"w-1/3"} onClick={handlerClose}>取消</Button>
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
