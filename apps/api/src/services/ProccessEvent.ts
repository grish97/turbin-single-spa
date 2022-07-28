/**
 * Unhandled Rejections
 */
export function unhandledRejection() {
  process.on("unhandledRejection", (err: any) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection. Shutting down...");

    process.exit(1);
  });
}

/**
 * Uncaught Exceptions
 */
export function uncaughtRejection() {
  process.on("uncaughtRejection", (err: any) => {
    console.log(err.name, err.message);
    console.log("Uncaught Rejection. Shutting down...");

    process.exit(1);
  });
}
