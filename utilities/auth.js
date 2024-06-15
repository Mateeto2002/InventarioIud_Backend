const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // Crear el payload para el token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Firmar el token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};