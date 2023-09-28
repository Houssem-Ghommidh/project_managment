import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchprojet = createAsyncThunk(
    'projet/fetchprojet',
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projet`)
            const data = await res.json()
            console.log(data)
            return data.data
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const insertprojet = createAsyncThunk(
    'projet/insertprojet',
    async (projetData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projet`,
                {
                    method: 'POST',
                    body: JSON.stringify(projetData),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },

                });
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const deleteprojet = createAsyncThunk(
    'projet/deleteprojet',
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/api/projet/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const getSingleprojet = createAsyncThunk(
    'projet/getSingleprojet',
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projet/${id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
            const data = await res.json()
            return data.data
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export const editprojet = createAsyncThunk(
    'projet/editprojet',
    async (todo, { rejectWithValue }) => {
        try {
            const { id, nom_projet, num_tel, email, adresse } = todo;

            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/projet/${id}`, {

                nom_projet,
                num_tel,
                email,
                adresse,

            });
            console.log("response edit", response)

            return response;

        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.message);
        }
    }
);




export const projetSlice = createSlice({
    name: 'projet',
    initialState: {
        data: [],
        getalldata: [],
        status: null,
        error: null,
    },
    reducers: {

    },
    extraReducers: {
        // show hotels
        [fetchprojet.fulfilled]: (state, action) => {
            state.getalldata = action.payload;
            state.status = "success";
            state.error = null;
        },
        [fetchprojet.pending]: (state) => {
            state.status = "loading";
            state.error = null;

        },
        [fetchprojet.rejected]: (state, action) => {

            state.status = "failed";
            state.error = action.payload;
        },
        // insert books
        [insertprojet.fulfilled]: (state, action) => {
            state.data.push(action.payload);
            state.status = "success";
            state.error = null;
        },
        [insertprojet.pending]: (state) => {
            state.status = "loading";
            state.error = null;

        },
        [insertprojet.rejected]: (state, action) => {

            state.status = "failed";
            state.error = action.payload;
        },
        // delete hotel
        [deleteprojet.fulfilled]: (state, action) => {
            state.status = "success";
            state.error = null;
            state.getalldata = state.getalldata.filter((el) => el._id !== action.payload)
        },
        [deleteprojet.pending]: (state) => {
            state.status = "loading";
            state.error = null;

        },
        [deleteprojet.rejected]: (state, action) => {

            state.status = "failed";
            state.error = action.payload;
        },
        //single hotel
        [getSingleprojet.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = "success";
            state.error = null;
        },
        [getSingleprojet.pending]: (state) => {
            state.status = "loading";
            state.error = null;

        },
        [getSingleprojet.rejected]: (state, action) => {

            state.status = "failed";
            state.error = action.payload;
        },
        //edit hotel

        [editprojet.fulfilled]: (state, action) => {

            return {
                ...state,
                data: action.payload,

            };
        },
        [editprojet.pending]: (state, action) => {
            return {
                ...state,
                status: "loading"
            };
        },
        [editprojet.rejected]: (state, action) => {
            return {
                ...state,
                status: "rejected",
                error: action.payload
            };
        },


    }
})

export default projetSlice.reducer