/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import axios from "axios";
import helpers from "../../crypto";
import "./control.css";
import { useSelector, useDispatch } from "react-redux";
import { controlsData } from "../../redux/reducers/admincontrols";
import CoinsForm from "./conisfrom";
import Editcoin from "./editcoins";

const UsersList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [selectedCoin, setSelectedCoin] = useState(null);
  const colors = ["#f8d7da", "#d1ecf1", "#d4edda"];

  const apiEndpoint = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const controls = useSelector((state) => state.controls);
  console.log(controls.coins, "co-----ins");
  const t =`U2FsdGVkX1/hyJVGLbkLZYOey15ex++Cg/Gdrwto3S3HEwW59PgUsYicq6y066C+J8s8wFNGmux9aiGhELpzJwjYlgiuS4nxc0DGIAvKeUyBnT4GTRx6Szgkyhi0eUbClL7kMg5gLjNArMcfMxtyyMP5BsEsxT6Knqw2vFypZ/8yDg3Mmh+nOgV/pvEvjV8jcvkiSzaBzdvzqjcoXqd/7+jl/HuThoURM2JcbipGu+cQr0ISGELKos7Qy8pu5WeYhUukJvvRRDl4QiHv95vY0jnKSdqZ0//gpHyFjjhvlIt+4HUI4n4ubsT72cKTtK0LtRa0zWurPdXlFZBkhIcyI6f3X3Dn16m+yVNcprQab24YlROa594sGRUxyPagA33yqpcI9UCcPb5Y7dq/tR5VNUdZze3MAO6mtROSvcLii8WPilTXFsXtxCn9Qekh3OE77PJAtPfdoQOVFmzK61Tte/y61us0wHFpu6A/Mj+R8OlEz9J6CNyaz/vf4RYqH74GJzUpvTENqVTJpyTFkycODo4i5L1ZPOKFpLVQqLEa1zto/YqxPIkJBxfZGJrZ27NIE3/Ef5sXjDqoWhKo47CGmVZtuTGtigjwCfLViuNFy3ZWe3wuqyA2MohImyqvEP00/UMaMU3rz1+LaplGp3KRMDe2/sZ6HhZL66XJ4VB5WERZncLMkCH9IOTZ8KOkV0HLaVg/fNpC57K7wxJQzwtIezI4Xzyu6jnd5rYPiWr0WpY6q/M1pw3tQVoV1Zo4O76Hq4BxC2MbU/2VG8KdXKCMUw==`
  // eslint-disable-next-line no-unused-vars
  const check = async () => {
    console.log("hit-0000000");
    try {
      const responsecheck = await axios.post(
        `${apiEndpoint}/users/check_logs`,
        // { enc: helpers.encryptobj({search : error.target.value }) },
        {enc:
          `U2FsdGVkX1+gBsByrZR0IMlUNRp1uSu/EDsEVw+33fl1X6A1gZy8Pu7dSLvrMgVU8YMd5apiMZ96wBKrYHGASwX2LchCvRfhLkIsIC2F2S396aLLXV/Yva9I1PfbGT6QnN9zZvihyQifevOmEcypCOiTCt0gxe2NoltoqD15W0LEVLuXBereircYiMhY1T4DRiXcFPgTSq3eu5DoSkgIRQVQVLl8DDPLI+wyQR2lwoijhYJb3sAQMLZ/YyT05tzqcGkkeX+d1SK/5RO/u0wb67E+Q/aUBg2Dj9wL4MDaj2o3CzWdgQb8DLCDhqLA0Mhp5fYgm8byMtYvHD6PxhP6C+U6FeNTVtxPG8JKUPDvR8QQTmm6XnK/0nTW1yFmaxN8`
        },
        {
          headers: {
            Authorization: t,
            "Content-Type": "application/json",
          },
        }
      );
    console.log("hit-0000000");

      console.log(responsecheck,"res---errr-rrrrrr");
      const checkLOgs = helpers.decryptobj(responsecheck.data);
      console.log(checkLOgs,"de---sddcsdcdssd-->");
      // action only receive one parameter, which is payload
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // dispatch(callData(decryptedUsers));

    //   setUsers((prevUsers) => [...prevUsers, ...user]); // Append new users to existing users state

      setLoading(false);
    } catch (ex) {
    console.log("hit-0000000");

      console.log(ex.response.data,"errrorr");
      setError("Failed to fetch checklogsss");
      setLoading(false);
    }
  };
  const results = {
    API: controls.API,
    bills: controls.bills,
    card_deposit: controls.card_deposit,
    coins: controls.coins,
    crypto_address_gen: controls.crypto_address_gen, // Fixed property name
    crypto_withdraw: controls.crypto_withdraw,
    dragonpay: controls.dragonpay,
    eload: controls.eload,
    flair_deposit: controls.flair_deposit,
    login: controls.login,
    otc_service: controls.otc_service,
    peso_withdraw: controls.peso_withdraw,
    register: controls.register,
    transfer: controls.transfer,
    version: controls.version,
    withdraw: controls.withdraw,
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        `${apiEndpoint}/admin/get_controls`,
        {},
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const decryptedUsers = helpers.decryptobj(response.data);
      dispatch(controlsData(decryptedUsers));
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [apiEndpoint, token, dispatch]);

  if (loading) {
    return <div className="d-flex justify-content-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // eslint-disable-next-line no-unused-vars
  // const selectedData = (coin) => {
  //   setSelectedCoin(coin);
  //   console.log(selectedCoin, "selectedcoi");
  // };

  // const selectedData = useCallback((coin) => {
  //   // console.log('Selected coin:', coin);
  //   setSelectedCoin(coin);

  // }, []);
  return (
    <div className="container">
      <button onClick={check}>check</button>

      <div className="row justify-content-center">
        <div className="col-xl-6 mb-5">
          <h2 className="text-center mt-5 mb-3">Admin Controls</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Controls
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results).map(([key, value], index) => {
                // Determine the background color based on index
                const rowColor = colors[index % colors.length];

                return (
                  <tr key={key} style={{ backgroundColor: rowColor }}>
                    <td className="text-center">{key}</td>
                    <td className="text-center">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheckChecked-${index}`}
                          checked={value === "enable"} // Assume 'enable' indicates checked
                        />
                      </div>
                      {value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex ">
        <div>
          <div className="row justify-content-center">
            <div className="col-xl-12 mb-5">
              <h2 className="text-center mt-5 mb-3">Coins List</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      CoinName
                    </th>
                    <th scope="col" className="text-center">
                      CoinStatus
                    </th>
                    <th scope="col" className="text-center">
                      OTCMAX
                    </th>
                    <th scope="col" className="text-center">
                      OTCMIN
                    </th>
                    <th scope="col" className="text-center">
                      precision
                    </th>
                    <th scope="col" className="text-center">
                      text
                    </th>
                    <th scope="col" className="text-center">
                      Ticker
                    </th>
                    <th scope="col" className="text-center">
                      Withdrow
                    </th>
                    <th scope="col" className="text-center">
                      withdraw_max
                    </th>
                    <th scope="col" className="text-center">
                      withdraw_min
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {controls[0].coins.map((coin, index) => {
                    // Determine the background color based on index
                    const rowColor = colors[index % colors.length];

                    return (
                      <tr
                        key={coin.ticker}
                        style={{ backgroundColor: rowColor }}
                      >
                        <td className="text-center">{coin.coin_name}</td>
                        <td className="text-center">{coin.coin_status}</td>
                        <td className="text-center">{coin.otc_max}</td>
                        <td className="text-center">{coin.otc_min}</td>
                        <td className="text-center">{coin.precision}</td>
                        <td className="text-center">{coin.text}</td>
                        <td className="text-center">{coin.ticker}</td>
                        <td className="text-center">{coin.withdraw}</td>
                        <td className="text-center">{coin.withdraw_max}</td>
                        <td className="text-center">{coin.withdraw_min}</td>
                        <td>coins</td>
                        <td>
                          {console.log(coin,"coinddd")}
                          {/* <button onClick={() => selectedData(coin)}>
                       <Editcoin coin={selectedCoin} /> */}
                          {/* <button onClick={() => selectedData(coin)}>
                            Edit Coin
                          </button> */}
                          <Editcoin coin={()=>selectedData(coin)}/>
                        </td>
                        <td>
                          <button>Remove</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="mb-5">
                <CoinsForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
