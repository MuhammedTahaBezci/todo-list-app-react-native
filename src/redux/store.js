import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./UserSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  // 'reducer' anahtarı, tüm reducer'ları bir araya getirmek için kullanılır.
  // Burada 'user' adında bir slice tanımlıyoruz ve bu slice'ın reducer'ı olarak
  // daha önce içe aktardığımız 'userReducer'ı atıyoruz.
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})