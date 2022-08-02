export type TResponseError = {};

class AppErrorService extends Error {
  constructor() {
    super();

    Error.captureStackTrace(this);
  }

  throwErrorIfFail(
    failCondition: boolean,
    message: string,
    additionalInfo?: any
  ) {
    if (failCondition) {
      throw new Error(message);
    }
  }
}

export default new AppErrorService();
