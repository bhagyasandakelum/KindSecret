const express = require('express');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const Secret = require('../models/Secret');
const router = express.Router();

const sendLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 messages per IP per hour
  message: 'Too many messages sent from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

function hashIp(ip) {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

function generateSecretId() {
  return 'secret_' + crypto.randomBytes(3).toString('hex').toUpperCase();
}

router.post('/send-secret', sendLimiter, async (req, res) => {
  try {
    const { recipientEmail, message, subject } = req.body;
    
    // Hash IP for abuse protection
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    const ipHash = hashIp(ip);

    // Basic validation
    if (!recipientEmail || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    // Profanity check - simplified for MVP
    const profanityList = ['badword1', 'swear']; // Placeholder
    const hasProfanity = profanityList.some(word => message.toLowerCase().includes(word));
    if (hasProfanity) {
      return res.status(400).json({ error: 'Message flagged for inappropriate content' });
    }

    const secretId = generateSecretId();

    const newSecret = new Secret({
      id: secretId,
      recipientEmail,
      message,
      subject: subject || 'Someone sent you a KindSecret 💌',
      ipHash,
    });

    await newSecret.save();

    const { sendKindSecretEmail } = require('../services/emailService');
    await sendKindSecretEmail(recipientEmail, message, subject);
    
    res.json({ success: true, secretId, message: 'Your KindSecret was delivered.' });
  } catch (error) {
    console.error('Send Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
  }
});

router.post('/report-secret', async (req, res) => {
  try {
    const { secretId } = req.body;
    
    const secret = await Secret.findOneAndUpdate(
      { id: secretId },
      { status: 'reported' },
      { new: true }
    );

    if (!secret) return res.status(404).json({ error: 'Secret not found' });

    res.json({ success: true, message: 'Message reported' });
  } catch (error) {
    res.status(500).json({ error: 'Error reporting secret' });
  }
});

router.get('/secret/:id', async (req, res) => {
  try {
    const secret = await Secret.findOne({ id: req.params.id, status: 'active' });
    if (!secret) return res.status(404).json({ error: 'Secret not found or expired' });
    
    res.json({ 
      id: secret.id,
      createdAt: secret.createdAt,
      expiresAt: secret.expiresAt,
      status: secret.status 
      // Do not expose recipient or message to the sender after sending securely.
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving secret' });
  }
});

module.exports = router;
