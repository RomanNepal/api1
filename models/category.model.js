const mongoose = require("mongoose");

const CategorySchemaDef = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    link: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    summary: {
      type: String,
    },
    parent_id: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      default: null,
    },
    image: {
      type: String,
    },
    label: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Labels",
        default: null,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const CategoryModel = mongoose.model("Categories", CategorySchemaDef);
module.exports = CategoryModel;
