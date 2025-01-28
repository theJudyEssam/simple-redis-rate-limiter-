import express from "express";
import redis from "redis";
import rateLimiter from "./rateLimiter.js";
// Rate limiter via Redis

const Redis = redis.createClient();
const app = express();


app.get("/api/data", rateLimiter, (req, res)=>{
    res.json({ message: 'Welcome! You are within the rate limit.' });
})






app.listen(3000);

