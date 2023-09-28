import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchusers = createAsyncThunk(
    'users/fetchusers',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertusers = createAsyncThunk(
   'users/insertusers',
   async (usersData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, 
         {
            method: 'POST', 
            body: JSON.stringify (usersData),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },

         } );
      const data =await res.json();
      return data;
      }catch(error){
      return rejectWithValue(error.message);
   }
   }
 )
  export const deleteusers = createAsyncThunk(
    'users/deleteusers',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`, {
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


         export const getSingleusers = createAsyncThunk(
          'users/getSingleusers',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`,
                {method:"GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    }})
            const data = await res.json()
            return data.data}
            catch(error){
              return rejectWithValue(error.message);
            }
          }
               );
               export const editusers = createAsyncThunk(
                'users/editusers',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nom_users,num_tel, email, adresse} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`, {
                    
                        nom_users,
                        num_tel,
                        email,
                        adresse,
                    
                      });
                    console.log("response edit",response)

                    return response;
                    
                  } catch (error) {
                    console.log("error",error);
                    return rejectWithValue(error.message);
                  }
                }
              );
               


         
  export const usersSlice = createSlice({
    name:'users',
    initialState:{
        data:[],
        getalldata:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchusers.fulfilled]:(state,action)=>{
           state.getalldata =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchusers.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchusers.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertusers.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertusers.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertusers.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteusers.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getalldata =state.getalldata.filter((el)=> el._id !==action.payload)
         },
         [deleteusers.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteusers.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleusers.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleusers.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleusers.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editusers.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editusers.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editusers.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default usersSlice.reducer