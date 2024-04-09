import {md5} from "js-md5";

export const passwordEncryption = (password:string):string => {
    return md5(password+"392a2f71-4bd5-44fc-a6fa-b3448085a4c9");
};

export const baseUploadImgUrl = ():string=> {
    return "/api/upload";
};
