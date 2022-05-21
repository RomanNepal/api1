const mongoose = require("mongoose");
const BrandSchemaDef = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: ["active"],
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const Brand = mongoose.model("brand", BrandSchemaDef);

module.exports = Brand;
