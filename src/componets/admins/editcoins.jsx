/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

const EditcoinsForm = ({ coin }) => {
  // const controls = useSelector((state) => state.controls);

  // Initialize state for the form inputs
  const [coinData, setCoinData] = useState({
    coin_name: '',
    ticker: '',
    otc_min: 0,
    otc_max: 0,
    withdraw_min: 0,
    withdraw_max: 0,
    text: '',
    precision: ''
  });

  // Update form state when coin prop changes
  useEffect(() => {
    setCoinData({
      coin_name: coin.coin_name || '',
      ticker: coin.ticker || '',
      otc_min: coin.otc_min || 0,
      otc_max: coin.otc_max || 0,
      withdraw_min: coin.withdraw_min || 0,
      withdraw_max: coin.withdraw_max || 0,
      text: coin.text || '',
      precision: coin.precision || ''
    });
  }, [coin]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoinData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Validate form data
  const validateForm = () => {
    let isValid = true;
    let errors = [];

    // Check for required fields
    if (!coinData.coin_name) {
      isValid = false;
      errors.push('Coin Name is required.');
    }
    if (!coinData.ticker) {
      isValid = false;
      errors.push('Ticker is required.');
    }
    if (isNaN(coinData.otc_min) || coinData.otc_min < 0) {
      isValid = false;
      errors.push('OTC Min must be a non-negative number.');
    }
    if (isNaN(coinData.otc_max) || coinData.otc_max < coinData.otc_min) {
      isValid = false;
      errors.push('OTC Max must be a number greater than OTC Min.');
    }
    if (isNaN(coinData.withdraw_min) || coinData.withdraw_min < 0) {
      isValid = false;
      errors.push('Withdraw Min must be a non-negative number.');
    }
    if (isNaN(coinData.withdraw_max) || coinData.withdraw_max < coinData.withdraw_min) {
      isValid = false;
      errors.push('Withdraw Max must be a number greater than Withdraw Min.');
    }
    if (isNaN(coinData.precision)) {
      isValid = false;
      errors.push('Precision must be a number.');
    }

    // Display errors
    if (!isValid) {
      alert(errors.join('\n'));
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data submitted:', coinData);
      // Add your form submission logic here, e.g., sending data to an API
    }
  };

  console.log("coin -->", coin)
  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Coin
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
              <h5 className="modal-title" id="exampleModalLabel">Edit Coin</h5>
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
                    value={coinData.coin_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ticker" className="form-label">Ticker</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ticker"
                    name="ticker"
                    value={coinData.ticker}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="otc_min" className="form-label">OTC Min</label>
                  <input
                    type="number"
                    className="form-control"
                    id="otc_min"
                    name="otc_min"
                    value={coinData.otc_min}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="otc_max" className="form-label">OTC Max</label>
                  <input
                    type="number"
                    className="form-control"
                    id="otc_max"
                    name="otc_max"
                    value={coinData.otc_max}
                    onChange={handleChange}
                    min={coinData.otc_min}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="withdraw_min" className="form-label">Withdraw Min</label>
                  <input
                    type="number"
                    className="form-control"
                    id="withdraw_min"
                    name="withdraw_min"
                    value={coinData.withdraw_min}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="withdraw_max" className="form-label">Withdraw Max</label>
                  <input
                    type="number"
                    className="form-control"
                    id="withdraw_max"
                    name="withdraw_max"
                    value={coinData.withdraw_max}
                    onChange={handleChange}
                    min={coinData.withdraw_min}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="text"
                    name="text"
                    value={coinData.text}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="precision" className="form-label">Precision</label>
                  <input
                    type="number"
                    className="form-control"
                    id="precision"
                    name="precision"
                    value={coinData.precision}
                    onChange={handleChange}
                    required
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

export default EditcoinsForm;
