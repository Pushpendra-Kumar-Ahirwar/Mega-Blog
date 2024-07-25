import React from 'react'
import { Container, LogoutButton, Logo } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MdFormatListBulleted } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [navVisible, setNavVisible] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: '/login',
      active: !authStatus
    },
    {
      name: "SignUp",
      slug: '/signup',
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: "Add Posts",
      slug: '/add-post',
      active: authStatus
    },
    {
      name: "About",
      slug: '/about',
      active: !authStatus
    },
  ]

  const navHandler = () => {
    setNavVisible(!navVisible);
  };

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex flex-col justify-evenly items-end md:flex md:flex-row md:justify-between md:items-center'>
              <div className='mr-4 hidden md:block'>BLOG</div>
      <button className='md:hidden text-3xl' onClick={navHandler}>
     {navVisible?<IoClose />:<MdFormatListBulleted />}
      </button>
      <ul className={`md:flex md:flex-row md:flex-wrap mt-auto justify-evenly items-center ${navVisible ? 'block' : 'hidden'} md:block`}>
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                onClick={() => navigate(item.slug)}>
                {item.name}
              </button>
            </li>
          ) : null
        )}

        {authStatus && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
      </Container>
    </header>
  )
}

export default Header
