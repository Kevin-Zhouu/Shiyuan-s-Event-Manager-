// example usage of EventManager:
const EventManager = require("./EventManager");
var eventManager = new EventManager();
console.log("Hi Jacob, here is the usage of the EventManager class");
eventManager.addOnce("test1", () => {
  console.log("test1 Once");
});
eventManager.add("test1", () => {
  console.log("test1");
});
eventManager.on("test1");
eventManager.on("test1");
eventManager.off("test1");
eventManager.on("test1");
