// 引入React-Router
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Header } from "@/components/Header";
import { About } from "@/pages/About";
import { useAppDispatch } from "@/app/hooks";
import { userInfoAsync } from "@/store/actions/userInfoAction";
import { Shop } from "@/pages/Shop";
import { ShoppingCart } from "@/pages/ShoppingCart";
import { User } from "@/pages/User";
import { OrderForm } from "@/pages/OrderForm";
import { Register } from "@/pages/Register";
import { UserLoad } from "@/pages/UserLoad";
import { ModifyPassword } from "@/pages/ModifyPassword";
import { Charts } from "@/pages/Charts";
import { Product } from "@/pages/Product";
import Cookies from "js-cookie";
import { UserList } from "@/pages/UserList";
import { AllProductList } from "@/pages/AllProductList";
import { Wallet } from "@/pages/Wallet";
import { MessageComponent } from "@/components/Message/MessageComponent";
import { notification } from "antd";
import { ForgotPassword } from "@/pages/ForgotPassword";
// 引入组件

export const AppRouter = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		notification.config({
			placement: "topRight",
			top: 50,
			duration: 3,
			rtl: true,
		});
		if (Cookies.get("token")) {
			dispatch(userInfoAsync());
		}
	}, []);
	return (
		<BrowserRouter>
			<Header />
			<MessageComponent />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/shop" element={<Shop />} />
				<Route path="/ShoppingCart" element={<ShoppingCart />} />
				<Route path="/orderForm" element={<OrderForm />} />
				<Route path="/user" element={<User />} />
				<Route path="/userLoad" element={<UserLoad />} />
				<Route path="/wallet" element={<Wallet />} />
				<Route path="/modifyPassword" element={<ModifyPassword />} />
				<Route path="/charts" element={<Charts />} />
				<Route path="/productList" element={<Product />} />
				<Route path="/userList" element={<UserList />} />
				<Route path="/allProductList" element={<AllProductList />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgotPassword" element={<ForgotPassword />} />
			</Routes>
		</BrowserRouter>
	);
};
