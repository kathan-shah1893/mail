const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); // Middleware to parse JSON bodies

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Basic GET route
app.get("/", (req, res) => {
    res.send("hii");
});

// POST route to send an email
app.post("/send_email", async (req, res) => {
    // Extract email details from request body
    const { to, subject, text } = req.body;

    // Create a test account (optional, useful for testing but not required in production)
    // let testAccount = await nodemailer.createTestAccount();

    // Create a transporter object using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'radhe.patel.26095@gmail.com', // Replace with your email address
            pass: 'fvwbryfaqiyyrkyu' // Replace with your email password or app password
        }
    });

    try {
        // Send the email
        let info = await transporter.sendMail({
            from: 'shahkathanshah@gmail.com', // Sender address
            to: to, // List of recipients from request body
            subject: subject, // Subject line from request body
            text: text // Plain text body from request body
        });

        console.log("Message sent: %s", info.messageId);
        res.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
app.listen(2000, () => {
    console.log('Server running on http://localhost:2000');
});