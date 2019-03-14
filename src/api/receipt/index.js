import ApiReceipt from './receipt';

export const apiGetReceipt = (jwt,page,id="") => {
    return ApiReceipt.GetReceipt(jwt,page,id).then(res => res.data);
};