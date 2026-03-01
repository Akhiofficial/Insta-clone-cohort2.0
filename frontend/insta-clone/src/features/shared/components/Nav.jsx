import React from 'react'
import "../nav.scss"
import { useNavigate, useLocation } from 'react-router'
import { Home, Search, Compass, MessageCircle, Heart, PlusSquare, User, MoreHorizontal } from 'lucide-react'

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: <Home size={24} />, path: '/' },
    { name: 'Search', icon: <Search size={24} />, path: '/search' },
    { name: 'Explore', icon: <Compass size={24} />, path: '/explore' },
    { name: 'Messages', icon: <MessageCircle size={24} />, path: '/messages', badge: 3 },
    { name: 'Notifications', icon: <Heart size={24} />, path: '/notifications' },
    { name: 'Create', icon: <PlusSquare size={24} />, path: '/create-post' },
    { name: 'Profile', icon: <User size={24} />, path: '/profile' },
  ];

  return (
    <nav className='side-nav'>
      <div className="nav-top">
        <div className="logo" onClick={() => navigate('/')}>
          <span className="logo-icon">▲</span>
          <span className="logo-text">InstaNext</span>
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <div className="icon-wrapper">
                {item.icon}
                {item.badge && <span className="badge">{item.badge}</span>}
              </div>
              <span className="item-name">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-bottom">
        <div className="nav-item">
          <MoreHorizontal size={24} />
          <span className="item-name">More</span>
        </div>
      </div>
    </nav>
  )
}

export default Nav