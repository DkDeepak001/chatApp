import {createSlice} from '@reduxjs/toolkit';

export const userState = createSlice({
    name:"UserDetails",
    initialState : {value:{ 
        username:"",
        token:""
    }},
    reducers :{updateUsername : (state,action) => {
        state.value = action.payload
    }}

});

export const { updateUsername } = userState.actions;
export default userState.reducer