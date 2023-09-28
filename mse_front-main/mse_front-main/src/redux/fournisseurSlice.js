import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchfournisseur = createAsyncThunk(
    'fournisseur/fetchfournisseur',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/fournisseur`)
          const data = await res.json()
      
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertfournisseur = createAsyncThunk(
   'fournisseur/insertfournisseur',
   async (fournisseurData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/fournisseur`, 
         {
            method: 'POST', 
            body: JSON.stringify (fournisseurData),
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
  export const deletefournisseur = createAsyncThunk(
    'fournisseur/deletefournisseur',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/fournisseur/${id}`, {
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


         export const getSinglefournisseur = createAsyncThunk(
          'fournisseur/getSinglefournisseur',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/fournisseur/${id}`,
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



               export const editfournisseur = createAsyncThunk(
                'fournisseur/editfournisseur',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nom_fournisseur,num_tel, email, adresse} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/fournisseur/${id}`, {
                    
                        nom_fournisseur,
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
               


         
  export const fournisseurSlice = createSlice({
    name:'fournisseur',
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
        [fetchfournisseur.fulfilled]:(state,action)=>{
           state.getalldata =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchfournisseur.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchfournisseur.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertfournisseur.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertfournisseur.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertfournisseur.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deletefournisseur.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getalldata =state.getalldata.filter((el)=> el._id !==action.payload)
         },
         [deletefournisseur.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deletefournisseur.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSinglefournisseur.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSinglefournisseur.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSinglefournisseur.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editfournisseur.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editfournisseur.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editfournisseur.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default fournisseurSlice.reducer