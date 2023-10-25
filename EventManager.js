class EventManager {
  constructor() {
    this.events = {}; // Object to hold events
  }

  // Add an event that can be triggered multiple times
  add(eventName, callback) {
    if (!eventName || !callback) return;
    if (typeof callback !== "function") return;
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // Add an event that can be triggered only once using closure
  addOnce(eventName, callback) {
    if (typeof callback !== "function") return;
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    // using arrow function to allow access to the object context
    const wrappedCallback = (...args) => {
      callback(...args); // Call the original callback
      this.off(eventName, wrappedCallback); // Remove the wrapped callback from
    };

    this.events[eventName].push(wrappedCallback);
  }

  // Trigger an event by its name
  on(eventName) {
    if (!this.events[eventName]) return;
    for (let callback of this.events[eventName]) {
      callback();
    }
  }

  // Remove a specific callback from an event
  off(eventName, callbackToRemove) {
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
module.exports = EventManager;
