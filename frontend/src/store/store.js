// 📁 frontend/src/store/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

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

export default store;