const currencyFormat = (num?: number) => {
  if (!num) {
    return num;
  }
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
export { currencyFormat };
