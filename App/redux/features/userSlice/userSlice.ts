import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  user: {
    ID: string;
    user_login: string;
    user_nicename: string;
    user_email: string;
    user_url: string;
    user_registered: string;
    user_activation_key: string;
    user_status: string;
    display_name: string;
  }; //   roles: string[];
}

const initialState: DataState = {
  user: {
    ID: "",
    user_login: "",
    user_nicename: "",
    user_email: "",
    user_url: "",
    user_registered: "",
    user_activation_key: "",
    user_status: "",
    display_name: "",
  },
  //   roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<DataState>) => {
      state.user = action.payload.user;
      //   state.ID = action.payload.ID;
      //   state.user_login = action.payload.user_login;
      //   state.user_nicename = action.payload.user_nicename;
      //   state.user_email = action.payload.user_email;
      //   state.user_url = action.payload.user_url;
      //   state.user_registered = action.payload.user_registered;
      //   state.user_activation_key = action.payload.user_activation_key;
      //   state.user_status = action.payload.user_status;
      //   state.display_name = action.payload.display_name;
      //   state.roles = action.payload.roles;
    },
    clearUser: (state) => {
      state.user = {
        ID: "",
        user_login: "",
        user_nicename: "",
        user_email: "",
        user_url: "",
        user_registered: "",
        user_activation_key: "",
        user_status: "",
        display_name: "",
      };
      //   state.ID = "";
      //   state.user_login = "";
      //   state.user_nicename = "";
      //   state.user_email = "";
      //   state.user_url = "";
      //   state.user_registered = "";
      //   state.user_activation_key = "";
      //   state.user_status = "";
      //   state.display_name = "";
      //   state.roles = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
