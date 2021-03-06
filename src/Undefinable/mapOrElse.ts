import { ERR_MSG_SELECTOR_MUST_NOT_RETURN_NO_VAL_FOR_UNDEFINABLE, ERR_MSG_DEF_MUST_NOT_RETURN_NO_VAL_FOR_UNDEFINABLE } from './ErrorMessage';
import { expectNotUndefined } from './expect';
import { RecoveryFn, MapFn } from '../shared/Function';
import { Undefinable } from './Undefinable';

/**
 *  Return the result of _selector_ with using _src_ as an argument for it if _src_ is not `undefined`.
 *  Otherwise, return the result of _def_.
 *
 *  Basically, this operation is a combination `map()` and `unwrapOrElse()`.
 *
 *  * `U` must not be `Undefinable<*>`.
 *      * If the result of _selector_ is `undefined`, this throw an `Error`.
 *      * If the result of _def_ is undefined`, this throw an `Error`.
 *  * If you'd like to accept `Undefinable<*>` as `U`, use a combination `andThen()` and `orElse()`.
 */
export function mapOrElseForUndefinable<T, U>(src: Undefinable<T>, def: RecoveryFn<U>, selector: MapFn<T, U>): U {
    let r: U;
    let msg = '';
    if (src !== undefined) {
        r = selector(src);
        msg = ERR_MSG_SELECTOR_MUST_NOT_RETURN_NO_VAL_FOR_UNDEFINABLE;
    }
    else {
        r = def();
        msg = ERR_MSG_DEF_MUST_NOT_RETURN_NO_VAL_FOR_UNDEFINABLE;
    }
    return expectNotUndefined(r, msg);
}
