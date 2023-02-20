import React, { useState } from "react";
import {
  FormDataProps,
  ValidationCreditCardProp,
} from "../types/ValidationProp";

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
    const regexCardNo = /^\d{16}$/;
    const regCardName = /^[a-zA-Z ]*$/;
    const regYear = /(?:(?:20|21)[0-9]{2})/; //  4 Digit Year (1800-2100) -->/(?:(?:18|19|20|21)[0-9]{2})/
    const regMonth = /^(0[1-9]|1[0-2])$/; // /^(01|02|03|04|05|06|07|08|09|10|11|12)$/i;
    const regCVV = /^\d{3}$/;

    if (!formValues.cardNumber) {
      newErrors.cardNumber = "Card Number is required";
      valid = false;
    } else if (
      !regexCardNo.test(String(formValues.cardNumber)) ||
      String(formValues.cardNumber).length !== 16
    ) {
      newErrors.cardNumber = "Card Number is invalid (16 digits only)";
      valid = false;
    }

    if (!formValues.cardName) {
      newErrors.cardName = "Card Name is required";
      valid = false;
    } else if (!regCardName.test(String(formValues.cardName))) {
      newErrors.cardName = "Card Name is invalid (letter only)";
      valid = false;
    }
    if (!formValues.year) {
      newErrors.year = "Year is required";
      valid = false;
    } else if (
      !regYear.test(String(formValues.year)) ||
      String(formValues.year).length !== 4
    ) {
      newErrors.year = "Year is invalid (year (2000-2100))";
      valid = false;
    }
    if (!formValues.month) {
      newErrors.month = "Month is required";
      valid = false;
    } else if (
      !regMonth.test(String(formValues.month)) ||
      String(formValues.month).length !== 2
    ) {
      newErrors.month = "Month is invalid (month 2 digits)";
      valid = false;
    }
    if (!formValues.cvv) {
      newErrors.cvv = "cvv is required";
      valid = false;
    } else if (
      !regCVV.test(String(formValues.cvv)) ||
      String(formValues.cvv).length !== 3
    ) {
      newErrors.cvv = "cvv is invalid (3 digits)";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("value-->", formValues);

    if (validateForm()) {
      const data: FormDataProps = {
        cardNumber: Number(formValues.cardNumber),
        cardName: formValues.cardName,
        year: Number(formValues.year),
        month: Number(formValues.month),
        cvv: Number(formValues.cvv),
      };
      // submit to data backend
      alert(JSON.stringify(data));
    } else if (errors) {
      console.log("Error! ", errors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log('value-->', valuse)
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="number"
          maxLength={16}
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
            maxLength={4}
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
            type="number"
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
            maxLength={3}
            type="number"
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
