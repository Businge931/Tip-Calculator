import React from "react";
import classes from "./App.module.css";
import CustomInput from "./components/Input/CustomInput";
import Button from "./components/Button/Button";

import { useState } from "react";

const App = () => {
  const initialTip = "0.00";

  const [bill, setBill] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [tipAmount, setTipAmount] = useState(initialTip);
  const [totalAmount, setTotalAmount] = useState(initialTip);
  const [customTip, setCustomTip] = useState();
  const [error, setError] = useState("");

  const billHandler = (e) => {
    setBill(e.target.value);
  };

  const numberOfPeopleHandler = (e) => {
    setNumberOfPeople(e.target.value);
  };
  const billEror = !bill || bill < 0;
  const numberOfPersonsError = numberOfPeople <= 0;
  // const stringError = typeof numberOfPeople !== "number";

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (billEror || numberOfPersonsError) {
      setError(
        // numberOfPersonsError
        //   ? "Can not be zero"
        //   : stringError
        //   ? "Should be a number"
        //   : null
        "Can not be zero"
      );
    }
  };

  const calculations = (theTip) => {
    const tip = theTip * +bill;
    const tipPerPerson = tip / numberOfPeople;
    setTipAmount(tipPerPerson.toFixed(2));
    const personalTotalAmount = bill / numberOfPeople + tipPerPerson;
    setTotalAmount(personalTotalAmount.toFixed(2));
  };

  const tipByFivePercent = () => {
    calculations(0.05);
  };
  const tipByTenPercent = () => {
    calculations(0.1);
  };
  const tipByFifteenPercent = () => {
    calculations(0.15);
  };
  const tipByTwentyfivePercent = () => {
    calculations(0.25);
  };
  const tipByFiftyPercent = () => {
    calculations(0.5);
  };

  const customTipHandler = (e) => {
    const enteredTip = +e.target.value;
    if (enteredTip < 0) {
      setError(showError);
      return;
    }

    setCustomTip(+enteredTip);
    calculations(+enteredTip / 100);
  };

  const resetHandler = () => {
    setNumberOfPeople("");
    setTipAmount("0.00");
    setTotalAmount("0.00");
    setBill("");
  };

  let showError = <p className={classes.error}>Invalid Inputs!!</p>;

  return (
    <div className={classes.app}>
      <h1 className={classes.h1}>
        spli
        <br />
        tter
      </h1>
      <div className={classes.app_container}>
        <div className={classes.app_container__left}>
          <form onSubmit={formSubmitHandler}>
            <CustomInput
              error={billEror && error}
              value={bill}
              onChange={billHandler}
              dollar
            />
            <p className={classes.selectTip}>Select Tip %</p>
            <nav className={classes.tip_buttons}>
              <Button type="submit" onClick={tipByFivePercent}>
                5%
              </Button>
              <Button type="submit" onClick={tipByTenPercent}>
                10%
              </Button>
              <Button type="submit" onClick={tipByFifteenPercent}>
                15%
              </Button>
              <Button type="submit" onClick={tipByTwentyfivePercent}>
                25%
              </Button>
              <Button type="submit" onClick={tipByFiftyPercent}>
                50%
              </Button>
              <CustomInput
                isLabelNecessary
                placeholder="CUSTOM"
                onChange={customTipHandler}
                value={customTip}
                error={error}
              />
            </nav>
            <div className={classes.label_error}>
              <label className={classes.label}>Number of people</label>
              <p>{numberOfPersonsError && error}</p>
            </div>
            <CustomInput
              isLabelNecessary
              value={numberOfPeople}
              onChange={numberOfPeopleHandler}
              error={numberOfPersonsError && error}
              icon
            />
          </form>
        </div>

        {/* Right Container */}

        <div className={classes.app_container__right}>
          <div className={classes.tip_amount}>
            <div className={classes.tip}>
              <h3>Tip Amount</h3>
              <p>/ person</p>
            </div>
            <p className={classes.tip_tag}>
              {!error && <span>$</span>}
              {error ? showError : tipAmount}
            </p>
          </div>
          <div className={classes.tip_total}>
            <div className={classes.tip}>
              <h3> Total</h3>
              <p>/ person</p>
            </div>
            <p className={classes.tip_tag}>
              {!error && <span>$</span>}
              {error ? showError : totalAmount}
            </p>
          </div>
          <button className={classes.button} onClick={resetHandler}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
