export interface IUseCase<TInput, TOutput> {
    execute(dto: TInput): Promise<TOutput>;
}
