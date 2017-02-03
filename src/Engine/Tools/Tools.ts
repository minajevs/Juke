export default class Tools {
    public static extend<T>(target:T, source:T): void {
        if(!target || !source || (target.constructor !== source.constructor)) return;
        for (var key in target) {
            if (source.hasOwnProperty(key))
                target[key] = source[key];
        }
    }
}