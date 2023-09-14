import * as Yup from 'yup'

export const loginSchema = Yup.object({
    email : Yup.string().email().required("Enter Your Email"),
    password : Yup.string().min(6).required("Enter Your Password"),
});