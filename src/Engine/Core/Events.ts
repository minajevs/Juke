export default class Events{
    private static events: {[id:string] : Array<(data:any) => any>} = {}

    static subscribe(name:string, fun:(data:any)=>any){
        if(this.events[name] == null) this.events[name] = []
        this.events[name].push(fun);
    }

    static clear(name?:string){
        if(name != null){
            this.events[name] = null;
        } else {
            this.events = {};
        }
    }

    static emit(name:string, data:any){
        let event = this.events[name];
        if(event != null){
            for(let fun of event){
                fun(data);
            }
        }
    }
}