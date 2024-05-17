import { UserListTable } from "@/components/UserListTable/UserListTable";
import { Card } from "antd";
import React from "react";

export const UserList: React.FC = () => {

	return (
		<>
			<div className={"container-page w-full"}>
				<Card className="w-10/12 mt-3" title={"用户列表"}>
					<UserListTable/>
				</Card>
			</div>
		</>
	);
};
