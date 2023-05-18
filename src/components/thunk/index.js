import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchedFotos = createAsyncThunk(
  "fotos/fetchFotos",
  async () => {
    const response = await fetch(
      "https://api.unsplash.com/photos/?client_id=z4UC9SyAL8_PdvMWlhcTxbW5pycwUGOtE7qPTClEj9U&per_page=999"
    );
    return await response.json();
  }
);

