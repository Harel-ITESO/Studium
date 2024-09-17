/** Here all relevant exceptions are created */

/** When property 'app-type' is not correctly assigned to a button */
export class ButtonTypeError extends Error {
  constructor(message: string) {
    super(message);
  }
}
