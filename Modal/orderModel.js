const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  user: {},
  customerId: { type: String },
  paymentIntentId:{type:String},
  products: [],
  total: { type: Number, required: true },
  subtotal: { type: Object, required: true },
  delivery_status: { type: String, default: 'pending' },
  payment_status: { type: String, default:true}
},{timestamps:true});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;