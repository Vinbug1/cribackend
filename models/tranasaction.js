const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  accountType:{
    type: String,
    required: true,
  },
  amount:{
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;

