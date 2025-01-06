const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    const data = {
        inputs: userMessage
    };

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            data,
            {
                headers: {
                    Authorization: "Bearer hf_#############################",
                    "Content-Type": "application/json"
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error connecting to AI" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
