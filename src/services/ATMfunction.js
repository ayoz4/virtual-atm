const getBanknotes = (amount, limits) => {
  const nominals = Object.keys(limits)
    .map((value) => Number.parseFloat(value))
    .sort((a, b) => b - a);

  console.log(nominals);

  return collect(amount, nominals, limits);
};

const collect = (amount, nominals, limits) => {
  if (amount === 0) return {};
  if (!nominals.length) return { remains: amount };

  let currentNominal = nominals[0];
  let availableBanknotes = limits[currentNominal];
  let banknotesNeeded = Math.floor(amount / currentNominal);
  let numberOfBanknotes = Math.min(availableBanknotes, banknotesNeeded);

  // console.group();
  // console.log("currentNominal", currentNominal);
  // console.log("availableBanknotes", availableBanknotes);
  // console.log("banknotesNeeded", banknotesNeeded);
  // console.log("numberOfBanknotes", numberOfBanknotes);
  // console.groupEnd();

  for (let i = numberOfBanknotes; i >= 0; i--) {
    let result = collect(
      amount - i * currentNominal,
      nominals.slice(1),
      limits
    );

    if (result) {
      return i ? { [currentNominal]: i, ...result } : result;
    }
  }

  console.log("result", result, "numberOfBanknotes", numberOfBanknotes);
};

export default getBanknotes;
