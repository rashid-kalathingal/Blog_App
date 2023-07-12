import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admin: null,
    token: null
}

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            localStorage.clear()
            state.admin = action.payload.admin
            state.token = action.payload.token
        },
        register(state, action) {
            localStorage.clear()
            state.admin = action.payload.admin
            state.token = action.payload.token
        },
        logout(state) {
            state.admin = null
            state.token = null
            localStorage.clear()
        }
    }
})

export const { register, login, logout } = adminAuthSlice.actions

export default adminAuthSlice.reducer


// variables and function that change the variables, and they are both available in the all components