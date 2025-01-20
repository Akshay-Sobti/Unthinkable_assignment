const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const UserModel = require('./models/Users');
const path = require("path");
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure 'public/images' directory exists
const imageDir = path.join(__dirname, "public/images");
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

// Serve static files from 'public/images'
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = `/images/${req.file.filename}`;
    res.status(200).json({ message: "File uploaded successfully", fileUrl });
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/unthinkable", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Get all users
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

// Get user by ID
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Update user by ID
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        category: req.body.category
    }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

// Delete user by ID

app.delete('/users/:id', (req, res) => {  // Make sure this is /users/:id
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)  // Ensure you are passing the correct id directly
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted successfully", user });
        })
        .catch(err => res.status(500).json({ error: "Server error", details: err }));
});


// Create new user
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

// Search users/products
app.get('/search', (req, res) => {
    const query = req.query.query || '';
    UserModel.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },  // Case-insensitive search on name
            { category: { $regex: query, $options: 'i' } } // Case-insensitive search on category
        ]
    })
    .then(users => res.json(users))  // Return matched users (products)
    .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server
app.listen(3001, () => {
    console.log("Server is Running on http://localhost:3001");
});
