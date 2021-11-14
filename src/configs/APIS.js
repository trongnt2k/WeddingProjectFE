import axios from 'axios'

export let endpoints = {
    'weddinghalls': '/weddinghalls/',
    'weddinghallDetail': (weddinghallId) => `/weddinghalls/${weddinghallId}/`,
    'services': '/services/',
    'serviceDetail': (serviceId) => `/services/${serviceId}/`,
    'menus': '/menus/',
    'menuDetail': (menuId) => `/menus/${menuId}/`,
    'dishes-and-drink': (menuId) => `/menus/${menuId}/dishes-and-drink/`,
    'users': '/users/',
    'weddings': '/weddings/',
    'create-wedding': '/weddings/create-wedding/',
    'weddingDetail': (weddingId) => `/weddings/${weddingId}/`,
    'weddings-services': (weddingId) => `/weddings/${weddingId}/wedding-service/`,
    'weddings-weddinghall': (weddingId) => `/weddings/${weddingId}/wedding-weddinghall/`,
    'weddings-menu': (weddingId) => `/weddings/${weddingId}/wedding-menu/`,
    'weddings-create': '/weddings/create-wedding/',
    'oauth2-info': '/oauth2-info/',
    'login': "/o/token/",
    'current-user': "/users/current-user/",
    'update-user': (userId) => `/users/${userId}/`,
    'comments': (weddingId) => `/weddings/${weddingId}/get-comment/`,
    'add-comment': (weddingId) => `/weddings/${weddingId}/add-comment/`,
    'rating': (weddingId) => `/weddings/${weddingId}/rating/`,
}

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})