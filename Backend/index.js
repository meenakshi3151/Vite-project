import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 👉 1. GitHub OAuth - Redirect to GitHub
app.get('/auth/github', (req, res) => {
  const redirectUri = 'http://localhost:3000/auth/github/callback';
  const clientId = process.env.GITHUB_CLIENT_ID;
  const scope = 'repo user admin:repo_hook';

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  res.redirect(githubAuthUrl);
});

// 👉 2. GitHub Callback - Exchange Code for Access Token
app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenResponse.json();
  const accessToken = data.access_token;

  // Redirect to frontend with token in query string
  res.redirect(`http://localhost:3000/repos?token=${accessToken}`);
});

// 👉 3. Fetch GitHub Repositories
app.get('/api/github/repos', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  const response = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const repos = await response.json();
  res.json(repos);
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



