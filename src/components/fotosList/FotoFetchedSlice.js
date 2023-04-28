import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useHttp } from "../../hooks/http.hook";
import { createSelector } from "@reduxjs/toolkit";


const initialState = {
      fotos: [],
      fotosLoadingStatus: 'idle',
      modalOpen: false,
      fullSizePhotoUrl: null,
}

export const fetchFotos = createAsyncThunk(
    "fotos/fetchFotos",
    async () => {
      const response = await fetch(
        "https://api.unsplash.com/photos/?client_id=z4UC9SyAL8_PdvMWlhcTxbW5pycwUGOtE7qPTClEj9U&per_page=999"
      );
      return await response.json();
    }
);

const fotosSlice = createSlice({
    name: 'fotos',
    initialState,
    reducers: {
        openWidthFull(state, action){
            state.modalOpen = true
            state.fullSizePhotoUrl = action.payload 
        },
        closeFull(state) {
            state.modalOpen = false;
            state.fullSizePhotoUrl = null; 
          }
    },

    extraReducers: (builder) => {
           builder
              .addCase(fetchFotos.pending, state => {state.fotosLoadingStatus = 'loading'})
              .addCase(fetchFotos.fulfilled, (state, action) => {
                state.fotosLoadingStatus = 'idle';
                state.fotos = action.payload;
                })
              .addCase(fetchFotos.rejected, state => {
                    state.fotosLoadingStatus = 'error';
                })
              .addDefaultCase(() => {})
    }
})
export const selectFotos = createSelector(
    state => state.fotos,
    fotos => fotos
);
export const selectFotosLoadingStatus = createSelector(
    (state) => state.fotosLoadingStatus,
    (fotosLoadingStatus) => fotosLoadingStatus
  );

const {actions, reducer} = fotosSlice;
export const {
    openWidthFull,
    closeFull
} = actions
export default reducer;


