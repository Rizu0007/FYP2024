import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: {
      arbBalance: 0,
      ethBalance: 0,
    },
  },
  reducers: {
    storeBalance: (state, action) => {
      if (action.payload.type === "arbitrum") {
        state.balance.arbBalance = action.payload.arbBalance;
      } else if (action.payload.type === "ethereum") {
        state.balance.ethBalance = action.payload.ethBalance;
      } else if (action.payload.type === "both") {
        state.balance.ethBalance = action.payload.ethBalance;
        state.balance.arbBalance = action.payload.arbBalance;
      }
    },
  },
});

export const { storeBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
