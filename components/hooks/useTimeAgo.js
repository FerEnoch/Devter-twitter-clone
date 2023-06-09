import { useEffect, useState } from 'react'
import { DEFAULT_LANGUAGE } from '@/constants/locale'
import { formatDate, isDateTimeFormatSupported } from './useDateTimeFormat'

const DATE_UNITS = [ // in seconds
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDataDiffs = timestamp => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo (timestamp) {
  const [timeago, setTimeago] = useState(() => getDataDiffs(timestamp))

  useEffect(() => {
    if (isDateTimeFormatSupported) {
      const timeout = setInterval(() => {
        const newTimeAgo = getDataDiffs(timestamp)
        setTimeago(newTimeAgo)
      }, 30000)
      return () => clearInterval(timeout)
    }
  }, [timestamp])

  if (!isDateTimeFormatSupported) {
    return formatDate(timestamp)
  }

  const relativeTimeFormat = new Intl.RelativeTimeFormat(DEFAULT_LANGUAGE, { style: 'narrow' })

  const { value, unit } = timeago

  return relativeTimeFormat.format(value, unit)
}
