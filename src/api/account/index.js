import ApiAccount from './account.js';

export const apiGetUser = (jwt) => {
    return ApiAccount.GetUser(jwt).then(res => res.data);
};

export const apiUpdateUser = (body,jwt) => {
    return ApiAccount.UpdateUser(body,jwt).then(res => res.data);
};

export const apiUpdateUserAvatar = (body,jwt) => {
    return ApiAccount.UpdateUserAvater(body,jwt).then(res => res.data);
};
