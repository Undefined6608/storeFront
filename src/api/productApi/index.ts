// 用户名查重接口
import {get, post} from "@/config/request";
import {BaseResponseType} from "@/types/api";
import {
	BannerResponse, ProductItemType,
	ProductResponse,
	ProductTypeResponse,
} from "@/types/api/product";
import {AddProductType, GetProductInfoParam} from "@/types/request/productRequest";

// 获取商品轮播图列表
export const getBannerListApi = () =>
	get<BaseResponseType<BannerResponse>>("/product/getBannerList")
		.then(r => r.data);

// 获取商品类型列表
export const getProductTypeApi = () =>
	get<BaseResponseType<ProductTypeResponse>>("/product/getProductType")
		.then(r => r.data);

// 通过id获取商品类型名称
export const getProductTypeNameByIdApi = (id: number) =>
	get<BaseResponseType<{ typeName: string }>>(`/product/getProductType?typeId=${id}`)
		.then(r => r.data);

// 获取全部商品列表
export const getProductListApi = () =>
	get<BaseResponseType<ProductResponse>>("/product/getProductList")
		.then(r => r.data);

// 获取用户对应的商品列表
export const getProductListByUserUidApi = (userUid: string) =>
	get<BaseResponseType<ProductResponse>>(`/product/getProductList?userUid=${userUid}`)
		.then(r => r.data);

// 获取对应类型的商品列表
export const getProductListByTypeIdApi = (typeId: number) =>
	get<BaseResponseType<ProductResponse>>(`/product/getProductList?typeId=${typeId}`)
		.then(r => r.data);

// 添加商品
export const addProductApi = (body: AddProductType) =>
	post<BaseResponseType<string>>("/product/addProduct", {...body})
		.then(r => r.data);

// 商品详情
export const getProductInfoApi = (param: GetProductInfoParam) =>
	get<BaseResponseType<{ productInfo: ProductItemType }>>(`/product/getProductInfo?productId=${param.productId}`).then(r => r.data);

// 删除商品
export const deleteProductApi = (param: { productId: number }) =>
	post<BaseResponseType<string>>("/product/deleteProduct", {...param}).then(r => r.data);
