const bcrypt = require('bcryptjs');
const {User} = require('../models/UserSchema'); // Adjust path to your User model

const userCreate = async (req, res) => {
    try {
        const { firstName, lastName, birthDate, email, password } = req.body;

        // Explicit check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: 'Email already exists'
            });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const user = new User({
            firstName,
            lastName,
            birthDate,
            email,
            password: hashedPassword
        });

        await user.save();

        // Remove sensitive data before sending response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).send({
            success: true,
            message: 'User created successfully',
            user: userResponse
        });

    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(409).send({
                success: false,
                message: 'Email already exists'
            });
        }
        // Generic server error
        res.status(500).send({
            success: false,
            message: 'Server error occurred',
            error: error.message
        });
    }
};

module.exports = userCreate;