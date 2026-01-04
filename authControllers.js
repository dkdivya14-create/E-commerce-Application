const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendNotification = async (email, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: email, subject, text });
};
exports.register = async (req, res) => {
    const { email, password, business_name, phone, address } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO divya_sellers (email, password, business_name, phone, address, status) VALUES (?, ?, ?, ?, ?, 'pending')`;
        await db.execute(query, [email, hashedPassword, business_name, phone, address]);
        
        await sendNotification(email, "Welcome!", "Your registration is pending admin approval.");
        res.status(201).json({ message: "Seller registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (email === "admin@system.com" && password === "admin123") {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });
        return res.json({ message: "Admin Login Success", token, role: 'admin' });
    }
    try {
        const [rows] = await db.execute('SELECT * FROM divya_sellers WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ message: "User not found" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user.id, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ message: "Seller Login Success", token, role: 'seller', status: user.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getPendingSellers = async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM divya_sellers WHERE status = "pending"');
    res.json(rows);
};

exports.updateStatus = async (req, res) => {
    const { id, status } = req.body;
    await db.execute('UPDATE divya_sellers SET status = ? WHERE id = ?', [status, id]);
    const [user] = await db.execute('SELECT email FROM divya_sellers WHERE id = ?', [id]);
    await sendNotification(user[0].email, "Account Update", `Your account status is now: ${status}`);
    
    res.json({ message: `Seller ${status}` });
};