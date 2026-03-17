const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendKindSecretEmail(to, message, subject) {
  const mailOptions = {
    from: `"KindSecret App" <${process.env.EMAIL_USER || 'secret@kindsecret.app'}>`,
    to: to,
    subject: subject || 'Someone sent you a KindSecret 💌',
    text: `Hello,\n\nSomeone wanted to send you a kind message anonymously.\n\nMessage:\n${message}\n\nThis message was sent through KindSecret.\n\nSpread kindness.`
  };
  
  if (process.env.EMAIL_SERVICE === 'log') {
    console.log('\n--- SIMULATED EMAIL SEND ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Body:\n${mailOptions.text}`);
    console.log('----------------------------\n');
    return { messageId: 'simulated_id' };
  } else {
    // Send real email via SMTP
    return await transporter.sendMail(mailOptions);
  }
}

module.exports = {
  sendKindSecretEmail
};
