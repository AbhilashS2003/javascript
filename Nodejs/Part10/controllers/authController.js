const bcrypt = require('bcrypt');
const db = require('../db/init');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'this is secret';

exports.register = async(req, res) => {
    const {email, password} = req.body;
    const id = Date.now().toString();
    const createdAt = new Date().toISOString();
    const hashed = await bcrypt.hash(password, 10);

    db.run(
        `insert into users (id, email, password, createdAt) values (?, ?, ?, ?)`,
        [id, email, hashed, createdAt],
        (err) => {
            if (err) {
                if(err.message.includes('UNIQUE')) {
                    return res.status(409).json({error:'email already exists'});
                }
                return res.status(500).json({error:'Failed to register'});
            }
            res.status(201).json({id, email, createdAt});
        }
    );
};

exports.login = (req, res) => {
    const {email, password} = req.body;

    db.get(`select * from users where email = ?`, [email],
    async(err, user) => {
        if(err || !user) {
            return res.status(401).json({ error: 'Invalid credentials'});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(401).json({ error: 'Invalid credentials'});
        }

        const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: "1h"});

        res.json({token});
    });
};

