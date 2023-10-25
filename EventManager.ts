type EventCallback = (...args: any[]) => void;

class EventManager {
  private events: { [key: string]: EventCallback[] };

  constructor() {
    this.events = {}; // Object to hold events
  }

  add(eventName: string, callback: EventCallback): void {
    if (!eventName || !callback) return;
    if (typeof callback !== "function") return;
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  addOnce(eventName: string, callback: EventCallback): void {
    if (typeof callback !== "function") return;
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const wrappedCallback = (...args: any[]) => {
      callback(...args); // Call the original callback
      this.off(eventName, wrappedCallback); // Remove the wrapped callback
    };

    this.events[eventName].push(wrappedCallback);
  }

  on(eventName: string): void {
    if (!this.events[eventName]) return;
    for (let callback of this.events[eventName]) {
      callback();
    }
  }

  off(eventName: string, callbackToRemove?: EventCallback): void {
    if (!this.events[eventName]) return;

    // If callbackToRemove is not provided, delete the entire event
    if (!callbackToRemove) {
      delete this.events[eventName];
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (callback) => callback !== callbackToRemove
    );
  }
}

const eventManager = new EventManager();
eventManager.add("test1", () => {
  console.log("test1");
});
eventManager.addOnce("test2", () => {
  console.log("test2Once");
});
eventManager.add("test2", () => {
  console.log("test2");
});
eventManager.on("test1");
eventManager.on("test1");
eventManager.on("test2");
eventManager.on("test2");
