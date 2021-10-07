const getBanknotes = (amount, limits) => {
  const nominals = Object.keys(limits)
    .map((value) => Number.parseFloat(value))
    .sort((a, b) => b - a);

  return collect(amount, nominals, limits);
};

const collect = (amount, nominals, limits) => {
  if (amount === 0) return {};
  if (!nominals.length)
    return { remains: Number.parseFloat(amount.toFixed(2)) };

  let currentNominal = nominals[0];
  let availableBanknotes = limits[currentNominal];
  let banknotesNeeded = Math.floor(amount / currentNominal);
  let numberOfBanknotes = Math.min(availableBanknotes, banknotesNeeded);

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
};

export default getBanknotes;
