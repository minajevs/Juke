import Core from "../Core/Core";

export default class Tools {
    public static extend(target: any, source: any): void {
        if (target == null || source == null) return;
        Object.keys(source).forEach((key) => {
            target[key] = source[key];
        });

        //if(!target || !source) return;
        //for (var key in target) {
        //    if (source.hasOwnProperty(key))
        //        target[key] = source[key];
        //}
    }
}