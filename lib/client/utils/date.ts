import moment, { Moment } from 'moment'

export function isCurrentYear(date: Moment): boolean {
  date = moment(date)
  return date.isSameOrAfter(moment().startOf('year'))
}
