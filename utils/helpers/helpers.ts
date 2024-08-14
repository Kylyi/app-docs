import { isNil } from 'lodash-es'
import dayjs from 'dayjs'

export function isNumeric(value: any) {
  if (typeof value === 'string') {
    const num = Number.parseFloat(value)
    return (
      !Number.isNaN(num)
      && Number.isFinite(num)
      && num.toString() === value.trim()
    )
  } else if (typeof value === 'number') {
    return !Number.isNaN(value) && Number.isFinite(value)
  } else {
    return false
  }
}

export function isValidDate(value: any) {
  if (
    value instanceof Date
    || (typeof value === 'object' && value instanceof dayjs.Dayjs)
  ) {
    // Check if it's a Date instance and valid
    return true
  } else if (typeof value === 'string' || typeof value === 'number') {
    // Try to parse strings and numbers
    const date = new Date(value)
    return !Number.isNaN(date.getTime())
  }
  // Return false for other types
  return false
}

export function isBooleanLike(value: any) {
  if (typeof value === 'boolean') {
    return true
  } else if (typeof value === 'string') {
    const lowerCaseValue = value.toLowerCase().trim()
    return lowerCaseValue === 'true' || lowerCaseValue === 'false'
  }
  return false
}

/**
 * Will parse value from string to the given data type
 */
export function parseValue(
  value: any,
  dataType?: ExtendedDataType,
  options?: {
    dateFormat?: string
    predictDataType?: PredictDataTypeOptions
  },
) {
  const { dateFormat, predictDataType: _predictDataType } = options || {}

  if (!dataType && _predictDataType) {
    const predictedDataType = predictDataType(_predictDataType)

    dataType = predictedDataType
  }

  dataType = dataType?.replace(/Simple$/, '') as ExtendedDataType

  if (isNil(value)) {
    return value
  }

  switch (dataType) {
    case 'number':
    case 'percent':
      return Number(value)

    case 'date':
    case 'datetime':
    case 'timestamp':
    case 'yearMonth':
      return dateFormat ? $date(value).format(dateFormat) : $date(value)

    case 'boolean':
      if (typeof value === 'boolean') {
        return value
      } else if (value === 'true') {
        return true
      } else if (value === 'false') {
        return false
      } else if (value === 'null') {
        return null
      }

      return

    case 'numberArray':
      if (Array.isArray(value)) {
        return value.map(Number)
      } else {
        return Number(value)
      }

    case 'string':
    case 'time':
    default:
      return value
  }
}
