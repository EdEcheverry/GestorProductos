const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const conectBD = require('./src/utils/db');
const middlewareAutentication = require('./src/middleware/middlewareAutentication');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

conectBD();

app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));

app.get('/api/user/profile', middlewareAutentication, (req, res) => {
  res.status(200).json({ mensaje: 'User profile', user: req.user });
});

app.use((req, res, next) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
