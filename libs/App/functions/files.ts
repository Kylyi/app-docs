export function getFileName(filename: string) {
  return filename.split('__').reverse()[0]
}

export function getFileExtension(filename: string) {
  return filename.split('.').reverse()[0]
}

export async function handleDownloadFile(
  file: File | Pick<IFile, 'id' | 'path' | 'name'>,
  options?: {
    /**
     * When true, the function will only return the file URL
     */
    returnUrlOnly?: boolean

    /**
     * When provided, the function will use this URL instead of creating one
     * from the file path
     */
    url?: string
  },
) {
  const { returnUrlOnly, url: _url } = options || {}
  const rC = useRuntimeConfig()

  if (!('id' in file)) {
    return
  }

  const url = _url ?? `${rC.public.FILES_HOST}/${decodeURIComponent(file.path)}`

  if (returnUrlOnly) {
    return url
  }

  // Create a link element that downloads the file
  const link = document.createElement('a')
  link.download = file.name
  link.href = url
  document.body.appendChild(link)
  link.click()

  // Cleanup the DOM
  link.remove()
}
