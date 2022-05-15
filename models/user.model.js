const mongoose = require("mongoose");
const { statusSchema, indexSchema } = require("./title.schema");
// const LocationSchema = new mongoose.Schema({
//   location: {
//     type: String,
//   },
// });
// const Location = mongoose.model("Location", LocationSchema);
const UserSchemaDef = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // shipping: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    // billing: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },

    role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: "customer",
    },
    image: [{ type: String }],
    date_of_birth: { type: String },
    ...statusSchema,
    // {
    //     timestamps: true,
    //     autoCreate: true,
    //     autoIndex: true,
    // }
  },
  indexSchema
);

const User = mongoose.model("User", UserSchemaDef);

module.exports = User;
