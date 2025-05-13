// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import App from "./App";
import "./index.css"; // Make sure this path is correct!

// Redux slice
const codeSlice = createSlice({
  name: "code",
  initialState: { value: "// Start coding..." },
  reducers: {
    updateCode: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateCode } = codeSlice.actions;

const store = configureStore({
  reducer: { code: codeSlice.reducer },
});

// Render app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);