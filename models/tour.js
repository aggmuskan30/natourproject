import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.5 },
  image: { type: String, required: true }, 
  difficulty: { type: String, default: 'medium' }
});

const Tour = mongoose.models.Tour || mongoose.model("Tour", tourSchema);

export default Tour;