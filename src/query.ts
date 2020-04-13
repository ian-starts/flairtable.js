import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';
import isNil from 'lodash/isNil';

function buildParams(prefix:any, obj:any, addFn:any) {
    if (isArray(obj)) {
        // Serialize array item.
        forEach(obj, function(value, index) {
            if (/\[\]$/.test(prefix)) {
                // Treat each array item as a scalar.
                addFn(prefix, value);
            } else {
                // Item is non-scalar (array or object), encode its numeric index.
                buildParams(
                    prefix + '[' + (typeof value === 'object' && value !== null ? index : '') + ']',
                    value,
                    addFn
                );
            }
        });
    } else if (typeof obj === 'object') {
        // Serialize object item.
        forEach(obj, function(value, key) {
            buildParams(prefix + '[' + key + ']', value, addFn);
        });
    } else {
        // Serialize scalar item.
        addFn(prefix, obj);
    }
}

export function getQueryString(obj:any) {
    const parts: any[] = [];
    let addFn = function(key: any, value:any) {
        const newValue = isNil(value) ? '' : value;
        parts.push(key + '=' + newValue);
    };

    forEach(obj, function(value, key) {
        buildParams(key, value, addFn);
    });

    const queryString = parts.join('&').replace(/%20/g, '+');
    if (queryString){
        return `?${queryString}`;
    }
    return "";
}