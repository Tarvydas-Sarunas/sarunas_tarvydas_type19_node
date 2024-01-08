const Joi = require('joi');

function formatErrorArr(errorsObj) {
  return errorsObj.details.map((eObj) => ({
    field: eObj.path[0],
    error: eObj.message,
  }));
}

// Joi user register isiunitimo lauku tikrinimui
async function checkAddUserRegister(req, res, next) {
  // aprasom koks bus musu objektas
  const userRegisterSchema = Joi.object({
    user_name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).required(),
    role_id: Joi.string().required(),
  });
  // testuojam ar atitinka objektas musu schema
  try {
    const validationResult = await userRegisterSchema.validateAsync(req.body, {
      // abortEarly reikia kad rodytu visas klaidas ne tik pirma klaida
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log('error check body ===', error);
    // parasyti funkcija errorDetails(error)
    res.errors = formatErrorArr(error);
    // next();
    res.status(400).json(res.errors);
  }
}

// Joi user login isiunitimo lauku tikrinimui
async function checkUserLogin(req, res, next) {
  // aprasom koks bus musu objektas
  const userLoginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).required(),
  });
  // testuojam ar atitinka objektas musu schema
  try {
    const validationResult = await userLoginSchema.validateAsync(req.body, {
      // abortEarly reikia kad rodytu visas klaidas ne tik pirma klaida
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log('error check body ===', error);
    // parasyti funkcija errorDetails(error)
    res.errors = formatErrorArr(error);
    // next();
    res.status(400).json(res.errors);
  }
}

// Joi naujo order isiunitimo lauku tikrinimui
async function checkOrder(req, res, next) {
  // aprasom koks bus musu objektas
  const orderSchema = Joi.object({
    user_id: Joi.number().positive().integer().required(),
    shop_item_id: Joi.number().positive().integer().required(),
    quantity: Joi.number().positive().integer().required(),
    total_price: Joi.number().positive().integer().required(),
    status: Joi.string().min(3).required(),
  });
  // testuojam ar atitinka objektas musu schema
  try {
    const validationResult = await orderSchema.validateAsync(req.body, {
      // abortEarly reikia kad rodytu visas klaidas ne tik pirma klaida
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log('error check body ===', error);
    // parasyti funkcija errorDetails(error)
    res.errors = formatErrorArr(error);
    // next();
    res.status(400).json(res.errors);
  }
}

// Joi naujo shop item sukurimo isiunitimo lauku tikrinimui
async function checkNewShopItem(req, res, next) {
  // aprasom koks bus musu objektas
  const newShopSchema = Joi.object({
    shop_item_name: Joi.string().min(3).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().min(3).required(),
    image: Joi.string().min(3).required(),
    item_type_id: Joi.string().required(),
  });
  // testuojam ar atitinka objektas musu schema
  try {
    const validationResult = await newShopSchema.validateAsync(req.body, {
      // abortEarly reikia kad rodytu visas klaidas ne tik pirma klaida
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log('error check body ===', error);
    // parasyti funkcija errorDetails(error)
    res.errors = formatErrorArr(error);
    // next();
    res.status(400).json(res.errors);
  }
}

module.exports = {
  checkAddUserRegister,
  checkUserLogin,
  checkOrder,
  checkNewShopItem,
};
