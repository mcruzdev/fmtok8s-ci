export class InvalidSemverError extends Error {
  name: string = 'InvalidSemverError';
  constructor(message: string | undefined) {
    super(message);
  }
}

export class CreateTagIsNotAllowed extends Error {
  name: string = 'CreateTagIsNotAllowed';
  constructor(message: string | undefined) {
    super(message);
  }
}
