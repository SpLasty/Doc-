import React from "react";
import "../Layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import {Badge} from 'antd';


function Layout({ children }) {
  const [collapse, setCollapse] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Home",
      link: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      link: "/appointments",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Apply",
      link: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      link: "/profile",
      icon: "ri-user-line",
    },
  
  ];

  const adminMenu = [
    {
      name: "Home",
      link: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      link: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      link: "/admin/doctorslist",
      icon: "ri-shield-user-line",
    },
    {
      name: "Profile",
      link: "/profile",
      icon: "ri-user-line",
    },
  ];


  const doctorMenu = [
    {
      name: "Home",
      link: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      link: "/appointments",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Profile",
      // With the  help of user.id we fetch the doctor details
      link: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : menu;
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">Doc+</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.link;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapse && <Link to={menu.link}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`} onClick = {() => {
                localStorage.removeItem('token')
                navigate('/login')
              }}
            >
              <i className='ri-logout-circle-r-line'></i>
              {!collapse && <Link to = '/login' >Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapse ? (
              <i
                className="ri-menu-2-fill header-icon"
                onClick={() => setCollapse(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-icon"
                onClick={() => setCollapse(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge count={user?.unseenNotifications.length} onClick = {() => navigate('/notifications')}>
              <i className="ri-notification-line header-icon px-3"></i>
              </Badge>
              <Link className="anchor mx-3" to="/profile" >
                {user?.username}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
