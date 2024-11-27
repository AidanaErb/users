import { CoreExceptionCode } from '../../../shared/common/exceptions/core-exception-code';
import { CoreException } from '../../../shared/common/exceptions/core.exception';
import { ErrorKind } from '../../../shared/common/exceptions/error-kind';

export class UserAlreadyExistsException extends CoreException {
    public code = CoreExceptionCode.UserAlreadyExists;
    public readonly kind = ErrorKind.EntityNotFound;

    constructor(message = 'User already exists', metadata = {}) {
        super(message, metadata);
    }
}
