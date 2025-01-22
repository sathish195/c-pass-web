import { useState } from "react";
import axios from "axios";
import helpers from "../../crypto";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const apiEndpoint = import.meta.env.VITE_API_URL;

const Login = () => {
  const [phone_number, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const ph = "63" + phone_number;
    console.log(phone_number, "----------------<>----------------------");

    try {
      const payload = {
        enc: helpers.encryptobj({
          phone_number: ph,
          captcha: "namedrfiojrdfjiojvgdiogjdiofg",
          current_access_ip: "196.12.41.218",
        }),
      };

      const response = await axios.post(apiEndpoint + "/admin/login", payload);
      const dRes = helpers.decryptobj(response.data);
      console.log(dRes.success);

      if (dRes.success === "OTP sent Successfully.") {
        toast.success("OTP sent successfully!");
        console.log("data");
        // Navigate to OTP verification page with phone_number as prop
        navigate("/otpverify", { state: { phone_number: ph } });

        // Show success message using toast
      } else {
        // Show error message using toast
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Show error message using toast
      toast.error(error.response.data);
    }
  };

  return (
    <div className = "d-flex justify-content-center align-items-center">
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign In</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    className="form-control"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Sign In
                </button>
              </form>
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
    </div>
  );
};

export default Login;
