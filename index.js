const express = require('express');
const crypto = require("crypto");

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/test', (req, res) => {
    res.json({
        test: "Hello World!"
    })
})

export const verifyWebhookSignature = async (req, res, next) => {
    const payload = req.body
    console.log("Payload >>>>> ", payload)
    const githubSignature = req.headers['x-hub-signature-256'];
    console.log({ githubSignature })
    if (!githubSignature) {
        res.status(401).send('No signature found');
        return;
    }
    const hmac = crypto.createHmac('sha256', config.githubWebhookSecret);
    hmac.update(payload, 'utf8');
    const digest = `sha256=${hmac.digest('hex')}`;
    console.log("Digest >>>>> ", { digest })
    const isVerified = crypto.timingSafeEqual(Buffer.from(githubSignature), Buffer.from(digest));
    console.log({ isVerified })
    if (!isVerified) {
        res.status(401).send('Signature verification failed');
        return;
    }
    return next()
}


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})