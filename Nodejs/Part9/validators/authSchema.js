const {z} = require('zod');

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'password must be atleast 6 characters')
});

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

module.exports = {
    RegisterSchema,
    LoginSchema
};