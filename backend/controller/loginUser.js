const bcrypt = require('bcryptjs');
const {User} = require('../models/UserSchema'); // Adjust path to your User model
const jwt = require('jsonwebtoken');
const JWT_SECRET="thisIsMyKey";
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET
        );

        // Prepare user response without sensitive data
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            user: userResponse
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server error occurred',
            error: error.message
        });
    }
};

module.exports = userLogin;