const mongoose = require('mongoose');

const rapportSchema = new mongoose.Schema(
  {
              Date: String ,
              Technician_on_duty :   {
                type: mongoose.Schema.ObjectId,
                ref: 'user',
                required: [true, 'rapport must be belong to user'],
              },
              createdBy: String, 
              Location: String ,
              Engine : String ,
              Status : String ,
              Last_PM_Hours : String ,
              Running_Hours : String ,
              Electric_Power_P : Number ,
              Apparent_Power_S : String ,
              Oil_System_Check : String ,
              Oil_Level : String ,
              Oil_Pressure : String ,
              Oil_Temperature : String ,
              Cooling_Water_System_Check : String ,
              Cooling_Water_Temperature : String ,
              Radiator_Water_Level : String ,
              Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases : String ,
              Fuel_Water_Separator_Check : String ,
              Fuel_Day_Tank_Fuel_Level : String ,
              Air_Cleaner_Filter_Condition: String ,
              Turbocharger_Check : String ,
              Inspect_Battery_Cables_and_Battery_Connections : String ,
              Starter_Motors : String ,
              Alternator_Pulleys_Belts_Tensioner : String ,
              Meters_Gauges : String ,
              Control_Panel : String ,
              Electrical_Connections : String ,
              Indication_Lamps_Function_Check : String ,
              Selector_Switches_Meters_Function_Check : String ,
              Body_Earthing_of_Alternator_and_Panel_Check : String ,
              Anti_vibration_mounting_is_effective : String ,
              Engine_Exhaust_System_Installation_and_Condition : String ,
              Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler: String ,
              Failures_and_Observations : String ,
              Intervention : String,
              id_tache :  {
                type: mongoose.Schema.ObjectId,
                ref: 'tache',
                required: [true, 'rapport must be belong to tache'],
              },
  },
  {
    timestamps: true,

  }
);


const Raport=mongoose.model('rapport',rapportSchema);
module.exports=Raport;