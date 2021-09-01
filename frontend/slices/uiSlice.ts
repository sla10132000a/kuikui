import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditPost, Shop, Keyword, Selectlogin } from '../types/types'
import { RootState } from '../app/store'

export interface uiState {
  selectedKeyword: Keyword
  selectedShop: Shop
  editedPost: EditPost
  selectlogin: Selectlogin
}
const initialState: uiState = {
  selectedKeyword: {
    keyword: null,
  },
  selectedShop: {
    name: null,
    access: null,
    address: null,
    urls: { pc: null },
    photo: { mobile: { s: "" }, pc: { l: "" } },
    genre: { name: null },
    catch: null,
    id: null,
    station_name: "",
    budget:{name:""},
    close: ""
  },
  editedPost: {
    id: null,
  },
  selectlogin: {
    islogin: false,
  },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {

    setSelectedKeyword: (state, action: PayloadAction<Keyword>) => {
      state.selectedKeyword = action.payload
    },

    setSelectedShop: (state, action: PayloadAction<Shop>) => {
      state.selectedShop = action.payload
    },

    setEditedPost: (state, action: PayloadAction<EditPost>) => {
      state.editedPost = action.payload
    },
    setIsLogin: (state, action: PayloadAction<Selectlogin>) => {
      state.selectlogin = action.payload
    },
  },
})
export const {
  setSelectedKeyword,
  setSelectedShop,
  setEditedPost,
  setIsLogin
} = uiSlice.actions

export const selectKeyword = (state: RootState) => state.ui.selectedKeyword
export const selectPost = (state: RootState) => state.ui.editedPost
export const selectShop = (state: RootState) => state.ui.selectedShop
export const selectlogin = (state: RootState) => state.ui.selectlogin

export default uiSlice.reducer
