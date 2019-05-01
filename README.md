# ToDoPlaning

## It is a planing application.

### Goal
1. "To do List" with calendar.

### Program flow
1. Log in
2. Show calendar with "To do list"

### JSON format
```
{
  "todoList" : {
    "userId": {
      "hashCode1": {
        completeRate: ...,
        date: "YYYYmmDD",
        deadLine: "YYYYmmDD",
        priority: ...,
        taskDetails: ...,
        todo: ...
      },
      "hashCode2": {
        completeRate: ...,
        date: "YYYYmmDD",
        deadLine: "YYYYmmDD",
        priority: ...,
        taskDetails: ...,
        todo: ...
      }
    },
    "anotherUserId": {
      "hashCode1": {
        completeRate: ...,
        date: "YYYYmmDD",
        deadLine: "YYYYmmDD",
        priority: ...,
        taskDetails: ...,
        todo: ...
      }
    },
    "userInfo": {
      "userId1": {
        "email": ...,
        "password": ...
      },
      "userId2": {
        "email": ...,
        "password": ...
      }
    }
  }
}

```

### Coding rule
1. Use the camel case.
2. Use tab to indent.
3. Place an white space between variables and braces.
  example)
  ```
  testFunction () {
    ...
  }
  ```
4. Leave your gitHub ID in where you edit or add code.

### Git
We are using "git flow" strategy.
