const  pool  = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ mensaje: 'Usuario registrado', usuario: newUser });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ mensaje: 'Error al crear el usuario', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ mensaje: 'User not found' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
        });

    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await pool.query('SELECT id, name, email, fecha_creacion FROM usuarios WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'User not found' });
        }
        return res.status(200).json({ user: result.rows[0] });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener el perfil del usuario', error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, WHERE id = $6 RETURNING *',
            [name, email, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'User not found' });
        }
        return res.status(200).json({ mensaje: 'Perfil actualizado', user: result.rows[0] });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al actualizar el perfil', error: error.message });
    }
};