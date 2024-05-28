import React from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {getModuleBoxStatus, setUserModuleBoxStatus} from "@/store/reducers/moduleBoxStatusSlice";
import {Button, Card, Flex, Form, Input, Switch} from "antd";
import {UserLoadParam} from "@/types/request/orderFormRequest";
import {LoginRegExp} from "@/utils/rules";
import {addUserLoadApi} from "@/api/loadApi";
import {setMessageStatus} from "@/store/reducers/messageSlice";
import {useNavigate} from "react-router-dom";

export const AddUserLoad: React.FC = () => {
	const moduleStatus = useAppSelector(getModuleBoxStatus);
	const dispatch = useAppDispatch();
	const history = useNavigate();
	const handlerClose = () => {
		dispatch(setUserModuleBoxStatus({addUserLoad: false}));
	};

	const formSubmit = async (body: UserLoadParam) => {
		if (body.def) {
			body.def = 2;
		} else {
			body.def = 1;
		}
		if (body.gender) {
			body.gender = 2;
		} else {
			body.gender = 1;
		}
		const res = await addUserLoadApi(body);
		if (res.code !== 200) {
			dispatch(setMessageStatus({typeStatus: "error", message: "添加失败！", description: res.msg}));
			return;
		}
		dispatch(setMessageStatus({typeStatus: "success", message: "添加成功！", description: ""}));
		setTimeout(() => {
			handlerClose();
			history(0);
		}, 500);
	};
	return (
		<>
			{
				moduleStatus.addUserLoad ?
					<div
						className={"z-20 w-full h-full fixed top-0 left-0 bg-gray-800/50 flex flex-col items-center justify-center overflow-y-auto"}
						onClick={handlerClose}
					>
						<Card
							className={"w-4/5 m-auto mt-3"} title={"添加用户收货地址"}
							onClick={event => event.stopPropagation()}
						>
							<Form
								initialValues={{gender: false, def: false}}
								labelCol={{span: 3}}
								onFinish={formSubmit}
							>
								<Form.Item
									label={"收件人"}
									name={"consignee"}
									htmlFor={"consignee"}
									rules={[
										{required: true, message: "收件人不能为空"},
									]}
								>
									<Input id={"consignee"}/>
								</Form.Item>
								<Form.Item
									label={"电话号码"}
									name={"phone"}
									htmlFor={"phone"}
									rules={[
										{required: true, message: "电话号码不能为空"},
										{
											pattern: LoginRegExp.phone,
											whitespace: false,
											message: "电话号码格式错误",
										},
									]}
								>
									<Input id={"phone"}/>
								</Form.Item>
								<Form.Item
									label={"性别"}
									name={"gender"}
									htmlFor={"gender"}
									tooltip={"左边：男，右边：女"}
								>
									<Switch className={"float-left"} id={"gender"}/>
								</Form.Item>
								<Form.Item
									label={"收件地址"}
									name={"address"}
									htmlFor={"address"}
									rules={[
										{required: true, message: "收件地址不能为空"},
									]}
								>
									<Input id={"address"}/>
								</Form.Item>
								<Form.Item
									label={"是否默认"}
									name={"def"}
									htmlFor={"def"}
								>
									<Switch className={"float-left"} id={"def"}/>
								</Form.Item>
								<Form.Item>
									<Flex
										className={"items-center justify-evenly"}
									>
										<Button
											className={"w-2/5"}
											type={"primary"}
											htmlType={"submit"}
										>
											提交
										</Button>
										<Button
											className={"w-2/5"}
											onClick={handlerClose}
										>
											取消
										</Button>
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
