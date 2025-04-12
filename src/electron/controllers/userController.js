import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';

export default class UserController {
    constructor() {
        this.secretKey = 'intercocina';
    }

    async all() {
        const [row] = await db.query("SELECT * FROM users");
        return row;
    }

    async create(data) {
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(data.password, 10);

            // Generate JWT token
            const token = jwt.sign(
                { username: data.username, email: data.email },
                this.secretKey,
                { expiresIn: '30d' }
            );

            // Save user in DB
            const [result] = await db.query(
                'INSERT INTO users (full_name, username, email, role_id, token, password) VALUES (?, ?, ?, ?, ?, ?)',
                [data.full_name, data.username, data.email, 1, token, hashedPassword]
            );

            return {
                message: '✅ User created successfully!',
                userId: result.insertId
            };
        } catch (error) {
            console.error('❌ Error creating user:', error.message);
            throw error;
        }
    }

    async login({ identifier, password }) {
        try {
            // Try to find user by username or email
            const [rows] = await db.query(
                'SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1',
                [identifier, identifier]
            );

            if (rows.length === 0) {
                throw new Error('❌ User not found');
            }

            const user = rows[0];

            // Compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('❌ Invalid password');
            }

            // Generate new token
            const token = jwt.sign(
                { id: user.id, username: user.username, email: user.email },
                this.secretKey,
                { expiresIn: '30d' }
            );

            // Update token in database
            await db.query('UPDATE users SET token = ? WHERE id = ?', [token, user.id]);

            const result =  {
                message: '✅ Login successful!',
                token,
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    username: user.username,
                    email: user.email,
                    role_id: user.role_id
                }
            };

            console.log(result);
            return result;
            
        } catch (error) {
            console.error('❌ Login error:', error.message);
            throw error;
        }
    }
}
