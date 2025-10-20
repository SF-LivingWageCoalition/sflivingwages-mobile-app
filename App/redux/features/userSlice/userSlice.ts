import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  user?: {
    ID: string;
    user_login: string;
    user_nicename: string;
    user_email: string;
    user_url: string;
    user_registered: string;
    user_activation_key: string;
    user_status: string;
    display_name: string;
  };
  roles?: string[];
  jwt?: [
    {
      token: string;
      header: {
        alg: string;
        typ: string;
      };
      payload: {
        email?: string;
        exp?: number;
        iat?: number;
        id?: string;
        iss?: string;
        site?: string;
        username?: string;
      };
    }
  ];
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
  roles: [],
  jwt: [
    {
      token: "",
      header: {
        alg: "",
        typ: "",
      },
      payload: {},
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<DataState>) => {
      state.user = action.payload.user;
      state.roles = action.payload.roles;
      state.jwt = action.payload.jwt;
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
      state.roles = [];
      state.jwt = [
        {
          token: "",
          header: {
            alg: "",
            typ: "",
          },
          payload: {},
        },
      ];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
