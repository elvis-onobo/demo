const express = require('express');

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

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})