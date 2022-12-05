const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };

const userSchema = new mongoose.Schema(
  {
    firstName: reqString,
    lastName: reqString,
    email: reqString,
    phone: reqString,
    password: reqString,
    imgCollection: {
      type: Array,
      required:false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    this.password = hash;
    return next();
  });
});

userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password).then((res) => res);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
