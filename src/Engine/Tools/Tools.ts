export default class Tools {
    public static extend(target:any, source:any): void {
        if(!target || !source) return;
        for (var key in target) {
            if (source.hasOwnProperty(key))
                target[key] = source[key];
        }
    }
}