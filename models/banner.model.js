const mongoose = require("mongoose");
const BannerSchemaDef = new mongoose.Schema(
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

const BannerModel = mongoose.model("Banner", BannerSchemaDef);

module.exports = BannerModel;
