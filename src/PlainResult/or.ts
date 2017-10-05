import { Result, isOk } from './Result';

export function orResult<T, E, F>(a: Result<T, E>, b: Result<T, F>): Result<T, F> {
    return isOk(a) ? a : b;
}
