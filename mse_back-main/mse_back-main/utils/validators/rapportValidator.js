const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware.js');
const projetModel = require('../../models/projetModel.js')
const userModel = require('../../models/userModel.js')

exports.getrapportValidator = [
  check('id').isMongoId().withMessage('Invalid rapport id format'),
  validatorMiddleware,
];

exports.createrapportValidator = [
  check('Date').notEmpty().withMessage('Date required').isDate().withMessage('Date must be date format'),
  check('Location').notEmpty().withMessage('Location required').isString().withMessage('Location must be String'),
  check('Engine').notEmpty().withMessage('Engine required').isString().withMessage('Engine must be String'),
  check('Status').notEmpty().withMessage('Status required').isString().withMessage('Status must be String'),
  check('Last_PM_Hours').notEmpty().withMessage('Last_PM_Hours required').isNumeric().withMessage('Last_PM_Hours required'),
  check('Running_Hours').notEmpty().withMessage('Running_Hours required').isNumeric().withMessage('Running_Hours required'),
  check('Electric_Power_P').notEmpty().withMessage('Electric_Power_P required').isNumeric().withMessage('Electric_Power_P must be number'),
  check('Apparent_Power_S').notEmpty().withMessage('Apparent_Power_S required').isString().withMessage('Apparent_Power_S required'),
  check('Oil_System_Check').notEmpty().withMessage('Oil_System_Check required').isString().withMessage('Oil_System_Check required'),
  check('Oil_Level').notEmpty().withMessage('Oil_Level required').isString().withMessage('Oil_Level must be String'),
  check('Oil_Pressure').notEmpty().withMessage('Oil_Pressure required').isString().withMessage('Oil_Pressure must be String'),
  check('Oil_Temperature').notEmpty().withMessage('Oil_Temperature required').isString().withMessage('Oil_Temperature must be String'),
  check('Cooling_Water_System_Check').notEmpty().withMessage('Cooling_Water_System_Check required').isString().withMessage('Cooling_Water_System_Check must be String'),
  check('Cooling_Water_Temperature').notEmpty().withMessage('Cooling_Water_Temperature required').isString().withMessage('Cooling_Water_Temperature required'),
  check('Radiator_Water_Level').notEmpty().withMessage('Radiator_Water_Level required').isString().withMessage('Radiator_Water_Level required'),
  check('Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases').notEmpty().withMessage('Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases required').isString().withMessage('Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases must be String'),
  check('Fuel_Water_Separator_Check').notEmpty().withMessage('Fuel_Water_Separator_Check required').isString().withMessage('Fuel_Water_Separator_Check required'),
  check('Fuel_Day_Tank_Fuel_Level').notEmpty().withMessage('Fuel_Day_Tank_Fuel_Level required').isString().withMessage('Fuel_Day_Tank_Fuel_Level required'),
  check('Air_Cleaner_Filter_Condition').notEmpty().withMessage('Air_Cleaner_Filter_Condition required').isString().withMessage('Air_Cleaner_Filter_Condition must be String'),
  check('Turbocharger_Check').notEmpty().withMessage('Turbocharger_Check required').isString().withMessage('Turbocharger_Check required'),
  check('Inspect_Battery_Cables_and_Battery_Connections').notEmpty().withMessage('Inspect_Battery_Cables_and_Battery_Connections required').isString().withMessage('Inspect_Battery_Cables_and_Battery_Connections required'),

  check('Starter_Motors').notEmpty().withMessage('Starter_Motors required').isString().withMessage('Starter_Motors must be String'),
  check('Alternator_Pulleys_Belts_Tensioner').notEmpty().withMessage('Alternator_Pulleys_Belts_Tensioner required').isString().withMessage('Alternator_Pulleys_Belts_Tensioner required'),
  check('Meters_Gauges').notEmpty().withMessage('Meters_Gauges required').isString().withMessage('Meters_Gauges required'),
  check('Control_Panel').notEmpty().withMessage('Control_Panel required').isString().withMessage('Control_Panel must be String'),
  check('Electrical_Connections').notEmpty().withMessage('Electrical_Connections required').isString().withMessage('Electrical_Connections required'),
  check('Indication_Lamps_Function_Check').notEmpty().withMessage('Indication_Lamps_Function_Check required').isString().withMessage('Indication_Lamps_Function_Check required'),

  check('Selector_Switches_Meters_Function_Check').notEmpty().withMessage('Selector_Switches_Meters_Function_Check required').isString().withMessage('Selector_Switches_Meters_Function_Check must be String'),
  check('Body_Earthing_of_Alternator_and_Panel_Check').notEmpty().withMessage('Body_Earthing_of_Alternator_and_Panel_Check required').isString().withMessage('Body_Earthing_of_Alternator_and_Panel_Check required'),
  check('Anti_vibration_mounting_is_effective').notEmpty().withMessage('Anti_vibration_mounting_is_effective required').isString().withMessage('Anti_vibration_mounting_is_effective required'),
  check('Engine_Exhaust_System_Installation_and_Condition').notEmpty().withMessage('Engine_Exhaust_System_Installation_and_Condition required').isString().withMessage('Engine_Exhaust_System_Installation_and_Condition must be String'),
  check('Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler').notEmpty().withMessage('Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler required').isString().withMessage('Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler required'),
  check('Failures_and_Observations').notEmpty().withMessage('Failures_and_Observations required').isString().withMessage('Failures_and_Observations required'),
  check('Intervention').notEmpty().withMessage('Intervention required').isString().withMessage('Intervention required'),



  validatorMiddleware,
];

exports.updaterapportValidator = [
  check('id').isMongoId().withMessage('Invalid rapport id format'),
  validatorMiddleware,
];

exports.deleterapportValidator = [
  check('id').isMongoId().withMessage('Invalid rapport id format'),
  validatorMiddleware,
];
