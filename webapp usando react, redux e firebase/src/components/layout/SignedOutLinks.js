import  React  from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <ul className='right'>
            <li><NavLink to='/singup'>Sign Up</NavLink></li>
            <li><NavLink to='/singin'>Log in</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks;