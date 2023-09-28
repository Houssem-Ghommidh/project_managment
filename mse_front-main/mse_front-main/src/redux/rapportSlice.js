import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchrapport = createAsyncThunk(
    'rapport/fetchrapport',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/rapport`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertrapport = createAsyncThunk(
   'rapport/insertrapport',
   async (rapportData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/rapport`, 
         {
            method: 'POST', 
            body: JSON.stringify (rapportData),
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
  export const deleterapport = createAsyncThunk(
    'rapport/deleterapport',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/rapport/${id}`, {
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


         export const getSinglerapport = createAsyncThunk(
          'rapport/getSinglerapport',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/rapport/${id}`,
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



               export const editrapport = createAsyncThunk(
                'rapport/editrapport',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nom_rapport,num_tel, email, adresse} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/rapport/${id}`, {
                    
                        nom_rapport,
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
               


         
  export const rapportSlice = createSlice({
    name:'rapport',
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
        [fetchrapport.fulfilled]:(state,action)=>{
           state.getalldata =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchrapport.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchrapport.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertrapport.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertrapport.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertrapport.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleterapport.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getalldata =state.getalldata.filter((el)=> el._id !==action.payload)
         },
         [deleterapport.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleterapport.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSinglerapport.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSinglerapport.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSinglerapport.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editrapport.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editrapport.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editrapport.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default rapportSlice.reducer