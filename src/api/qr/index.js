import ApiQr from './qr.js';

export const apiGetQr = (jwt) => {
    return ApiQr.getQr(jwt).then(res => res.data);
};