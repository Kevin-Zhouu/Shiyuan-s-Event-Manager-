const EventManager = require("./EventManager");

describe("EventManager", () => {
  let eventManager;

  beforeEach(() => {
    eventManager = new EventManager();
  });

  test("should add and trigger an event", () => {
    const mockCallback = jest.fn();

    eventManager.add("testEvent", mockCallback);
    eventManager.on("testEvent");

    expect(mockCallback).toHaveBeenCalled();
  });

  test("should trigger an event only once", () => {
    const mockCallback = jest.fn();

    eventManager.addOnce("testEventOnce", mockCallback);
    eventManager.on("testEventOnce");
    eventManager.on("testEventOnce");

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test("should remove a specific callback from an event", () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();

    eventManager.add("testEvent", mockCallback1);
    eventManager.add("testEvent", mockCallback2);

    eventManager.off("testEvent", mockCallback1);
    eventManager.on("testEvent");

    expect(mockCallback1).not.toHaveBeenCalled();
    expect(mockCallback2).toHaveBeenCalled();
  });

  test("should remove all callbacks for an event if no specific callback is provided", () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();

    eventManager.add("testEvent", mockCallback1);
    eventManager.add("testEvent", mockCallback2);

    eventManager.off("testEvent");
    eventManager.on("testEvent");

    expect(mockCallback1).not.toHaveBeenCalled();
    expect(mockCallback2).not.toHaveBeenCalled();
  });
});
