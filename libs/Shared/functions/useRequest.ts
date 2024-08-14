// @unocss-include
import { config } from '~/components/config/components-config'

// Types
import type { INotification } from '~/components/Notification/types/notification.type'
import type { IZodValidationOutput } from '~/utils/zod/types/zod-validation-output'
import type { IServerValidation } from '~/libs/Shared/types/validation.type'

// Store
import { useOperationStore } from '~/libs/Operation/operation.store'

// Components
import Btn from '~/components/Button/Btn.vue'

type AsyncFunction<T> = (abortController: () => AbortController) => Promise<T>

class CustomError extends Error {
  constructor(public errors: any[], public warnings?: any[], message?: string) {
    super(message)
  }
}

function _notify(options: {
  operationId: string
  temporaryRes: any
  message: string
  subtitle?: string | string[]
  type: INotification['type']
  hasLink?: boolean
}) {
  const { message, subtitle, operationId, temporaryRes, type, hasLink }
    = options

  const classes = ['!color-white']

  switch (type) {
    case 'negative':
      classes.push('bg-red-500')

      break

    case 'warning':
      classes.push('bg-amber-500')

      break

    case 'positive':
    default:
      classes.push('bg-green-500')

      break
  }

  notify($t(message), type, {
    subtitle,

    ...(type === 'negative' && {
      timeout: 0,
    }),

    // Link to operation
    ...(!!temporaryRes
    && !!hasLink && {
      componentBelow: {
        component: markRaw(Btn),
        props: {
          label: $t('operation.details'),
          icon: 'i-tabler:list-details',
          class: classes,
          noDim: true,
          noUppercase: true,
          to: $p({
            path: '/profile/operation-history',
            query: { operationId },
          }),
        },
      },
    }),
  })
}

export function useRequest(options?: { loadingInitialState?: boolean }) {
  const { addOperation } = useOperationStore()
  const { loadingInitialState } = options ?? {}

  // Layout
  const errors = ref<string[]>([])
  const isLoading = ref(loadingInitialState ?? false)
  const abortController = ref<AbortController>()

  // Logging
  let timerStart: number
  let temporaryRes: any
  let temporaryResPayload: any
  let temporaryErrors: any[]
  let temporaryWarnings: any[]
  let operationId = ''

  // Validation
  const serverValidation = ref<IServerValidation>({
    errors: [],
    warnings: [],
  })

  function createAbortController() {
    abortController.value = new AbortController()

    return abortController.value
  }

  async function handleRequest<T = any>(
    fnc: AsyncFunction<T>,
    options?: {
      payloadKey?: string
      notifySuccess?: boolean
      notifySuccessText?: string
      notifyError?: boolean
      $z?: IZodValidationOutput<any>

      /**
       * When true, the `payloadKey` will be ignored -> the actual result will be
       * returned instead of the resolved payload
       */
      noResolve?: boolean

      /**
       * We can merge the response with the original object
       */
      merge?: {
        /**
         * The key for the payload object
         */
        payloadKey?: string

        /**
         * The original object
         */
        originalObj: MaybeRefOrGetter<any>

        /**
         * The function to modify the response object
         */
        modifyFnc?: (obj: any) => any
      }

      /**
       * When valid request is done, we call this function
       */
      onComplete?: () => void

      // Operation logging
      logging?: {
        /**
         * The operation name -> used in operation log table to identify the operation
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
         * When true, the error will not be logged
         */
        noLog?: boolean | ((res: any) => boolean)
      }

      /**
       * The function to handle the error
       */
      onError?: (error: any) => Promise<any> | any
    },
  ): Promise<T> {
    const {
      payloadKey,
      noResolve = true,
      notifyError = true,
      notifySuccess,
      notifySuccessText,
      merge: _merge,
      $z,
      onComplete,
    } = options || {}

    try {
      temporaryErrors = []
      temporaryWarnings = []
      temporaryRes = undefined
      temporaryResPayload = undefined
      serverValidation.value = {
        errors: [],
        warnings: [],
      }

      // Validate
      if ($z) {
        const isValid = await $z.value.$validate()

        if (!isValid) {
          console.log($z.value.$errors)
          throw new Error('general.invalidForm')
        }
      }

      isLoading.value = true
      timerStart = new Date().getTime()

      const res = (await fnc(createAbortController)) as any
      const resPayload = get(res, payloadKey || config.request.payloadKey)

      temporaryRes = res
      temporaryResPayload = resPayload
      operationId = generateUUID()

      // If response is an array and includes some errors, we throw an error
      const isResponseArray = Array.isArray(resPayload)
      const hasArrayResponseError
        = isResponseArray && resPayload.some((item: any) => item.error)

      // When we get an array response with some errors
      if (hasArrayResponseError) {
        throw new CustomError(
          resPayload.map((item: any) => item.error),
          resPayload.map((item: any) => item.warning),
        )
      }

      // When we get a valid single response
      else if (
        isResponseArray
        && resPayload.length > 1
        && notifySuccess
        && temporaryRes?.code !== 'ERR_CANCELED'
      ) {
        _notify({
          temporaryRes,
          message: 'submittedSuccessfully',
          operationId,
          type: 'positive',
          hasLink: true,
        })
      }

      // When `merge` is used, we merge the response with the original object
      if (_merge) {
        const newData = _merge.payloadKey ? get(res, _merge.payloadKey) : res
        const modifyFnc
          = _merge.modifyFnc ?? (config.request.modifyFnc || ((obj: any) => obj))
        const newDataModified = modifyFnc(newData)

        if (newData) {
          const resultObj = Object.assign(
            toValue(_merge.originalObj),
            newDataModified,
          )

          _merge.originalObj.syncToParent?.(resultObj)
        }
      }

      if (notifySuccess) {
        notify(
          notifySuccessText ?? $t('general.submittedSuccessfully'),
          'positive',
        )
      }

      onComplete?.()
      $z?.value.$reset()
      config.form.onSubmitSuccess?.()

      return (noResolve ? res : resPayload) as T
    } catch (error: any) {
      let errors: string[] = []
      let warnings: string[] = []

      if (Array.isArray(error.errors) && error.errors.length) {
        const errorsFlat = error.errors.flatMap((err: any) => err)

        errors = errorsFlat.flatMap((err: any) => config.error.handler(err, $t))
        serverValidation.value.errors = config.validation.errorHandler(error)
      } else {
        errors = config.error.handler(error, $t)
      }

      if (Array.isArray(error.warnings) && error.warnings.length) {
        warnings = error.warnings.flatMap((err: any) =>
          config.error.handler(err, $t),
        )
      }

      temporaryErrors = errors
      temporaryWarnings = warnings
      operationId = generateUUID()

      return new Promise((_resolve, reject) => reject(error))
    } finally {
      // When canceled request, don't do anything
      if (temporaryErrors[0] === 'This operation was aborted.') {
        isLoading.value = false
      } else {
        const { noLog, entityKey, entityName, operationName }
          = options?.logging ?? {}

        const _noLog = typeof noLog === 'function' ? noLog(temporaryRes) : noLog
        const isLoggable = temporaryRes?.response?.status >= 400

        if (!_noLog && temporaryRes?.config && isLoggable) {
          let successOperationCount = 0

          if (Array.isArray(temporaryResPayload)) {
            successOperationCount = temporaryResPayload.filter(
              (item: any) => !item.error && !item.warning,
            ).length
          } else {
            successOperationCount
              = !temporaryErrors.length && !temporaryWarnings.length ? 1 : 0
          }

          addOperation({
            id: operationId,
            operationName,
            baseUrl: temporaryRes.config.baseURL,
            requestBody: temporaryRes.config?._requestData,
            authorId: useCurrentUserState().value?.id,
            method: '...',
            endpoint: '...',
            payload: temporaryResPayload,
            entityName,
            entityKey,
            date: new Date(),
            duration: new Date().getTime() - timerStart,
            results: {
              error: temporaryErrors.length,
              success: successOperationCount,
              warning: temporaryWarnings.length,
            },
            errors: temporaryErrors,
            warnings: temporaryWarnings,
          })
        }

        if (notifyError) {
          const uniqueErrors = uniq(temporaryErrors)
          if (uniqueErrors.length) {
            _notify({
              temporaryRes,
              message:
                uniqueErrors.length > 1
                  ? operationName || 'general.errorOccured'
                  : uniqueErrors[0],
              subtitle: uniqueErrors.length > 1 ? uniqueErrors : undefined,
              operationId,
              type: 'negative',
              hasLink: uniqueErrors.length > 1,
            })
          }
        }

        if (options?.onError && temporaryErrors.length) {
          await options.onError(temporaryErrors)
        }

        isLoading.value = false
      }
    }
  }

  return {
    errors,
    isLoading,
    serverValidation,
    abortController,
    handleRequest,
  }
}
