import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootreducer";
import userReducer from "./employee.feature";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
