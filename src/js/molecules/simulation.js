/**
 * Init simulation event handling.
 *
 * @module simulation
 * @example
 * // import it in your Javascript file
 * import "path/to/simulation.js"
 * */

export default (({
  loss_rate,
  machine_price,
  elements
}) => {
  let $ = elements.reduce((r, s) => {
    r[s] = document.querySelector(`#${s}`);
    return r;
  }, {});
  let values = {
    'keg_volume': 20,
    'keg_number': null,
    'glasses_volume': 25,
    'avg_price': null,
  }
  let shouldShowResults = true
  let profitability_text = $.profitability.getAttribute('data-text');

  let handleClick = (e) => {
    e.preventDefault();
    if (shouldShowResults) {
      let loss_by_keg = loss_rate * values.keg_volume
      let keg_price = (values.keg_volume / (values.glasses_volume / 100)) * values.avg_price
      let liter_price = keg_price / values.keg_volume
      let lost_money_by_keg = loss_by_keg * liter_price
      let monthly_loss = lost_money_by_keg * values.keg_number

      let profitable = Math.floor(machine_price / monthly_loss) + 1

      $.view_1m.innerText = `${(monthly_loss).toFixed(2).replace('.',',')} €`;
      $.view_1y.innerText = `${(monthly_loss*12).toFixed(2).replace('.',',')} €`;
      $.view_3y.innerText = `${(monthly_loss*36).toFixed(2).replace('.',',')} €`;
      $.view_5y.innerText = `${(monthly_loss*60).toFixed(2).replace('.',',')} €`;
      $.view_10y.innerText = `${(monthly_loss*120).toFixed(2).replace('.',',')} €`;

      $.profitability.innerHTML = profitability_text.replace('%s', `<span class="fw-700">${profitable} mois</span>`);
      $.simulation_container.classList.add('show');
    } else {
      $.simulation_container.classList.remove('show');
      $.keg_number.focus();
    }
    shouldShowResults = !shouldShowResults;
    window.scrollBy({
      top: document.querySelector('#simulation').offsetTop - window.scrollY - document.querySelector('body > header').scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  $.simulation_container.addEventListener('submit', handleClick);
  $.simulation_toggle.addEventListener('click', handleClick);
  ['keg_volume', 'keg_number', 'glasses_volume', 'avg_price'].map(name => {
    $[name].addEventListener($[name].tagName === 'INPUT' ? 'keyup' : 'change', e => {
      values[name] = Number(e.target.value.replace(',', '.'));
      if (Object.keys(values).every(k => values[k])) {
        $.simulation_toggle.classList.remove('disabled');
      } else {
        $.simulation_toggle.classList.add('disabled');
      }
    })
  })
})({
  loss_rate: 0.2,
  machine_price: 2490,
  elements: [
    'keg_volume',
    'keg_number',
    'glasses_volume',
    'avg_price',
    'simulation_toggle',
    'view_1m',
    'view_1y',
    'view_3y',
    'view_5y',
    'view_10y',
    'profitability',
    'simulation_container'
  ]
});
