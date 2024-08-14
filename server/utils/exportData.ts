import fs from 'node:fs'
import XLSX from 'xlsx'
import { get } from 'lodash-es'

// Types
import type { ExtendedDataType } from '~/libs/App/types/data-type.type'

XLSX.set_fs(fs)

// Utils
function parseValue(
  value: any,
  dataType?: ExtendedDataType,
  options?: {
    dateFormat?: string
  },
) {
  const { dateFormat } = options || {}

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

    case 'string':
    case 'time':
    default:
      return value
  }
}

export async function exportData(
  data: any[],
  columns: any[],
  options?: {
    format?: 'xlsx' | 'csv' | 'json'
    model?: string
  },
) {
  const { format, model } = options ?? {}

  const parsedData = data.map(row => {
    const rowData: Record<string, any> = {}

    columns.forEach(col => {
      let val = get(row, col.field)
      val
        = col.format?.(row, val)
        ?? parseValue(val, col.dataType, { dateFormat: 'YYYY-MM-DD HH:mm:ss' })

      const label = col.label || col.field

      rowData[label] = val
    })

    return rowData
  })

  const fileName = `${model ?? 'data'}-${$date().format('YYYY-MM-DD HH:mm:ss')}`
  let savePath = `${import.meta.env.FILES_PATH}/exports/`
  let filePath: string

  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath, { recursive: true })
  }

  // XLSX
  if (format === 'xlsx') {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(parsedData)
    XLSX.utils.book_append_sheet(wb, ws, 'Generated')

    savePath = `${savePath}${fileName}.xlsx`
    filePath = `/exports/${fileName}.xlsx`

    XLSX.writeFile(wb, savePath)
  }

  // CSV
  else if (format === 'csv') {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(parsedData)
    XLSX.utils.book_append_sheet(wb, ws, 'Generated')

    savePath = `${savePath}${fileName}.csv`
    filePath = `/exports/${fileName}.csv`

    XLSX.writeFile(wb, savePath)
  }

  // JSON
  else {
    savePath = `${savePath}${fileName}.json`
    filePath = `/exports/${fileName}.json`

    fs.writeFileSync(savePath, JSON.stringify(parsedData))
  }

  return { fileName, filePath }
}
