/**
 * Use this function to intialize responsive table handling.
 *
 * @module responsiveTable
 * @example
 * // import it in your Javascript file
 * import "path/to/responsiveTable.js"
 * @example
 * <!-- Use it on any table -->
 * <table class="responsive">
 *    <thead>
 *      <tr>
 *        <th>Col 1</th>
 *        <th>Col 2</th>
 *      </tr>
 *    </thead>
 *    <tbody>
 *      <tr>
 *        <td>Row 1</td>
 *        <td>Row 1</td>
 *      </tr>
 *      <tr>
 *        <td>Row 2</td>
 *        <td>Row 2</td>
 *      </tr>
 *    </tbody>
 * </table>
 */

export default (selector => {
  /** For each responsive table */
  Array.from(document.querySelectorAll(selector)).forEach(table => {
    let ths = Array.from(table.querySelectorAll("thead th"));
    let ths_value = [];

    ths.forEach(th => {
      let value =
        th.classList.contains("table-responsive-hide") ||
        th.textContent.trim() == ""
          ? ""
          : th.textContent.trim();
      ths_value.push(value);
    });

    Array.from(table.querySelectorAll("tbody tr", table)).forEach(tr => {
      Array.from(tr.querySelectorAll("td")).forEach((td, i) => {
        if (ths_value[i] != "") {
          td.setAttribute("data-header", ths_value[i]);
        }
      });
    });
  });
})("table.responsive");
