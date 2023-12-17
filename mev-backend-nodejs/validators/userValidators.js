const { body } = require('express-validator');

const validateUserSignUp = [
  body('email', 'Invalid Email').isEmail().normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters')
]

const validateLoginUser = [
  body('email', 'Invalid Email').isEmail().normalizeEmail(),
];



module.exports = {
  validateUserSignUp,
  validateLoginUser,
};
