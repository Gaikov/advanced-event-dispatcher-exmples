//import {BaseEvent, EventDispatcher} from "advanced-event-dispatcher";
const {BaseEvent, EventDispatcher} = require("advanced-event-dispatcher");
console.log("====================================================================");
console.log("*                  Launching JavaScript example                    *");
console.log("====================================================================");

class Event extends BaseEvent {

    message = "none";

    constructor(message) {
        super();
        this.message = message;
    }
}

const dispatcher = new EventDispatcher();

const handler = e => console.log(e.message);

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

    onEvent(e) {
        console.log(this.constructor.name, ":", e.message);
    }
}

const c = new Observer();
EventBus.instance.dispatchEvent(new Event("Hello from EventBus!"));