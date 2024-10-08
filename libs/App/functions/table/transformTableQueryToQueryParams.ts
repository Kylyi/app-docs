import dayjs from 'dayjs'

// Types
import type {
  ITableFilterGroup,
  ITableFilterItem,
  ITableQuery,
} from '~/components/Table/types/table-query.type'
import { ComparatorEnum } from '~/libs/App/enums/comparator.enum'

// Constants
// TODO: For some reason, i cannot use SELECTOR_COMPARATORS from config.dataTypes.selectorComparators
const SELECTOR_COMPARATORS = [ComparatorEnum.IN, ComparatorEnum.NOT_IN]

/**
 * Serializes the table's `filter` into a `filter` query parameter
 */
export function serializeFilterString(
  filters: ITableQuery['filters'] | ITableQuery['queryBuilder'],
): string {
  if (!filters?.length) {
    return ''
  }

  return filters
    .map(row => {
      if ((row as ITableFilterGroup).isGroup) {
        const group = row as ITableFilterGroup
        const condition = group.condition.toLowerCase()

        return `${condition}(${serializeFilterString(group.children)})`
      } else {
        const item = row as ITableFilterItem
        let val: string | number = item.value

        // Date
        if (dayjs.isDayjs(item.value)) {
          val = item.value.format('YYYY-MM-DD')
        }

        // Array
        if (Array.isArray(item.value)) {
          val = `(${item.value.join(',')})`
        }

        // Includes comma & is SELECTOR_COMPARATOR
        const isSelectorComparator = SELECTOR_COMPARATORS.includes(
          item.comparator,
        )

        if (
          typeof item.value === 'string'
          && item.value.includes(',')
          && isSelectorComparator
        ) {
          val = `(${item.value})`
        }

        return val !== undefined
          ? `[${item.filterField ?? item.field}].[${item.comparator}].[${val}]`
          : `[${item.filterField ?? item.field}].[${item.comparator}]`
      }
    })
    .join(',')
}

/**
 * Serializes the table's `orderBy`
 */
export function serializeOrderByString(
  orderBy: ITableQuery['orderBy'],
): string {
  if (!orderBy) {
    return ''
  }

  const orderByString = orderBy
    .map(sort => {
      return `${sort.field}.${sort.direction}`
    })
    .join(',')

  return orderByString
}

/**
 * Serializes the table's `select` into a `select` query parameter.
 */
export function serializeSelectString(select: ITableQuery['select']): string {
  if (!select) {
    return ''
  }

  return select.join(',')
}

export function serializeTableQueryToQueryParams(tableQuery: ITableQuery) {
  const { orderBy, select, queryBuilder, columnFilters, search, skip, take }
    = tableQuery

  const urlParams = new URLSearchParams()

  // Query builder
  const qb = serializeFilterString(queryBuilder)

  if (qb) {
    urlParams.append('qb', qb)
  }

  // Column filters
  const filters = serializeFilterString(columnFilters)

  if (filters) {
    urlParams.append('filters', filters)
  }

  // Sorting
  const order = serializeOrderByString(orderBy)

  if (order) {
    urlParams.append('order', order)
  }

  // Visible columns + sorted columns
  if (select?.length) {
    urlParams.append('select', serializeSelectString(select))
  }

  // Pagination
  if (skip) {
    urlParams.append('skip', skip.toString())
  }

  if (take) {
    urlParams.append('take', take.toString())
  }

  // Search
  if (search) {
    urlParams.append('search', search)
  }

  return urlParams
}
