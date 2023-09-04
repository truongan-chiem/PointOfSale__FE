import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountSlice from "./Slice/accountSlice";
import productSlice from "./Slice/productSlice";
import modalSlice from "./Slice/modalSlice";
import userSlice from "./Slice/userSlice";
import historySlice from "./Slice/historySlice";
import statisticSlice from "./Slice/statisticSlice";
import toggleBillSlice from "./Slice/toggleBillSlice";
import socketSlice from "./Slice/socketSlice";

const rootReducers = combineReducers({
  products : productSlice,
  modal : modalSlice,
  account : accountSlice,
  history : historySlice,
  statistic : statisticSlice,
  user : userSlice,
  toggleBill : toggleBillSlice,
  socket : socketSlice,
})

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
