import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  tourName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  text: { type: String, required: true },
  image: { type: String, default: '/img/default-user.jpg' }
}, { timestamps: true });

export default mongoose.models.Story || mongoose.model("Story", storySchema);