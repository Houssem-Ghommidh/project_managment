const express = require('express');
const morgan = require('morgan');
const dotenv=require('dotenv');
const cors = require('cors');

const config_data=require('./config/config_db');
dotenv.config({path:'config.env'})
const globalError=require('./middlewares/errorMiddleware')
const ApiError=require('./utils/apiError')
const userRoutes=require('./routes/userRoutes')
const authRoutes=require('./routes/authRoues')
const fournisseurRoutes=require('./routes/fournisseurRoutes')
const produitRoutes=require('./routes/produitRoutes')
const projetRoutes=require('./routes/projetRoutes')
const tacheRoutes=require('./routes/tacheRoutes')
const rapportRoutes=require('./routes/rapportRoutes')
const demandedachatRoutes=require('./routes/demandedachat')
const affecterProduitRoutes=require('./routes/affecterProduitRoutes')
const pointageRoute=require('./routes/pointageRoute')
const dashboardRoute=require('./routes/dashboardRoute')





const app=express()
app.use(cors());
app.options('*', cors());

app.use(express.json());

//connection database
config_data()




  
//middlewares
if(process.env.NODE_ENV === 'dev')
{
    app.use(morgan('dev'));
    console.log(`mode:${process.env.NODE_ENV}`);
}


//route
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/fournisseur',fournisseurRoutes);
app.use('/api/produit',produitRoutes);
app.use('/api/projet',projetRoutes);
app.use('/api/tache',tacheRoutes);
app.use('/api/rapport',rapportRoutes);
app.use('/api/demandedachat',demandedachatRoutes);
app.use('/api/pointage',pointageRoute);
app.use('/api/affecterproduit',affecterProduitRoutes);
app.use('/api/dashboard',dashboardRoute);
app.use('/api/produitsImages', express.static('./uploads/produit'))
app.use('/api/userImages', express.static('./uploads/users'))
app.use('/api/tacheImages', express.static('./uploads/taches'))
app.get('/',(req,res) => {res.send('route API')});
//static Images Folder

//static Images Folder


app.all("*",(req,res,next)=>{
    //create error and send it to error handling middleware
    // const error=new Error(`can't find this route : ${req.originalUrl}`);
    // next(error.message);
     next(new ApiError(`can't find this route : ${req.originalUrl}`,400));
})




// Global error handling middleware for express
app.use(globalError);
const PORT=process.env.PORT || 8000;
app.listen(PORT,"0.0.0.0", () => {
    console.log("server started on port : " +PORT);
  });

// error handling Rejection outside express
process.on("unhandledRejection",(err=>{
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    app.close(()=>{
       console.log('shutting down....')
       process.exit(1);})
  
}));