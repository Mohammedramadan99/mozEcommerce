const mongoose = require("mongoose");

const reviewUsSchema = mongoose.Schema(
  {
    user:{},
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      require:true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewUs =
  mongoose.models.reviewUs || mongoose.model("reviewUs", reviewUsSchema);
export default ReviewUs;
