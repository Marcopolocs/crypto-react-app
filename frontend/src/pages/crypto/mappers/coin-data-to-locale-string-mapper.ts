export const mapCoinDataBasedOnLengthOfValue = (price: number | string | null): string => {
  if (price === null) {
    return 'Unknown';
  }

  if (typeof price === 'number') {
    switch (true) {
      case price >= 1000:
        return mapNumberToLocaleString(price, 0, 0);

      case price < 1000 && price >= 10:
        return mapNumberToLocaleString(price, 0, 2);

      case price < 10 && price > 0.1:
        return mapNumberToLocaleString(price, 0, 5);

      case price <= 0.1:
        return mapNumberToLocaleString(price, 0, 8);

      default:
        return price.toLocaleString();
    }
  }

  return price.toLocaleString();
};

const mapNumberToLocaleString = (number: number, minFraction: number, maxFraction: number): string => {
  return number.toLocaleString('en-US', { minimumFractionDigits: minFraction, maximumFractionDigits: maxFraction });
};
