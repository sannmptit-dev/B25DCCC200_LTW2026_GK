import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>Không tải được dữ liệu</p>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Layout;
