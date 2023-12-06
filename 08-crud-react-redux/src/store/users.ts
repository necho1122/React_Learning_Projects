import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: string;
    name: string;
    email: string;
    github: string;
}

export type userId = string;

export interface UserWithId extends User {
    id: userId;
}

const DEFAULT_STATE = [
    {
		id: "1",
		name: "John Doe",
		email: "sampaio@gmail.com",
		github: "john.doe",
	},
	{
		id: "2",
		name: "Jane Doe",
		email: "car2@gmail.com",
		github: "jane.doe",
	},
    {
        id: "3",
        name: "Mary Doe",
        email: "mary256@yahoo.com",
        github: "mary.doe",
    },
];

const initialState: UserWithId[] = (()=>{
    const persistedState = localStorage.getItem("reduxState");
    if (persistedState) {
        return JSON.parse(persistedState).users;
    }
    return DEFAULT_STATE;
})()

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = DEFAULT_STATE.length + 1;
            return [...state, { ...action.payload, id }]
        },
        deleteUser: (state, action: PayloadAction<userId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        }
    }
});

export default usersSlice.reducer;

export const { addNewUser, deleteUser } = usersSlice.actions;