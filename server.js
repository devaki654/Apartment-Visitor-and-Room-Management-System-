const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// ✅ Hardcoded Credentials (For Testing Only - Remove in Production)
const FIXED_USERNAME = "admin";
const FIXED_PASSWORD = "admin123";

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ✅ MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345", // Change if needed
    database: "user"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL Database");
});

// ✅ User Login API
app.post("/login", (req, res) => {
    console.log("Login request received:", req.body);
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and Password are required" });
    }

    // ✅ Check Hardcoded Credentials First
    if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
        return res.json({ success: true, redirect: "/login.html" });
    }

    // ✅ Check Database for User Credentials
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
        if (results.length > 0) {
            return res.json({ success: true, redirect: "/login.html" });
        } else {
            return res.json({ success: false, message: "Invalid Username or Password" });
        }
    });
});

// ✅ API to Fetch Visitors
app.get("/get-visitors", (req, res) => {
    const query = "SELECT id, visitor_name, phone_number, apartment_number, purpose, host_name FROM visitors";
    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error fetching visitors:", err);
            return res.status(500).json({ message: "Error fetching visitors" });
        }
        res.json(results);
    });
});

// ✅ API to Add a New Visitor
app.post("/add-visitor", (req, res) => {
    console.log("Incoming visitor data:", req.body);
    const { visitorName, phoneNumber, apartmentNumber, purpose, hostName } = req.body;

    if (!visitorName || !phoneNumber || !apartmentNumber || !purpose || !hostName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = `INSERT INTO visitors (visitor_name, phone_number, apartment_number, purpose, host_name) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [visitorName, phoneNumber, apartmentNumber, purpose, hostName], (err, result) => {
        if (err) {
            console.error("❌ Error inserting visitor data:", err);
            return res.status(500).json({ message: "Error saving visitor data" });
        }
        res.json({ message: "Visitor added successfully!", visitorId: result.insertId });
    });
});

// ✅ Store Booking Order
app.post("/book-room", (req, res) => {
    const { name, roomNumber, roomName, amountPerNight, numMembers, checkIn, checkOut, totalDays, totalAmount } = req.body;

    const sql = "INSERT INTO bookings (name, room_number, room_name, amount_per_night, num_members, check_in, check_out, total_days, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [name, roomNumber, roomName, amountPerNight, numMembers, checkIn, checkOut, totalDays, totalAmount];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting booking:", err);
            res.status(500).json({ message: "Booking failed" });
        } else {
            res.json({ message: "Booking successful!", bookingId: result.insertId });
        }
    });
});


// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
