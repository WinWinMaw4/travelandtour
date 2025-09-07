import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TabState {
  [key: string]: string; // key = page/component name, value = activeTab
}

const initialState: TabState = {};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<{ key: string; tab: string }>) {
      const { key, tab } = action.payload;
      state[key] = tab;
    },
    removeTab: () => initialState,
  },
});

export const { setActiveTab, removeTab } = tabSlice.actions;
export default tabSlice.reducer;
