// 引入React-Router
import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "@/pages/Home/Home";
import {Login} from "@/pages/Login/Login";
import {Header} from "@/components/Header/Header";
import {About} from "@/pages/About/About";
import {useAppDispatch} from "@/app/hooks";
import {userInfoAsync} from "@/store/actions/userInfoAction";
import {Shop} from "@/pages/Shop/Shop";
import {ShoppingCart} from "@/pages/ShoppingCart/ShoppingCart";
import {User} from "@/pages/User/User";
import {OrderForm} from "@/pages/OrderForm/OrderForm";
import {Register} from "@/pages/Register/Register";
import {UserLoad} from "@/pages/UserLoad/UserLoad";
import {ModifyPassword} from "@/pages/ModifyPassword/ModifyPassword";
import {Charts} from "@/pages/Charts/Charts";
import {Product} from "@/pages/Product/Product";
import Cookies from "js-cookie";
import {UserList} from "@/pages/UserList/UserList";
import {AllProductList} from "@/pages/AllProductList/AllProductList";
import {Wallet} from "@/pages/Wallet/Wallet";
import {MessageComponent} from "@/components/Message/MessageComponent";
import {notification} from "antd";
import {ForgotPassword} from "@/pages/ForgotPassword/ForgotPassword";
import {ContactUs} from "@/pages/ContactUs/ContactUs";
import {BottomComponent} from "@/components/BottonComponent/BottomCompont";
import {ProductType} from "@/pages/ProductType/ProductType";
import {TokenGuard} from "@/router/TokenGuard";
import {FeedBack} from "@/pages/FeedBack/FeedBack";
import {ProductInfo} from "@/pages/ProductInfo/ProductInfo";
// 引入组件

export const AppRouter = () => {

	// 获取 store
	const dispatch = useAppDispatch();

	// 在页面加载时调用
	useEffect(() => {
		// 配置弹窗
		notification.config({
			placement: "topRight",
			top: 50,
			duration: 3,
			rtl: true,
		});
		// 获取用户信息
		if (Cookies.get("token")) {
			dispatch(userInfoAsync());
		}
	}, []);

	return (
		<BrowserRouter>
			<Header/>
			<MessageComponent/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/about" element={<About/>}/>
				<Route path="/shop" element={<Shop/>}/>
				<Route path="/contact-us" element={<ContactUs/>}/>
				<Route path="/ShoppingCart" element={<TokenGuard><ShoppingCart/></TokenGuard>}/>
				<Route path="/orderForm" element={<TokenGuard><OrderForm/></TokenGuard>}/>
				<Route path="/allProductType" element={<TokenGuard><ProductType/></TokenGuard>}/>
				<Route path="/user" element={<TokenGuard><User/></TokenGuard>}/>
				<Route path="/userLoad" element={<TokenGuard><UserLoad/></TokenGuard>}/>
				<Route path="/wallet" element={<TokenGuard><Wallet/></TokenGuard>}/>
				<Route path="/modifyPassword" element={<TokenGuard><ModifyPassword/></TokenGuard>}/>
				<Route path="/charts" element={<TokenGuard><Charts/></TokenGuard>}/>
				<Route path="/productList" element={<TokenGuard><Product/></TokenGuard>}/>
				<Route path="/userList" element={<TokenGuard><UserList/></TokenGuard>}/>
				<Route path="/allProductList" element={<TokenGuard><AllProductList/></TokenGuard>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				<Route path="/forgotPassword" element={<ForgotPassword/>}/>
				<Route path="/feedBack" element={<TokenGuard><FeedBack/></TokenGuard>}/>
				<Route path="/productInfo" element={<TokenGuard><ProductInfo/></TokenGuard>}/>
			</Routes>
			<BottomComponent/>
		</BrowserRouter>
	);
};
