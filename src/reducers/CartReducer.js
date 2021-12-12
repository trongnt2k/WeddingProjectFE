import _ from 'lodash';
import { ADD_WEDDINGHALL_TO_CART, ADD_MENU_TO_CART, DELETE_MENU_CART_ITEM, DELETE_WEDDINGHALL_CART_ITEM, ADD_SERVICE_TO_CART, DELETE_SERVICE_CART_ITEM } from "./constant"

const InitState = {
    count: JSON.parse(localStorage.getItem("count")) || 0,
    weddingHall: JSON.parse(localStorage.getItem("weddinghall")) || {},
    menu: JSON.parse(localStorage.getItem("menu")) || {},
    services: JSON.parse(localStorage.getItem("services")) || []
}

const cartReducer = (state, action) => {
    let count = state.count
    switch(action.type){
        case ADD_WEDDINGHALL_TO_CART: 
            if(_.isEmpty(state.weddingHall))   
                count = state.count+1
            localStorage.setItem("count", count)
            localStorage.setItem("weddinghall", JSON.stringify(action.payload))
            return{
                ...state,
                count: count,
                weddingHall: action.payload
            }
        case DELETE_WEDDINGHALL_CART_ITEM:
            localStorage.removeItem("weddinghall")
            localStorage.setItem("count", state.count-1)
            return{
                ...state,
                count: state.count-1,
                weddingHall: {}
            }
        case ADD_MENU_TO_CART: 
            if(_.isEmpty(state.menu))   
                count = state.count+1
            localStorage.setItem("count", count)
            localStorage.setItem("menu", JSON.stringify(action.payload))
            return{
                ...state,
                count: count,
                menu: action.payload
            }
        case DELETE_MENU_CART_ITEM:
            localStorage.removeItem("menu")
            localStorage.setItem("count", state.count-1)
            return{
                ...state,
                count: state.count-1,
                menu: {}
            }
        case ADD_SERVICE_TO_CART:
            count = state.count+1   
            localStorage.setItem("count", count)
            localStorage.setItem("services", JSON.stringify([...state.services, action.payload]))
            return{
                ...state,
                count: count,
                services: [...state.services, action.payload]
            }
        case DELETE_SERVICE_CART_ITEM:
            let newServices = state.services.filter(service => service.service_id !== action.payload)
            localStorage.setItem("count", state.count-1)
            localStorage.setItem("services", JSON.stringify(newServices))
            return{
                ...state,
                count : state.count-1,
                services: newServices
            }
        default:
            throw new Error("Invalid action")
    }
}

export default cartReducer
export {InitState}