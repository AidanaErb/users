export enum CoreExceptionCode {
    DefaultScope = 'core.',

    AccessDenied = DefaultScope + 'access-denied',

    UserNotFound = DefaultScope + 'user-not-found',
    UserAlreadyExists = DefaultScope + 'user-already-exists',

    AccessTokenMalformed = DefaultScope + 'access-token-malformed',

    InvalidInput = DefaultScope + 'invalid-input',
}
