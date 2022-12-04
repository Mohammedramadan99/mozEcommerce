const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    user: {
      type: Object, // or Object
      ref: "User",
      required: [true, "user is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    content: {
      type: String,
      required: [true, "contnt is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
export default Notification;
// review -- product or us 
//