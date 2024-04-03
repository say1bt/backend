import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import routes from "./src/routes/index.js";
import { connectToDatabase } from "./src/utils/database_utils.js";
import { authMiddleware } from "./src/middleware/auth_middleware.js";
import swaggerUi from "swagger-ui-express";
import { specs } from "./src/configurations/swagger.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

connectToDatabase();

app.use("/users", routes.userRoutes);
app.use("/restaurants", authMiddleware, routes.restaurantRoutes);
app.use("/menus", authMiddleware, routes.menuRoutes);
app.use("/orders", authMiddleware, routes.orderRoutes);
app.use("/categories", authMiddleware, routes.categoryRoutes);
app.use("/ratings", authMiddleware, routes.ratingRoutes);
app.use("/dish", authMiddleware, routes.dishRoutes);
app.use("/report", authMiddleware, routes.reportRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) return res.send({ error: "404|not found" });
  res.send("404|not found");
});

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log("Server up and running");
});
