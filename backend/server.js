const express = require('express');
router = express.Router();
const colorInfo = require('./services/colorinfo');

const app = express();
app.use(router);
const port = process.env.PORT || 3000;

// Add CORS headers
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.get('/color-mood', async (req, res) => {
    console.log(`~~~~~~~${req.query.color}`)
    const info = await colorInfo.getInfoFromColor(req.query.color);
    console.log(JSON.parse(info))
    res.send(await JSON.parse(info));
});

router.get('/mood-color', async (req, res) => {
    console.log(`~~~~~~~${req.query.mood}`)
    const color = await colorInfo.getColorFromInfo(req.query.mood);
    console.log(JSON.parse(color))
    res.send(await JSON.parse(color));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});