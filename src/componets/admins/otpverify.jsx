/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import {  useState } from "react";
import axios from "axios";
import helpers from "../../crypto";
import { useNavigate } from 'react-router-dom';

import "./login.css";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';




const apiEndpoint = import.meta.env.VITE_API_URL;

const Login = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const phone_number = location.state ? location.state.phone_number : "";
  const navigate = useNavigate(); // Uncommented for navigation

  const handleLogin = async (event) => {
    event.preventDefault(); 
    console.log(phone_number, "phn");

    try {
      const payload = {
        enc: helpers.encryptobj({
          phone_number: phone_number,
          otp: otp,
          fcm_token: "namedrfiojrdfjiojvgdiogjdiofg",
          current_access_ip: "196.12.41.218",
        }),
      };

      const response = await axios.post(apiEndpoint + "/admin/otp_verify", payload);
      console.log(response);
      
      // Store decrypted response in local storage
      localStorage.setItem("token", response.data);
      toast.success("Login successful");
      // Navigate to another route after successful login
      navigate('/');

    } catch (error) {
      console.error("Login error:", error.response.data);
      toast.error(error.response.data); 
      setError("Failed to login");
    }
  };

  const resendOtp = async () => {
    try {
      const payload = {
        enc: helpers.encryptobj({
          phone_number: phone_number,
          key: "login",
        }),
      };

      const response = await axios.post(apiEndpoint + "/admin/sent_otp", payload);
    
      console.log("Resend OTP response:",helpers.decryptobj(response.data));
      toast.error(helpers.decryptobj(response.data)); 

    } catch (error) {
      toast.error(error.response.data); 
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign In</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="otp">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={resendOtp}
                  className="btn btn-secondary mt-3 ml-2"
                >
                  Resend OTP
                </button>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
        
          <ToastContainer 
        position="top-center" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default Login;
