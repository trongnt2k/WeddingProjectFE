import { ADD_MENU_TO_CART, ADD_SERVICE_TO_CART, ADD_WEDDINGHALL_TO_CART, DELETE_MENU_CART_ITEM, DELETE_SERVICE_CART_ITEM, DELETE_WEDDINGHALL_CART_ITEM } from "./constant"

export const addWeddingHallToCart = payload => ({
    type: ADD_WEDDINGHALL_TO_CART,
    payload
})

export const delWeddingHallCartItem = () => ({
    type: DELETE_WEDDINGHALL_CART_ITEM
})

export const addMenuToCart = payload => ({
    type: ADD_MENU_TO_CART,
    payload
})

export const delMenuCartItem = () => ({
    type: DELETE_MENU_CART_ITEM
})

export const addServiceToCart = payload => ({
    type: ADD_SERVICE_TO_CART,
    payload
})

export const delServiceCartItem = payload => ({
    type: DELETE_SERVICE_CART_ITEM,
    payload
})