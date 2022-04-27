import {BaseEvent, EventDispatcher} from "advanced-event-dispatcher";
console.log("====================================================================");
console.log("*                  Launching TypeScript example                    *");
console.log("====================================================================");

class Event extends BaseEvent {
    constructor(readonly message: string = "none") {
        super();
    }
}

const dispatcher = new EventDispatcher();

const handler = (e:Event) => console.log(e.message);

dispatcher.addEventHandler(Event, handler);
dispatcher.dispatchEvent(new Event("Hello from advanced-event-dispatcher!"));

dispatcher.removeEventHandler(Event, handler);
dispatcher.dispatchEvent(new Event("This event will not be handled"));


/**
 * EventBus example
 */
class EventBus extends EventDispatcher {
    static instance = new EventBus();
}

class Observer {
    constructor() {
        EventBus.instance.addEventHandler(Event, this.onEvent, this);
    }

    onEvent(e:Event) {
        console.log(this.constructor.name, ":", e.message);
    }
}

const c = new Observer();
EventBus.instance.dispatchEvent(new Event("Hello from EventBus!"));