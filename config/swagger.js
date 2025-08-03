// config/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Registration API",
      version: "1.0.0",
      description:
        "API for user registration, OTP verification, login and profile management",
    },
    servers: [
      {
        url: "http://localhost:3000", // or your deployment URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Register: {
          type: "object",
          properties: {
            name: { type: "string", example: "Vraj Gautam" },
            username: { type: "string", example: "vrajg" },
            email: { type: "string", example: "vraj@example.com" },
            companyName: { type: "string", example: "TechReal" },
          },
        },
        UserUpdate: {
          type: "object",
          properties: {
            name: { type: "string", example: "Updated Name" },
            username: { type: "string", example: "updatedUsername" },
            companyName: { type: "string", example: "Updated Company" },
            address: {
              type: "object",
              properties: {
                street: { type: "string", example: "123 Street" },
                district: { type: "string", example: "Valsad" },
                state: { type: "string", example: "Gujarat" },
                pincode: { type: "string", example: "396060" },
                country: { type: "string", example: "India" },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
