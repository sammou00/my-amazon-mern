import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import validateEmail from '../utils/validateEmail.js';
import validateUsername from '../utils/validateUsername.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

import User from '../models/user.js';

const userControllers = {
    register: async (req, res) => {
        const { username, email, password, rePassword } = req.body;

        try {
            // check if user exists
            const userExist = await User.findOne({ email: email });

            if (userExist) {
                return res
                    .status(400)
                    .json({ message: 'User already exists, please login!' });
            }

            // validate email, password, username and matchPasswords
            const isValidEmail = validateEmail(email);
            const isValidUsername = validateUsername(username);
            const isValidPassword = validatePassword(password);
            const doPasswordsMatch = matchPasswords(password, rePassword);

            if (
                isValidEmail &&
                isValidUsername &&
                isValidPassword &&
                doPasswordsMatch
            ) {
                // hash password
                const hashedPassword = hashPassword(password);

                const newUser = new User({
                    email,
                    username,
                    password: hashedPassword
                });

                await newUser.save();

                res.status(201).json({
                    user: newUser,
                    message: 'User created successfully!'
                });
            } else {
                return res.status(400).json({
                    message: 'Invalid email or password or username.'
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const userExist = await User.findOne({ email: email });
            if (!userExist) {
                return res
                    .status(400)
                    .json({ message: 'Invalid email or password.' });
            }

            // compare passwords
            bcrypt.compare(password, userExist.password, (err, isValid) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }

                if (isValid) {
                    const token = jwt.sign(
                        { user: userExist },
                        process.env.TOKEN_SECRET
                    );

                    // create cookie
                    res.cookie('token', token, { httpOnly: true });

                    res.status(200).json({
                        id: userExist._id,
                        username: userExist.username,
                        message: 'User logged in successfully!'
                    });
                } else {
                    return res
                        .status(400)
                        .json({ message: 'Invalid email or password.' });
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },
    logout: async (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully!' });
    },
    checkAdmin: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({ _id: id });
            if (!user) {
                return res.status(400).json({ message: 'User not found!' });
            }

            if (user.role === 'admin') {
                res.status(200).json({
                    message: 'User is admin!',
                    isAdmin: true
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({ _id: id });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found!' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },
    forgetPassword: async (req, res) => {
        const { id } = req.params;
        const { newPassword } = req.body;
        try {
            const user = await User.findOne({ _id: id });
            if (user) {
                const hashedPassword = hashPassword(newPassword);
                user.password = hashedPassword;
                await user.save();
                res.status(200).json({
                    message: 'Password updated successfully!'
                });
            } else {
                res.status(404).json({ message: 'User not found!' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ message: 'No users found!' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    changeRole: async (req, res) => {
        const { email, role } = req.body;
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                user.role = role;
                await user.save();
                res.status(200).json({
                    message: 'Role updated successfully!'
                });
            } else {
                res.status(404).json({ message: 'User not found!' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default userControllers;
