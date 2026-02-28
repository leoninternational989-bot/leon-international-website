/**
 * Run this script to get a new Gmail OAuth2 refresh token.
 *
 * Steps:
 * 1. Go to Google Cloud Console > APIs & Services > Credentials
 * 2. Make sure Gmail API is enabled
 * 3. Make sure your OAuth client has http://localhost:3000/callback as a redirect URI
 * 4. Run: node scripts/get-gmail-token.js
 * 5. Open the URL it prints in your browser
 * 6. After authorization, it will print the refresh token
 * 7. Copy the refresh token to your .env file as GMAIL_REFRESH_TOKEN
 */

const http = require('http');
const { google } = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:4000/callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify',
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent', // Force to get a new refresh token
});

console.log('\n=== Gmail OAuth2 Token Generator ===\n');
console.log('1. Open this URL in your browser:\n');
console.log(authUrl);
console.log('\n2. Sign in with: leoninternational989@gmail.com');
console.log('3. Grant all permissions');
console.log('4. You will be redirected - the token will appear here\n');
console.log('Waiting for callback...\n');

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/callback')) {
    const url = new URL(req.url, 'http://localhost:4000');
    const code = url.searchParams.get('code');

    if (code) {
      try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log('=== SUCCESS ===\n');
        console.log('Refresh Token:', tokens.refresh_token);
        console.log('\nUpdate your .env file:');
        console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}\n`);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Success!</h1><p>Refresh token has been printed in the terminal. You can close this tab.</p>');
      } catch (err) {
        console.error('Error getting token:', err.message);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Error</h1><p>' + err.message + '</p>');
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end('<h1>Error</h1><p>No code received</p>');
    }

    setTimeout(() => { server.close(); process.exit(0); }, 1000);
  }
});

server.listen(4000, () => {
  console.log('Listening on http://localhost:4000 for callback...');
});
