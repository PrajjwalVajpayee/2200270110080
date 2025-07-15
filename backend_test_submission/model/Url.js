import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  clicks: [
    {
      timestamp: { type: Date, default: Date.now },
      source: String,
      location: String
    }
  ]
});

const Url = mongoose.model('Url', urlSchema);
export default Url;
