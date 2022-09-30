const currencyEl_one = document.querySelector('#currency-one');
const currencyEl_two = document.querySelector('#currency-two');
const swap = document.querySelector('#swap');
const amountOne = document.querySelector('#amount-one');
const amountTwo = document.querySelector('#amount-two');
const rateEl = document.querySelector('#rate');

// Fetch exchange rates and update the DOM

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://open.er-api.com/v6/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two].toFixed(2);
      rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
}

// Event listeners

currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
