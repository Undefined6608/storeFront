export interface BannerItem {
	id: number;
	banner: string;
	productName: string;
	product_id: number;
	uid: string
}
export interface BannerResponse {
	bannerList: BannerItem[]
}

export interface ProductTypeItem {
	id: number;
	root: number;
	type: string;
}

export interface ProductTypeResponse {
	productType: ProductTypeItem[];
}

export interface ProductItemType {
	id: number,
	name: string,
	type_id: number,
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

export interface ProductResponse {
	productList: ProductItemType[];
}
