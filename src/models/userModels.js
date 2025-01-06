const mongoose = require("mongoose");
const { Schema, Types } = mongoose;



// User Schema
// ============================================================================

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    shopList: [
      {
        _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
        value: {
          type: String,
          required: [true, "Value is required in shopList items"],
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);



// Filter sensitive information when converting document to JSON
// ============================================================================

UserSchema.methods.toJSON = function () {
  /**
   * Converts the current instance to a plain JavaScript object.
   *
   * @returns A plain JavaScript object representation of the instance.
   */
  const obj = this.toObject();
  delete obj.password;
  return obj;
};



// Index email field for faster queries
// ============================================================================

UserSchema.index({ email: 1 });



// Export User model
// ============================================================================

const User = mongoose.model("User", UserSchema);

module.exports = User;
