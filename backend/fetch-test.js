const http = require('http');
const fs = require('fs');
const req = http.request('http://localhost:5000/api/send-secret', {method: 'POST', headers: {'Content-Type': 'application/json'}}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => fs.writeFileSync('out.txt', data));
});
req.write(JSON.stringify({recipientEmail: 'test@test.com', message: 'hello'}));
req.end();
