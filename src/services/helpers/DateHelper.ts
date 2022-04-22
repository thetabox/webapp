import { sub } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

export const dayInUnix = (date: Date = new Date()) => zonedTimeToUtc(date, 'UTC').valueOf()
export const yesterday = (date: Date = new Date()) => zonedTimeToUtc(sub(date, { days: 1 }), 'UTC').valueOf()
