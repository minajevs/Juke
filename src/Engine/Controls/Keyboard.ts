export default class Keyboard {
    static LEFT: number = 37;
    static RIGHT: number = 39;
    static UP: number = 38;
    static DOWN: number = 40;
    static SPACE: number = 32;

    private static keys: { [keyCode: number]: boolean } = {};

    public static initialize(keys: Array<number>) {
        window.addEventListener("keydown", this.onkeydown.bind(this));
        window.addEventListener("keyup", this.onkeyup.bind(this));
        for (let key of keys) this.keys[key] = false;
    }

    private static onkeydown(event: KeyboardEvent) {
        let keyCode: number = event.keyCode;
        if (keyCode in this.keys) {
            event.preventDefault();
            this.keys[keyCode] = true;
        }
    }

    private static onkeyup(event: KeyboardEvent) {
        let keyCode: number = event.keyCode;
        if (keyCode in this.keys) {
            event.preventDefault();
            this.keys[keyCode] = false;
        }
    }

    public static isDown(keyCode: number): boolean {
        return (keyCode in this.keys) ? this.keys[keyCode] : false;
    }
}