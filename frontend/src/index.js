// store/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import App from "./App";
import reportWebVitals from './reportWebVitals';

// 1️⃣ Slice definition
const codeSlice = createSlice({
    name: "code",
    initialState: { value: "// Start coding..." },
    reducers: {
        updateCode: (state, action) => {
            state.value = action.payload;
        },
    },
});

// 2️⃣ Export the action
export const { updateCode } = codeSlice.actions;

// 3️⃣ Configure store
const store = configureStore({
    reducer: { code: codeSlice.reducer },
});

// 4️⃣ Bootstrap React app with Provider
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
