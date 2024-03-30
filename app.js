const express = require('express');
const app = express();
const port = 3000;

app.post('/webhook', async (req, res) => {
    const {body} = req;
    try {
        console.log(body);
    } catch(e) {
        console.error(e);
        return res.status(400).json();
    }
    return res.status(200).json();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})