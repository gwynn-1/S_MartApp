import ApiAuth from './auth.js';

export const apiLogin = (body) => {
    return ApiAuth.Login(body).then(res => res.data);
};

export const apiRegister = (body) => {
    return ApiAuth.Register(body).then(res => res.data);
};

export const apiLogout = (jwt) => {
    return ApiAuth.Logout(jwt).then(res => res.data);
};

export const apiCheckLogin = (body) => {
    return ApiAuth.CheckLogin(body).then(res => res.data);
};