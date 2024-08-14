export type DataType =
  // String
  | 'string'

  // Number
  | 'number'
  | 'percent'
  | 'int'
  | 'long'
  | 'double'

  // Currency
  | 'currency'

  // Duration
  | 'duration'

  // Date
  | 'date'
  | 'datetime'
  | 'yearMonth'
  | 'timestamp'
  | 'DateTime'
  | 'fullDateTime'

  // Boolean
  | 'boolean'
  | 'bool'

  // Custom
  | 'time'
  | 'custom'
  | 'enum'
  | 'numberArray' // Use-case: relations where multiple values can be selected, for example `tags.id`
  | 'stringArray' // Use-case: relations where multiple values can be selected, for example `tags.name`

type SimpleDataType = `${DataType}Simple`

export type ExtendedDataType = DataType | SimpleDataType
