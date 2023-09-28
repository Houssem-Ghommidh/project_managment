import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchproduit = createAsyncThunk(
    'produit/fetchproduit',
    async (_,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/produit`)
      const data = await res.json()
      console.log(data)
      return data.data}
      catch(error){
        return rejectWithValue(error.message);
      }
    }
  )
  export const insertproduit = createAsyncThunk(
   'produit/insertproduit',
   async (produitData,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;

       try{
         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/produit`, 
         {
            method: 'POST', 
            body: JSON.stringify (produitData),
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
  export const deleteproduit = createAsyncThunk(
    'produit/deleteproduit',
    async (id,thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
        try{
   await fetch(`${process.env.REACT_APP_BASE_URL}/api/produit/${id}`, {
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


         export const getSingleproduit = createAsyncThunk(
          'produit/getSingleproduit',
          async (id,thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
              try{
                const res =await fetch(`${process.env.REACT_APP_BASE_URL}/api/produit/${id}`,
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



               export const editproduit = createAsyncThunk(
                'produit/editproduit',
                async (todo, { rejectWithValue }) => {
                  try {
                    const { id, nom_produit,num_tel, email, adresse} = todo;
              
                    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/produit/${id}`, {
                    
                        nom_produit,
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
               


         
  export const produitSlice = createSlice({
    name:'produit',
    initialState:{
        data:[],
        produit:[],
        getalldata:[],
        status:null,
        error:null,
    },
    reducers:{
        
    },
    extraReducers:{
        // show hotels
        [fetchproduit.fulfilled]:(state,action)=>{
           state.getalldata =action.payload;
           state.status ="success";
       state.error =null;
        },
        [fetchproduit.pending]:(state)=>{
           state.status ="loading";
           state.error =null;

        },
        [fetchproduit.rejected]:(state,action)=>{
       
           state.status ="failed";
           state.error=action.payload;
         },
         // insert books
         [insertproduit.fulfilled]:(state,action)=>{
            state.data.push(action.payload);
            state.status ="success";
        state.error =null;
         },
         [insertproduit.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [insertproduit.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          // delete hotel
          [deleteproduit.fulfilled]:(state,action)=>{
            state.status ="success";
        state.error =null;
        state.getalldata =state.getalldata.filter((el)=> el._id !==action.payload)
         },
         [deleteproduit.pending]:(state)=>{
            state.status ="loading";
            state.error =null;

         },
         [deleteproduit.rejected]:(state,action)=>{
        
            state.status ="failed";
            state.error=action.payload;
          },
          //single hotel
          [getSingleproduit.fulfilled]:(state,action)=>{
            state.data = action.payload;
            state.produit = action.payload;
            state.status ="success";
        state.error =null;
         },
         [getSingleproduit.pending]:(state)=>{
          state.status ="loading";
          state.error =null;

         },
         [getSingleproduit.rejected]:(state,action)=>{
        
          state.status ="failed";
          state.error=action.payload;
          },
          //edit hotel
          
          [editproduit.fulfilled]: (state, action) => {
           
            return {
              ...state,
              data: action.payload,
             
            };
          },
          [editproduit.pending]: (state, action) => {
            return {
              ...state,
              status:"loading"
            };
          },
          [editproduit.rejected]: (state, action) => {
            return {
              ...state,
              status:"rejected",
              error:action.payload
            };
          },
          
       
    }
})

export default produitSlice.reducer