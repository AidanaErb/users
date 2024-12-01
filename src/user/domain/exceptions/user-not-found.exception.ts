import { CoreExceptionCode } from '../../../shared/common/exceptions/core-exception-code';
import { CoreException } from '../../../shared/common/exceptions/core.exception';
import { ErrorKind } from '../../../shared/common/exceptions/error-kind';

export class UserNotFoundException extends CoreException {
    public code = CoreExceptionCode.UserNotFound;
    public readonly kind = ErrorKind.EntityNotFound;

    constructor(message = 'User not found', metadata = {}) {
        super(message, metadata);
    }
}
