export type IAppState = {
  UserTableIsUserLoggedInFilter?: boolean
  general?: {
    keyboardShortcuts?: boolean
  }
  form: {
    confirmation: {
      enabled?: boolean
      required?: boolean
    }
  }
  table?: {
    autoSaveSchema?: boolean
    fit?: 'auto' | 'content' | 'stretch'
  }
}
