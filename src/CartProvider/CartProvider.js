import { useReducer } from "react";
import cartReducer, { InitState } from "../reducers/CartReducer";
import CartContext from "./CartContext";


function CartProvider({ children }){
    const [state, dispatch] = useReducer(cartReducer, InitState)

    return (
        <CartContext.Provider value={[state, dispatch]}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider