import moment, { Duration, Moment } from 'moment'

type DateBlock = [Moment, Moment]
export const ONE_DAY = moment.duration(1, 'day')
export const TEN_DAYS = moment.duration(10, 'days')
export const PLAID_DATE_FORMAT = 'YYYY-MM-DD'

/** Takes a moment-date range and converts it into a set of DateBlocks,
 *  start-end tuples that represent the input range split into specified
 *  intervals
 */
const createDateBlocksFromRange = (
  startDate: Moment,
  endDate: Moment,
  duration: Duration
): DateBlock[] => {
  startDate = startDate.startOf('day')
  endDate = endDate.startOf('day')

  // a little extra cushion to prefer an 11 day range over a 10day and 1day pair
  if (
    moment(endDate)
      .subtract(duration)
      .subtract(ONE_DAY)
      .isBefore(startDate)
  ) {
    return [[startDate, endDate]]
  } else {
    const dateBlocks: DateBlock[] = []
    let end = endDate
    let start = moment(endDate).subtract(duration)

    while (start.isAfter(startDate)) {
      dateBlocks.push([start, end])
      end = moment(start).subtract(ONE_DAY)
      start = moment(start).subtract(duration)
    }

    dateBlocks.push([startDate, moment.max(end, startDate)])
    return dateBlocks
  }
}

export { createDateBlocksFromRange }
