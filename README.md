# Shiyuan's EventManager


Hi Jacob,

I hope you are well! It was awesome chatting with you over Lark yesterday at 10:00 AM for TikTok Front End Engineering Internship(Trust and Safety). After the interview, I did research on the closure approach and came up with this solution to implement the addOnce method for EventManager class :

```
class EventManager {
    addOnce(eventName, callback) {
      if(typeof callback !== "function") return;
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
  
      const wrappedCallback = (...args) => {
        callback(...args); // Call the original callback
        this.off(eventName, wrappedCallback); // Remove the wrapped callback from
      };
  
      this.events[eventName].push(wrappedCallback);
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
```

**My thought process during the interview:**

My initial focus was on understanding the problem, which was to add an event listener that would execute only once before deregistering itself. I realised I overcomplicated the solution during the interview. I was considering various approaches and, perhaps due to my eagerness for this role and nerves of the moment, I was not able to implement the solution that I was originally capable of. 

**My reflection:**

Right after the interview was finished, I suddenly realised that I could achieve closure by wrapping the user's callback inside an arrow function instead of a regular function, ensuring the callback function can access the context of the event manager object. This method is both efficient and clean.

**Full solution:**

Leveraging the knowledge from my previous working experience as a frontend engineer, I have attached the full solution using both **JavaScript** and **TypeScript**, and added additional Unit Testing with **Jest**:
https://codesandbox.io/p/sandbox/muddy-architecture-rk777w?file=%2FREADME.md%3A9%2C19

I have a deep passion for frontend development and find myself resonating with the 'Always Day One' value at TikTok. I am truly grateful for the opportunity to have interviewed with you and sincerely hope to work with you and the TikTok team in the future :)

Wishing you a great afternoon!

Best,
Shiyuan Zhou


## Directory Structure

- `EventManager.js`: Contains the `EventManager` class.
- `EventManager.ts`: TypeScript Implmentation of `EventManager` class.
- `EventManager.test.js`: Contains Jest tests for the `EventManager` class.
- `index.js`: Demonstrates how to use the `EventManager` class

## Start the example application
``` yarn start ```

## Test the application
``` yarn test ```