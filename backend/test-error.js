const http = require('http');
const req = http.request('http://localhost:5000/api/send-secret', {method: 'POST', headers: {'Content-Type': 'application/json'}}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('BODY:', data));
});
req.write(JSON.stringify({recipientEmail: 'test@test.com', message: 'hello'}));
req.end();
