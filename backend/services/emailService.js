const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  streamTransport: true,
  newline: 'windows'
});

async function sendKindSecretEmail(to, message, subject) {
  const mailOptions = {
    from: '"KindSecret App" <secret@kindsecret.app>',
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
    // Integrate real sendgrid/SES here
    return await transporter.sendMail(mailOptions);
  }
}

module.exports = {
  sendKindSecretEmail
};
