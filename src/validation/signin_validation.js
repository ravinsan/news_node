import Joi from 'joi';

const signValidation = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is a required field',
        'string.empty': 'Email cannot be an empty field',
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is a required field'
    })
});

export default signValidation;
