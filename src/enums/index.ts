export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export enum ResultCodes {
  Success = 0,
}

export enum ErrorValues {
  REQUIRED_PASSWORD = 'Password is required',
  INVALID_ADDRESS = 'Invalid email address',
  PASSWORD_LENGTH = 'Password should be more than 3 symbols',
  SOME_ERROR = 'Some error occurred',
  REQUIRED_EMAIL = 'Email is required',
}

export enum PATH {
  MAIN_WINDOW = '/',
  LOGIN = 'login',
  PAGE_NOT_FOUND = '404',
  ERROR = '*',
}
