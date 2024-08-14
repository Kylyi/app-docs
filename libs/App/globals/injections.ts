// Types
import type { IBreadcrumb } from '~/components/Breadcrumbs/types/breadcrumb.type'

// Models
import type { FileModel } from '~/components/FileInput/models/file.model'

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)

  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }

  return resolved
}

// Breadcrumbs
export const breadcrumbsKey: InjectionKey<Ref<IBreadcrumb[]>>
  = Symbol('breadcrumbs')

// Files
export const filesKey: InjectionKey<
  Ref<{ [COMPONENT_ID: string]: Array<FileModel | IFile> }>
> = Symbol('files')
