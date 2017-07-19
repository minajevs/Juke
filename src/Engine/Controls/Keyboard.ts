/** Helper class to process user keyboard input */
export default class Keyboard {
    static LEFT: number = 37;
    static RIGHT: number = 39;
    static UP: number = 38;
    static DOWN: number = 40;
    static SPACE: number = 32;

    /** Private reference for all *tracked* keys */
    private static keys: { [keyCode: number]: boolean } = {};

    /** Initializes keyboard tracker
     * @param keys Keys to track for
     */
    public static initialize(keys: Array<number>) {
        window.addEventListener("keydown", this.onkeydown.bind(this));
        window.addEventListener("keyup", this.onkeyup.bind(this));
        for (let key of keys) this.keys[key] = false;
    }

    /** Private keyboard keydown listener */
    private static onkeydown(event: KeyboardEvent) {
        let keyCode: number = event.keyCode;
        if (keyCode in this.keys) {
            event.preventDefault();
            this.keys[keyCode] = true;
        }
    }

    /** Private keyboard keyup listener */
    private static onkeyup(event: KeyboardEvent) {
        let keyCode: number = event.keyCode;
        if (keyCode in this.keys) {
            event.preventDefault();
            this.keys[keyCode] = false;
        }
    }

    /**
     * Checks if key is pressed
     * @param keyCode Keyboard key
     */
    public static isDown(keyCode: number): boolean {
        return (keyCode in this.keys) ? this.keys[keyCode] : false;
    }
}