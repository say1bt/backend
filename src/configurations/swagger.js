import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "EATME assignment",
      version: "1.0.0",
      description: "API documentation for EATME assignment",
    },
    servers: [
      {
        url: "http://localhost:1337",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsdoc(options);

export { specs };
