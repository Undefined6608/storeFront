import { useAppSelector } from "@/app/hooks";
import { getSearchListStatus } from "@/store/reducers/searchListStatusSlice";
import React from "react";

export const SearchList: React.FC = () => {

	const searchListStatus = useAppSelector(getSearchListStatus);

	return (
		<>
			{
				searchListStatus?.status?
					<div
						className="searchList w-full absolute top-16 right-0 flex flex-col items-center justify-start">
						<div className="w-full h-12 bg-white border-2 border-black"> saikfdujoiasfjoiahfop</div>
					</div > :
					null
			}
		</>
	);
};