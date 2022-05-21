const LabelModel = require("../models/label.model");

class LabelService {
  addLabel = async (data) => {
    // data["type"] = "brand";
    let label = new LabelModel(data);
    return await label.save();
  };
}
module.exports = LabelService;
