/* eslint-disable react/jsx-no-undef */
// import { Link Navlink } from 'react-router-dom';
import { Link, NavLink } from "react-router-dom";

// import UsersList from './userslist';

const Sidebar = () => {
  console.log("saidbar");
  return (
    <div className>
      <div
        className="sidebar bg-light border-end"
        style={{ width: "250px", height: "100vh" ,  }}
      >
        <div className="sidebar-header p-3 border-bottom">
          <h5 className="mb-0">C-Pass Admin</h5>
        </div>
        <div className="sidebar-body p-3">
          <div className="sidebar-content">
            {/* Example image; replace path-to-image.jpg with your actual image path */}
            <img
              src="path-to-image.jpg"
              alt="Example"
              className="img-fluid mb-3"
            />
            <ul className="list-unstyled">
              <li className="mb-2">
                {/* <Link to="/userslist">
                   Users List
                </Link> */}

                <NavLink
                  to="/userslist"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  UsersList
                </NavLink>
                {/* <NavLink
                to="/userslist">
                <span>UsersList</span>
              </NavLink> */}
              </li>
              <li className="mb-2">
                <Link to="/controls">Controls</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
            className="content flex-fill p-3"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}
        >
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
