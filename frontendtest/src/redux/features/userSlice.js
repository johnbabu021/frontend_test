import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  edit:false,
  editdata:'',
  create:false
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },
    edit:(state,action)=>{
        state.edit=action.payload
    },
    editData:(state,action)=>{
        state.editdata=action.payload
    },
    create:(state,action)=>{
      state.create=action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { login,edit,editData,create } = counterSlice.actions;

export const userData = (state) => state.user;
export default counterSlice.reducer;
