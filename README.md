
# Rate Limiter via Redis

This is a rate limiter created using Redis and Express.js. Rate limiting is highly useful for preventing DoS attacks and ensuring fair usage of resources.

### Tools
1. Express.js  
2. Node.js  

### Logic

The main logic of this code lies in the middleware function `rateLimiter`, which retrieves the user's IP address, sets an expiration time, and defines a limit for the number of requests.

```javascript
const ip = req.ip;
const limit = 5;
const expiration = 60;
console.log(ip);
```

The middleware stores the IP address as a key in Redis and increments its value by 1 for each request. An expiration time is set for the key when it is created. If the number of requests exceeds the defined limit, the middleware responds with a 429 status code ("Too Many Requests").

```javascript
const requests = await client.incr(ip);

if (requests === 1) {
    // Set an expiration time for each client
    await client.expire(ip, expiration);
}

if (requests > limit) {
    return res.status(429).json({ message: 'Too Many Requests' });
}

next();
```

