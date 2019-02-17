import React from 'react';
import {NavLink} from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <NavLink exact to='/'>welcome to React</NavLink> |&nbsp;
                <NavLink to='/Game'>Tic-tac-toe</NavLink> |&nbsp;
                <NavLink to='/Redirect'>Redirect to home</NavLink> |&nbsp;
                <NavLink to='/Tecent'>Tecent Q</NavLink> |&nbsp;
                <NavLink to='/404'>404</NavLink>
            </div>
        );
    }
}

// const NavBar = () =>(
// <div>
// <div>
//     <NavLink exact to='/'>welcome to React</NavLink> |&nbsp;
//     <NavLink to='/Tic'>Tic-tac-toe</NavLink>
// </div>
// </div>
// )

export default NavBar;