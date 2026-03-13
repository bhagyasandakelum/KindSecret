const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  subject: {
    type: String,
    default: 'Someone sent you a KindSecret 💌',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
  },
  ipHash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'reported', 'expired'],
    default: 'active',
  }
});

module.exports = mongoose.model('Secret', secretSchema);
