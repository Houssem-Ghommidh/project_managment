import {configureStore} from '@reduxjs/toolkit'

import fournisseurSlice from './fournisseurSlice'
import produitSlice from './produitSlice'
import userSlice from './userSlice'
import projetSlice from './projetSlice'
import rapportSlice from './rapportSlice'

export const store = configureStore({
    reducer:{
        fournisseur:fournisseurSlice,
        produit:produitSlice,
        users:userSlice,
        projet:projetSlice,
        rapport:rapportSlice,

        
    },
})