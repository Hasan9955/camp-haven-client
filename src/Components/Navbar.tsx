import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/camp haven 02.png'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectCurrentUser, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/shop'>Shop</NavLink></li>
        <li><NavLink to='/cart'>Cart</NavLink></li>
        <li><a href="#about">About</a></li>
    </>

    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        dispatch(logout())
        toast.error('You are logged out!!!')
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link className='flex gap-3 justify-center items-center' to='/'>
                    <img className='w-16 h-14' src={logo} alt="logo" />
                    <p className='text-4xl font-bold capitalize'>C<span className='text-blue-500'>A</span>MP H<span className='text-blue-500'>A</span>VEN</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end">
                {
                    user ? <div className='flex items-center'>
                        <div className="dropdown dropdown-hover dropdown-end">
                            <label tabIndex={0} className="md:mx-2 btn btn-sm md:btn-md btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photo} alt='userImg' />
                                </div>
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[10] menu px-5 mt-3 shadow bg-base-100 rounded-box py-5 w-56">
                                <div className='flex flex-col justify-center items-center mb-4'>
                                    <label tabIndex={0} className="btn btn-circle avatar">
                                        <div className="w-16 rounded-full">
                                            <img src={user.photo} alt='userImg' />

                                        </div>
                                    </label>
                                    <h2 className='text-lg font-bold'>{user.name}</h2>
                                    <h2>{user.email}</h2>
                                    {/* <Link to='/dashboard/userProfile'>
                                        <button className="btn lg:btn-sm btn-xs bg-blue-500 hover:bg-blue-500 hover:border-blue-500 text-white mt-2">View Profile</button>
                                    </Link> */}
                                </div>
                                <li><NavLink to='/productManagement'>Manage Products</NavLink></li>
                                <li><button className='font-bold text-md text-blue-500' onClick={handleLogOut}>Logout <LuLogOut /></button></li>
                            </ul>
                        </div>
                    </div> : <Link to='/login'><button className='btn bg-blue-500 text-white md:ml-2'>Login</button></Link>
                }

            </div>
        </div>
    );
};

export default Navbar;