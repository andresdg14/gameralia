const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

const clientId = process.env.REACT_APP_TWITCH_ID;
const clientSecret = process.env.REACT_APP_TWITCH_SECRET;
const igdbUrl = 'https://api.igdb.com/v4/';

let accessToken = null;
let tokenExpiration = null;

const getAccessToken = async () => {
  if (!accessToken || !tokenExpiration || new Date() >= tokenExpiration) {
    const response = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiration = new Date(Date.now() + response.data.expires_in * 1000);
  }

  return accessToken;
};

app.use(cors());

app.post('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const token = await getAccessToken();

    const response = await axios.post(
      igdbUrl + 'games',
      `search "${query}"; fields name, cover.url; limit 10;`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error searching games:', error);
    res.status(500).json({ message: 'Error searching games' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
