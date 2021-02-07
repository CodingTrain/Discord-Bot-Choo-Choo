const { Schema } = require("mongoose");

const NumberSchema = new Schema({
  created: { type: Number, default: Date.now },
  value: Number,
});

exports.schema = NumberSchema;
