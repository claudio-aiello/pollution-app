const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["./src/app.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new Dotenv({
        path: './api.env',
      systemvars: true,
    }),
  ],
};
