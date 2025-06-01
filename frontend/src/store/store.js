// 📁 frontend/src/store/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        code: "// Start coding...",
        task: "bug",
    },
    reducers: {
        // Authentication & global state
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },

        // Code editor state
        setCode: (state, action) => {
            state.code = action.payload;
        },
        setTask: (state, action) => {
            state.task = action.payload;
        },
    },
});

const store = configureStore({
    reducer: {
        app: appSlice.reducer,
    },
});

export const { setUser, setLoading, setError, setCode, setTask } = appSlice.actions;
export default store;