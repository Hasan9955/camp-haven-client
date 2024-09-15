import { Link, NavLink } from 'react-router-dom'  
import logo from '../assets/camp haven 02.png'


const Navbar = () => {

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/blog'>Blog</NavLink></li>
        <li><NavLink to='/shop'>Shop</NavLink></li>
        <li><a href="#about">About</a></li>
    </>

    const user = ''

const handleLogOut = () =>{
     
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

                        </div>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[10] menu  md:w-48 w-32 shadow bg-base-100 rounded-box py-2 ">
                        <li><NavLink to='/addFood'>Add Food</NavLink></li>
                        <li><NavLink to='/addedFood'>My Added Foods</NavLink></li>
                        <li><NavLink to='/cart'>My Cart</NavLink></li>
                    </ul>
                </div>
                <button onClick={handleLogOut} className='btn btn-xs md:btn-sm btn-warning md:ml-2'>Log Out</button>
                    </div> : <Link to='/login'><button  className='btn bg-blue-500 text-white md:ml-2'>Login</button></Link>
                }

                </div>
        </div>
    );
};

export default Navbar;