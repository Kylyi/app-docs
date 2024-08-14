export type IOperation = {
  id: string
  method: string
  endpoint: string
  date: Datetime
  duration: number
  by?: string
  authorId?: number
  payload?: any
  baseUrl?: string
  requestBody?: any
  results: {
    error: number
    success: number
    warning: number
  }

  /**
   * Simple string must be used, it will be translated inside the component
   * -> do NOT use $t() here
   */
  operationName?: string

  /**
   * The entity name -> to eventually link the operation to some entity page (like user, product, etc.)
   */
  entityName?: string

  /**
   * The entity key -> some entities may have other unique identifiers than `id`
   */
  entityKey?: string

  /**
   * Resolved errors
   */
  errors?: string[]

  /**
   * Resolved warnings
   */
  warnings?: string[]
}
