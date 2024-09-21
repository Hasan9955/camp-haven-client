/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppDispatch } from '../redux/hooks';
import { useSignUpMutation } from '../redux/features/auth/authApi';
import { toast } from 'react-toastify';
import { setUser } from '../redux/features/auth/authSlice';



const SignUp = () => {

    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState('')
    const dispatch = useAppDispatch();
    const [signUp] = useSignUpMutation();

    const handleRegister = async (e: any) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const address = form.address.value
        const phone = form.phone.value
        const photo = form.photo.value
        const email = form.email.value
        const password = form.password.value
        setError('')
        setEmailError('')
        console.log({
            name, photo, email, password,
            address, phone
        })


        if (!/^(?=.*[A-Z]).{6,}$/.test(password)) {
            return setError('please provide  at last 6 character')
        }

        try {
            const userData = {
                name, address, photo, email, phone, password
            }

            const res = await signUp(userData).unwrap();
            console.log(res);

            const user = {
                userId: res.data._id,
                email: res.data.email,
                name: res.data.name,
                photo: res.data.photo,
                role: res.data.role,
            }
            console.log(user);
            dispatch(setUser({
                user
            }))
            toast.success('Sign up Successful !!!')
            navigate("/")
        } catch (error: any) {
            console.log(error);
            if(error.data.message.includes('E11000 duplicate key error collection')){
                setEmailError(error)
            }
            toast.error('An error is going on!')
        }

    }
    return (
        <div className=" ">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold">Register now!</h1>

                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="text" name="phone" placeholder="018xxxxxxxx" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" name="address" placeholder="Your Address" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            <label >
                                {
                                    emailError && <h2 className="text-red-600 text-center">This email is already registered.</h2>
                                }
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                {
                                    error &&
                                    <ul className="text-red-400 list-disc text-sm font-bold">
                                        <li>Minimum six in length.</li>
                                        <li>At least one upper case letter.</li> 
                                    </ul>
                                }
                            </label>
                        </div>
                        <input type="submit" className="btn bg-blue-500 text-white" value="Register" />
                    </form>
                    <div className="mx-auto mb-5">

                        <p >Already have an account? <Link className="font-extrabold text-blue-600" to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;