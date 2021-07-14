import { combineReducers,createStore } from "redux";

const allReducers = combineReducers({
//   logged: LoginReducer,
});

export const store = createStore(allReducers);
