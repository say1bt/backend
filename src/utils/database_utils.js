import { Sequelize, DataTypes } from "sequelize";
import {
  RESTAURANT,
  MENU,
  ORDER,
  ORDER_ITEM,
  USER,
  AUTH,
  CATEGORY,
  DISH,
  RATING,
} from "../constants/model_constants.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "127.0.0.1",
    dialect: "mysql",
    benchmark: false,
    logging: (...msg) => console.log(msg),
    logQueryParameters: false,
    logging: (sql, timing) => {
      if (timing && timing > 100) {
      }
    },
  }
);

const Restaurant = sequelize.define(RESTAURANT, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hyg_rating: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Menu = sequelize.define(MENU, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

const Order = sequelize.define(ORDER, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "processing", "completed"),
    allowNull: false,
    defaultValue: "pending",
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
});

const OrderItem = sequelize.define(ORDER_ITEM, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const Category = sequelize.define(CATEGORY, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Dish = sequelize.define(DISH, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Rating = sequelize.define(RATING, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
  },
});

const User = sequelize.define(USER, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Auth = sequelize.define(AUTH, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  refresh_token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const connectToDatabase = async () => {
  sequelize
    .authenticate()
    .then(() => {})
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });

  User.hasMany(Order);
  Order.belongsTo(User);

  Restaurant.hasMany(Menu);
  Menu.belongsTo(Restaurant);

  Order.belongsTo(Restaurant);
  Restaurant.hasMany(Order);

  Order.hasMany(OrderItem);
  OrderItem.belongsTo(Order);

  Menu.hasMany(OrderItem);
  OrderItem.belongsTo(Menu);

  User.hasOne(Auth);
  Auth.belongsTo(User);

  Rating.belongsTo(Dish);
  Dish.hasOne(Rating);

  Dish.belongsTo(Category);
  Category.hasMany(Dish);

  sequelize
    .sync({ alter: true, logging: console.log })
    .then((result) => {})
    .catch((err) => {
      console.log(err);
    });
};

export { sequelize, connectToDatabase };
