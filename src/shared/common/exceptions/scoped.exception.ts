export abstract class ScopedException extends Error {
    public abstract code: string;
    protected abstract readonly defaultScope: string;

    protected constructor(message: string) {
        super(message);
    }

    public applyScope(scope: string): void {
        if (this.code.startsWith(this.defaultScope)) {
            this.code = this.code.replace(this.defaultScope, `${scope}.`);
        }

        this.code = `${scope}.${this.code}`;
    }
}
