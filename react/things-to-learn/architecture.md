---
description: My current happy to use architecture
---

# Architecture

![architecture tree](../../.gitbook/assets/image%20%284%29.png)

### Component/

* Contains Presentational Components
* Does not contain logic of App Features

### Features/

* Contains App Feature component Logic
* Here for weather app weather Feature is created
* Every feature contains logic of its own eg: Types , reduxs' action & reducer definition.
* Component folder will contain UI Logic, can have further segregation in Presentational & Container Logic. 

### Routes/

* Contains route for every app feature in separate module but a common export required for  passing it to react middleware.

### Store/

![](../../.gitbook/assets/image%20%281%29.png)

Here **View**  sends event to **Actions** and then action item is sent to **Store** but **Middleware** being the gatekeeper takes look at the function request and if any middleware\(eg: redux-thunk\) is responsible of handling it will take it and send action item response to **Reducer** which sends updated state back to view. 



