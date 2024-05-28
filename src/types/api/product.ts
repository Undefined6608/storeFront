// 轮播图单条目
export interface BannerItem {
	id: number;
	banner: string;
	productName: string;
	product_id: number;
	uid: string
}

// 轮播图Api响应类型
export interface BannerResponse {
	bannerList: BannerItem[]
}

// 商品类型条目类型
export interface ProductTypeItem {
	id: number;
	root: number;
	type: string;
}

// 商品类型Api响应类型
export interface ProductTypeResponse {
	productType: ProductTypeItem[];
}

// 商品条目类型
export interface ProductItemType {
	id: number,
	name: string,
	type_id: number,
	type_name: string,
	user_uid: string,
	icon: string,
	price: number,
	content: string,
	recommend: number,
	not_recommended: number,
	collect: number,
	status: boolean,
	uid: string
}

// 商品Api响应类型
export interface ProductResponse {
	productList: ProductItemType[];
}
