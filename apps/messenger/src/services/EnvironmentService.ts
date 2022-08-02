import { appError } from "services";

class EnvironmentService {
  /**
   * Get environment variable by its name
   * @param {string} name
   */
  public getValue(name: string): undefined | string {
    appError.throwErrorIfFail(
      typeof name !== "string",
      "Environment variable name must be a string"
    );

    return process.env[name];
  }
}

export default new EnvironmentService();
