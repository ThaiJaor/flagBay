const axios = require("axios");
const https = require("https");
const jwt = require("jsonwebtoken");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const iss = process.env.ISSUER;
const aud = process.env.AUDIENCE;

function generateToken() {
  const payload = {
    iss,
    aud,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
}

async function addWallet(username) {
  const token = generateToken();
  const respone = await axios.post(
    "https://127.0.0.1:8000/api/wallet",
    { username },
    {
      headers: { Authorization: `Bearer ${token}` },
      httpsAgent,
    }
  );
  return respone.data;
}

async function getWallet(username) {
  const token = generateToken();
  const respone = await axios.get(
    `https://127.0.0.1:8000/api/wallet/${username}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      httpsAgent,
    }
  );
  return respone.data;
}

async function deposit(amount, bankCard, username) {
  const token = generateToken();
  const respone = await axios.post(
    `https://127.0.0.1:8000/api/deposit`,
    { amount, bankCard, username },
    {
      headers: { Authorization: `Bearer ${token}` },
      httpsAgent,
    }
  );
  console.log(3);
  return respone.data;
}

async function pay(amount, username) {
  const token = generateToken();
  const respone = await axios.post(
    `https://127.0.0.1:8000/api/pay`,
    { amount, username },
    {
      headers: { Authorization: `Bearer ${token}` },
      httpsAgent,
    }
  );
  return respone.data;
}

async function getAllTransaction() {
  const token = generateToken();
  const respone = await axios.get(`https://127.0.0.1:8000/api/transaction`, {
    headers: { Authorization: `Bearer ${token}` },
    httpsAgent,
  });
  return respone.data;
}

exports.addWallet = addWallet;
exports.getWallet = getWallet;
exports.deposit = deposit;
exports.pay = pay;
exports.getAllTransaction = getAllTransaction;