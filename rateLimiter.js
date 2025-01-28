// here shall lie the middleware
import redis from "redis";

//redis client
const client = redis.createClient();
client.on('connect', () => console.log('Connected to Redis'));
client.connect(); // For Redis v4+


const rateLimiter = async (req, res, next)=> {
    const ip = req.ip;
    const limit = 5;
    const expiration = 60;
    console.log(ip)

    try{

        const requests = await client.incr(ip);

        if(requests == 1 ){
            // we will set an expiration time for each client
            await client.expire(ip, expiration);
        }

        if(limit < requests){
            return res.status(429).json({ message: 'Too Many Requests' });
        }

        next();

    }
    catch(e){
        console.error(e);
        res.status(500).json({ message: 'Server Error' });
    }
}

export default rateLimiter;