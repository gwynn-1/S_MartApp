import ApiProduct from './product.js';

export const apiGetProduct = (search = "") => {
    return ApiProduct.GetProduct(search).then(res => res.data);
};