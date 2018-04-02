import accounting from 'accounting-js'

accounting.settings.format = {
  pos: '%s %v', // for positive values, eg. "$ 1.00" (required)
  neg: '%s (%v)', // for negative values, eg. "$ (1.00)" [optional]
  zero: '%s  - ', // for zero values, eg. "$  --" [optional]
}

/** Formats a transaction amount for display.
 *  Since transactions are recorded by their 'cost', this inverts their amount.
 */
export function formatTransactionAmount(amount: number): string {
  return (amount < 0 ? '+' : '') + accounting.formatMoney(-1 * amount)
}
