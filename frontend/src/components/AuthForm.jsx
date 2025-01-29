import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/register';
        const data = isLogin
            ? { email: formData.email, password: formData.password }
            : { name: formData.name, email: formData.email, password: formData.password };

        try {
            const response = await axios.post(url, data);
            console.log(response.data);
            if (isLogin) {
                localStorage.setItem('token', response.data.token);
                alert('Inicio de sesión exitoso');
                navigate('/app');
            } else {
                alert('Registro exitoso');
            }
        } catch (error) {
            console.error('Error:', error.response?.data?.error || error.message);
            alert(error.response?.data?.error || 'Contraseña Incorrecta');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-tabs">
                    <button
                        className={`tab-button ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        className={`tab-button ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Registrarse
                    </button>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
                    {!isLogin && (
                        <div className="input-group">
                            <label htmlFor="name">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Ingresa tu nombre"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Ingresa tu correo"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder={isLogin ? 'Ingresa tu contraseña' : 'Crea una contraseña'}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirma tu contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="submit-button">
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;