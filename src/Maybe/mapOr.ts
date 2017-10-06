import { Maybe, isNotNullAndUndefined } from './Maybe';
import { expectNotNullAndUndefined } from './expect';
import { ERR_MSG_SELECTOR } from './ErrorMessage';
import { MapFn } from './Function';

export function mapOrForMaybe<T, U>(src: Maybe<T>, def: U, selector: MapFn<T, U>): U {
    let r: U;
    let msg = '';
    if (isNotNullAndUndefined(src)) {
        r = selector(src);
        msg = ERR_MSG_SELECTOR;
    }
    else {
        r = def;
        msg = '`def` must not be `null`';
    }
    return expectNotNullAndUndefined(r, msg);
}