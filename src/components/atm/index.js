import React, { useState, useEffect } from "react";
import Numpad from "../numpad";

import "./Atm.scss";
import getBanknotes from "../../services/ATMfunction";
import Input from "../common/Input";
import Button from "../common/Button";
import { langRu } from "../../services/language";
import Select from "../common/Select";
import { limits } from "../../services/limits";

function ATM() {
  const [amount, setAmount] = useState("");
  const [sum, setSum] = useState(0);
  const [outputLimit, setLimitOutput] = useState(limits[0]);
  const [limit, setLimit] = useState(limits[0] || []);
  const [result, setResult] = useState(null);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") {
        onSubmit();
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [result, amount, limit]);

  useEffect(() => {
    setAmount("");
    setResult(null);
  }, [outputLimit]);

  function onSubmit() {
    console.log("amount", amount, "limit", limit, "result", result);

    if (!amount) {
      setErrorText("Пожалуйста впишите в поле сумму");
      return;
    }

    const banknotes = getBanknotes(amount, limit.value);
    if (banknotes.remains > 50) {
      setErrorText("Банкомат не может выдать заданную сумму");
      return;
    }
    setErrorText("");
    setSum(Number.parseFloat(sum) + Number.parseFloat(amount));

    let resultCopy = Object.assign({}, result);

    if (result) {
      for (const key in banknotes) {
        if (!resultCopy.hasOwnProperty(key)) {
          resultCopy[key] = banknotes[key];
          continue;
        }

        if (resultCopy.hasOwnProperty(key)) {
          resultCopy[key] += banknotes[key];
        }
      }

      setResult(resultCopy);
    } else setResult(banknotes);

    let limitCopy = Object.assign({}, limit.value);

    for (const key in limitCopy) {
      if (banknotes.hasOwnProperty(key)) {
        limitCopy[key] = limitCopy[key] - banknotes[key];
      }
    }

    setLimit({ ...limit, value: limitCopy });
  }

  function error(text) {
    return <div className="atm__error">{text}</div>;
  }

  return (
    <div className="atm">
      <div className="atm__limits">
        <h3 className="atm__header">Оставшиеся купюры</h3>
        <ul className="atm__list">
          <li className="atm__item atm__header">
            <span>Номинал</span> <span>Количество</span>
          </li>
          {Object.keys(limit?.value).map((value) => (
            <li className="atm__item" key={value}>
              <span>{value}</span> <span>{limit?.value[value]}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="atm__main">
        <Select
          options={limits}
          setSelected={(attr) => {
            setLimit(attr);
            setLimitOutput(attr);
          }}
          selected={limit}
          name="key"
          value={""}
        />

        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Введите сумму"
        />

        <Numpad value={amount} setValue={setAmount} />

        <Button onClick={() => onSubmit(amount)} autofocus>
          Выдать
        </Button>

        {errorText && error(errorText)}
      </div>

      <div className="atm__result">
        <h3 className="atm__header">Выданная сумма: {sum}</h3>
        <h3 className="atm__header">Выданные купюры</h3>
        <ul className="atm__list">
          <li className="atm__item atm__header">
            <span>Номинал</span> <span>Количество</span>
          </li>
          {result &&
            Object.keys(result).map((value) => (
              <li className="atm__item" key={value}>
                <span>{langRu[value] || value}</span>{" "}
                <span>{result[value]}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ATM;
