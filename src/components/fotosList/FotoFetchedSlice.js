import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useHttp } from "../../hooks/http.hook";
import { createSelector } from "@reduxjs/toolkit";


const initialState = {
      fotos: [],
      fotosLoadingStatus: 'idle',
      modalOpen: false,
      fullSizePhotoUrl: null,
      setOption: "all",
      displayedFotos: 3,
      selectAllFotos: false,
      infoFoto: [],
      modalInfoFoto: false
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
        },
        optionSelect(state, action){
            state.setOption = action.payload;
        },
        setDisplayedFotos(state,action){
            state.displayedFotos = action.payload
        },
        setSelectAllFotos(state){
            state.selectAllFotos = !state.selectAllFotos
        },
        setInfoFoto(state,action){
            state.modalInfoFoto = action.payload;
            state.infoFoto = action.payload
           
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
export const setOption = createSelector(
    state => state.setOption,
    setOption => setOption
)
export const displayedFoto = createSelector(
    state => state.displayedFotos,
    displayedFotos => displayedFotos
)
export const selectAllFotos = createSelector(
    state => state.selectAllFotos,
    selectAllFotos => selectAllFotos
)
export const infoFoto = createSelector(
    state => state.infoFoto,
    infoFoto => infoFoto
)
const {actions, reducer} = fotosSlice;
export const {
    openWidthFull,
    closeFull,
    optionSelect,
    setDisplayedFotos,
    setSelectAllFotos,
    setInfoFoto
} = actions
export default reducer;


