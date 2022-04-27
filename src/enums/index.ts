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
  Required = 'Password is required',
  Invalid_Address = 'Invalid email address',
  Password_Length = 'Password should be more than 3 symbols',
  Some_Error = 'Some error occurred',
  Email_Required = 'Email is required',
}
