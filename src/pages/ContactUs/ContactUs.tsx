import React from "react";
import {Button, Card, Form, Input} from "antd";
import {AddFeedBackType} from "@/types/request/feedBackRequest";
import {LoginRegExp} from "@/utils/rules";
import {addFeedBackApi} from "@/api/feedBackApi";
import {useAppDispatch} from "@/app/hooks";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {useNavigate} from "react-router-dom";

export const ContactUs: React.FC = () => {
	// 获取 store
	const dispatch = useAppDispatch();
	// 获取 router
	const history = useNavigate();

	// 提交反馈
	const handlerFinish = (param: AddFeedBackType) => {
		addFeedBack(param);
	};

	// 添加反馈
	const addFeedBack = async (param: AddFeedBackType) => {
		const res = await addFeedBackApi(param);
		if (res.code === 401) {
			// 给出提示
			dispatch(setMessageStatus({typeStatus: "error", message: "添加失败", description: "请先登录!"}));
			return;
		}
		if (res.code !== 200) {
			// 给出提示
			dispatch(setMessageStatus({typeStatus: "error", message: "添加失败", description: res.msg}));
			return;
		}
		// 给出提示
		dispatch(setMessageStatus({typeStatus: "success", message: "添加成功", description: res.msg}));
		// 刷新页面
		setTimeout(()=>{
			history(0);
		},1000);
	};

	return (
		<div className="container-page justify-evenly">
			<h1 className={"text-2xl font-bold mt-3"}>Co-Store</h1>
			<h2 className={"text-lg mt-3"}>Co 系列商城项目</h2>
			<Card className={"w-4/5 mt-3"} title={"联系我们"}>
				<Form
					className={"w-full"}
					labelCol={{span: 2}}
					onFinish={handlerFinish}
				>
					<Form.Item
						label={"联系人"}
						name={"name"}
						rules={[
							{required: true, message: "联系人不能为空"},
						]}
					>
						<Input placeholder={"请输入联系人"}/>
					</Form.Item>
					<Form.Item
						label={"电话号码"}
						name={"phone"}
						rules={[
							{required: true, message: "电话号码不能为空"},
							{
								pattern: LoginRegExp.phone,
								whitespace: false,
								message: "电话号码格式错误",
							},
						]}
					>
						<Input placeholder={"请输入电话号码"}/>
					</Form.Item>
					<Form.Item
						label={"邮箱地址"}
						name={"email"}
						rules={[
							{required: true, message: "邮箱不能为空"},
							{
								pattern: LoginRegExp.email,
								whitespace: false,
								message: "邮箱格式错误",
							},
						]}
					>
						<Input placeholder={"请输入邮箱"}/>
					</Form.Item>
					<Form.Item
						label={"问题描述"}
						name={"content"}
						rules={[
							{required: true, message: "问题描述不能为空"},
						]}
					>
						<Input.TextArea placeholder={"请输入问题描述"}/>
					</Form.Item>
					<Form.Item>
						<Button type={"primary"} htmlType={"submit"} className={"w-4/5"}>提交</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};
