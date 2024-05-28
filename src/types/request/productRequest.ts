// 添加商品参数类型
export interface AddProductType {
	typeId:number,
	name:string;
	banner:string;
	icon: string;
	price:number;
	content:string;
}

// 获取商品详情类型
export interface GetProductInfoParam {
	productId: number
}
