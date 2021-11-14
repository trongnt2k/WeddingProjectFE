import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

const mainReducer = combineReducers({
    'user': UserReducer
})

export default mainReducer