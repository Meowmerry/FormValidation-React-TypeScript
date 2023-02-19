import React, { useState } from "react";
import { ValidationCreditCardProp } from "../types/ValidationProp";

const ValidateForm: React.FC = () => {
  const [formValues, setFormValues] = useState<ValidationCreditCardProp>({
    cardNumber: "",
    cardName: "",
    year: "",
    month: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<ValidationCreditCardProp>({
    cardNumber: "",
    cardName: "",
    year: "",
    month: "",
    cvv: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    const regCardNumber = /^\d{16}$/;
    const regCardName = /^[a-zA-Z]+$/
    const regYear = /^\d{4}$/;
    const regMonth = /^(01|02|03|04|05|06|07|08|09|10|11|12)$/;
    const regCVV = /^\d{3}$/;

    if (!formValues.cardNumber) {
      newErrors.cardNumber = "Card Number is required";
      valid = false;
    } else if (regCardNumber.test(String(formValues.cardName))) {
      newErrors.cardName = "Card Number is invalid";
      valid = false;
    }

    if (!formValues.cardName) {
      newErrors.cardName = "Card Name is required";
      valid = false;
    } else if (regCardName.test(String(formValues.cardName))) {
      newErrors.cardName = "Card Name is invalid";
      valid = false;
    }
    if (!formValues.year) {
      newErrors.year = "Year is required";
      valid = false;
    } else if (regYear.test(String(formValues.year))) {
      newErrors.year = "Year is invalid";
      valid = false;
    }
    if (!formValues.month) {
      newErrors.month = "Month is required";
      valid = false;
    } else if (regMonth.test(String(formValues.month))) {
      newErrors.month = "Month is invalid";
      valid = false;
    }
    if (!formValues.cvv) {
      newErrors.cvv = "cvv is required";
      valid = false;
    } else if (regCVV.test(String(formValues.cvv))) {
      newErrors.cvv = "cvv is invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // submit form
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="number"
          max={16}
          id="cardNumber"
          name="cardNumber"
          value={String(formValues.cardNumber)}
          onChange={handleChange}
        />
        {errors.cardNumber && (
          <span className="error">{errors.cardNumber}</span>
        )}
      </div>
      <div>
        <label htmlFor="cardName">Card Name:</label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={String(formValues.cardName)}
          onChange={handleChange}
        />
        {errors.cardName && <span className="error">{errors.cardName}</span>}
      </div>
      <div className="grid-container">
        <div className="grid-item-1">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={String(formValues.year)}
            onChange={handleChange}
          />
          {errors.year && <span className="error">{errors.year}</span>}
        </div>
        <div className="grid-item-2">
          <label htmlFor="month">Month:</label>
          <input
            type="text"
            id="month"
            name="month"
            value={String(formValues.month)}
            onChange={handleChange}
          />
          {errors.month && <span className="error">{errors.month}</span>}
        </div>
        <div className="grid-item">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={String(formValues.cvv)}
            onChange={handleChange}
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ValidateForm;
