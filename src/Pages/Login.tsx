import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';


const Login = () => {

    const [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const email = (form.elements.namedItem('email') as HTMLInputElement).value
        const password = (form.elements.namedItem('password') as HTMLInputElement).value
        setError('')
        const userInfo = {
            email,
            password
        }
        console.log(userInfo);


        try {
            const res = await login(userInfo).unwrap();
            console.log(res);

            const user = {
                userId: res.data._id,
                email: res.data.email,
                name: res.data.name,
                photo: res.data.photo,
                role: res.data.role,
            }

            dispatch(setUser({
                user
            }))
            toast.success('Login Successful !!!')
            navigate(location.state ? location.state : '/')
        } catch (error) {
            console.log(error);
            setError(error as string)
        } 
    }






    return (
        <div className=" ">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold">Login now!</h1>

                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    {
                        error && <div><p className="text-red-500 justify-center flex mt-3">Email or password invalid !!!</p></div>
                    }
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={() => toast.error('Sorry this feature is not available!')} className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <button className="btn bg-blue-500 text-white">Login</button>
                        </div>
                    </form>
                    <div className="mx-auto mb-5">
                        <p >Do not have an account? <Link className="font-extrabold text-blue-600" to='/signUp'>SignUp</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;