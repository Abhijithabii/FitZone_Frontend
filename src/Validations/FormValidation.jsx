import * as Yup from 'yup'
export const EmployeeValidationSchema = Yup.object({

    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    department: Yup.string().required('Department is required'),

})