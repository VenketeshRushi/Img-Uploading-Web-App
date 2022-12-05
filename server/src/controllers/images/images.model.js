const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Image = mongoose.model("image", imageSchema);

module.exports = Image;
