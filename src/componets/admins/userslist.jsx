import { useState, useEffect } from "react";
import axios from "axios";
import helpers from "../../crypto";
import { useDispatch } from "react-redux";
import { callData } from "../../redux/reducers/adminsslice";
import { useSelector } from 'react-redux';
// import { userUserContext } from "../contexts/UserContext";
// import { useAppContext } from "../contexts/AppContext";
// import { useNavigate } from "react-router-dom";


// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
// 
const UsersList = () => {
//   const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
//   const [search,setSearch] = useState("")
  const dispatch = useDispatch();

//   const user = useSelector((state) => state.adminData);
  const user = useSelector((state) => state.adminData);
  console.log(user,"len");
  console.log(user.length,"======------->");

  const apiEndpoint = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  console.log(token,"token");

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/users_list`,
        { enc: helpers.encryptobj({ skip: user.length, limit: 10 }) },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const decryptedUsers = helpers.decryptobj(response.data);
      console.log(decryptedUsers,"de----->");
      // action only receive one parameter, which is payload
      // eslint-disable-next-line react-hooks/rules-of-hooks
      dispatch(callData(decryptedUsers));

    //   setUsers((prevUsers) => [...prevUsers, ...user]); // Append new users to existing users state

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  },[]);



  const handleLoadMore = () => {
    fetchUsers();
  };
  // eslint-disable-next-line no-unused-vars



  // const findUser = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${apiEndpoint}/user/find_user`,
  //       { enc: helpers.encryptobj({search : error.target.value }) },
  //       {
  //         headers: {
  //           Authorization: token,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const decryptedUsers = helpers.decryptobj(response.data);
  //     console.log(decryptedUsers,"de----->");
  //     // action only receive one parameter, which is payload
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     dispatch(callData(decryptedUsers));

  //   //   setUsers((prevUsers) => [...prevUsers, ...user]); // Append new users to existing users state

  //     setLoading(false);
  //   } catch (error) {
  //     setError("Failed to fetch users");
  //     setLoading(false);
  //   }
  // };




  
  if (loading && user.length === 0) {
    return <div className="d-flex justify-content-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

//   const { getHistory } = userUserContext()
//   const { history } = useAppContext()

//   const handleGetHistory = () => {
//     getHistory()
//   }

//   const navigate = useNavigate()

  return (
    <div className="container">
      {/* userslist */}
        {/* <button onClick={() => navigate("/controls")}>controls</button> */}
        {/* <button onClick={handleGetHistory}>get history</button> */}
        {/* { console.log("history -->", history) } */}
      {/* <div className="row"> */}
        <div className="d-flex align-items-center flex-column mt-5 mb-5"
        
        style={{
          position: 'absolute',
          top:"1%",
          // left:"16%",
          //  width:"70%"
      }}
        >
          <div className="d-flex align-items-center"
          >
            <h2>Users List</h2>
            <div>
                <input type="text" 
            //   onChange={(e) => setSearch(e.target.value)}
/>
              {/* <button></button> */}
              {/* <button type="button" className="btn btn-primary" onClick={singleUser}>search</button> */}
            </div>
          </div>
          {/* <div className='d-flex'> */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  User ID
                </th>
                <th scope="col" className="text-center">
                  Name
                </th>
                <th scope="col" className="text-center">
                  Email
                </th>
                <th scope="col" className="text-center">
                  Phone
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user.id}>
                  <td className="text-center">{user.user_id}</td>
                  <td className="text-center">{user.member_name}</td>
                  <td className="text-center">{user.member_email}</td>
                  <td className="text-center">{user.phone_number}</td>
                  <td className="text-center">{user.user_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* </div> */}
          <button
            className="btn btn-primary d-flex justify-content-center"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      </div>
    // </div>
  );
};

export default UsersList;
