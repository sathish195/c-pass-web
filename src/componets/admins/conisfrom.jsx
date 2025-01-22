import { useState } from "react";

const CoinsForm = () => {
  // Initialize newcoin for the form inputs
  const [coin, setCoin] = useState({
    coin_name: '',
    ticker: '',
    otc_min: 0,
    otc_max: 0,
    withdraw_min: 0,
    withdraw_max: 0,
    text: '',
    precision: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', coin);
    // You can add your form submission logic here, e.g., sending data to an API
  };

  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Coin
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Coin</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Form inside the modal */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="coin_name" className="form-label">Coin Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="coin_name"
                    name="coin_name"
                    value={coin.coin_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ticker" className="form-label">Ticker</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ticker"
                    name="ticker"
                    value={coin.ticker}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="otc_min" className="form-label">OTC Min</label>
                  <input
                    type="number"
                    className="form-control"
                    id="otc_min"
                    name="otc_min"
                    value={coin.otc_min}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="otc_max" className="form-label">OTC Max</label>
                  <input
                    type="number"
                    className="form-control"
                    id="otc_max"
                    name="otc_max"
                    value={coin.otc_max}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="withdraw_min" className="form-label">Withdraw Min</label>
                  <input
                    type="number"
                    className="form-control"
                    id="withdraw_min"
                    name="withdraw_min"
                    value={coin.withdraw_min}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="withdraw_max" className="form-label">Withdraw Max</label>
                  <input
                    type="number"
                    className="form-control"
                    id="withdraw_max"
                    name="withdraw_max"
                    value={coin.withdraw_max}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Text</label>
                  <textarea
                    className="form-control"
                    id="text"
                    name="text"
                    value={coin.text}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="precision" className="form-label">Precision</label>
                  <input
                    type="text"
                    className="form-control"
                    id="precision"
                    name="precision"
                    value={coin.precision}
                    onChange={handleChange}
                  />
                </div>
                {/* Add more form fields as needed */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinsForm;
