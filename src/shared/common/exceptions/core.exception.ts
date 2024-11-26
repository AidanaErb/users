import { CoreExceptionCode } from './core-exception-code';
import { ErrorKind } from './error-kind';
import { ScopedException } from './scoped.exception';

export abstract class CoreException extends ScopedException {
    public abstract readonly kind: ErrorKind;
    public metadata: Record<string, unknown>;

    protected override defaultScope: string = CoreExceptionCode.DefaultScope;

    protected constructor(message: string, metadata = {}) {
        super(message);
        this.metadata = metadata;
    }

    public withMessage<T extends CoreException>(message: string): T {
        this.message = message;
        return this as unknown as T;
    }

    public withMetadata<T extends CoreException>(metadata: Record<string, unknown>): T {
        this.metadata = metadata;
        return this as unknown as T;
    }
}
