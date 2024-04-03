import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const createUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
};

const loginUserSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const restaurantSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    phone: { type: "string" },
    location: { type: "string" },
    description: { type: "string" },
    hyg_rating: { type: "number" },
  },
  required: ["name", "phone", "location", "description", "hyg_rating"],
};

const createRatingSchema = {
  type: "object",
  properties: {
    score: { type: "integer" },
    comment: { type: "string" },
  },
  required: ["score", "comment"],
  additionalProperties: false,
};

const updateRatingSchema = {
  type: "object",
  properties: {
    score: { type: "integer" },
    comment: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};

const placeOrderSchema = {
  type: "object",
  properties: {
    customer_name: { type: "string" },
    customer_phone: { type: "string" },
    location: { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          menu_id: { type: "integer" },
          quantity: { type: "integer" },
        },
        required: ["menu_id", "quantity"],
        additionalProperties: false,
      },
    },
    total_price: { type: "number" },
  },
  required: [
    "customer_name",
    "customer_phone",
    "location",
    "items",
    "total_price",
  ],
  additionalProperties: false,
};

const updateOrderStatusSchema = {
  type: "object",
  properties: {
    status: { type: "string" },
  },
  required: ["status"],
  additionalProperties: false,
};

const createMenuSchema = {
  type: "object",
  properties: {
    rating: { type: "number" },
    comment: { type: "string" },
    timestamp: { type: "string", format: "date-time" },
  },
  required: ["rating", "comment", "timestamp"],
  additionalProperties: false,
};

const updateMenuSchema = {
  type: "object",
  properties: {
    rating: { type: "number" },
    comment: { type: "string" },
    timestamp: { type: "string", format: "date-time" },
  },
  additionalProperties: false,
};

const createDishSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
  },
  required: ["name", "description", "price"],
  additionalProperties: false,
};

const updateDishSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
  },
  additionalProperties: false,
};

const createCategorySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};

const validateCreateCategory = ajv.compile(createCategorySchema);
const validateCreateDish = ajv.compile(createDishSchema);
const validateUpdateDish = ajv.compile(updateDishSchema);
const validateCreateMenu = ajv.compile(createMenuSchema);
const validateUpdateMenu = ajv.compile(updateMenuSchema);
const validatePlaceOrder = ajv.compile(placeOrderSchema);
const validateUpdateOrderStatus = ajv.compile(updateOrderStatusSchema);
const validateCreateRating = ajv.compile(createRatingSchema);
const validateUpdateRating = ajv.compile(updateRatingSchema);
const validateRestaurant = ajv.compile(restaurantSchema);
const validateCreateUser = ajv.compile(createUserSchema);
const validateLoginUser = ajv.compile(loginUserSchema);

export {
  validateCreateUser,
  validateLoginUser,
  validateRestaurant,
  validateCreateRating,
  validateUpdateRating,
  validatePlaceOrder,
  validateUpdateOrderStatus,
  validateCreateMenu,
  validateUpdateMenu,
  validateCreateDish,
  validateUpdateDish,
  validateCreateCategory,
};
