# JavaScript module formats

### IIFE module: JavaScript module pattern

```text
// Define IIFE module.
const iifeCounterModule = (() => {
    let count = 0;
    return {
        increase: () => ++count,
        reset: () => {
            count = 0;
            console.log("Count is reset.");
        }
    };
})();

// Use IIFE module.
iifeCounterModule.increase();
iifeCounterModule.reset();
```

It wraps the module code inside an IIFE. it returns an object, which is the placeholder of exported APIs. Only 1 global variable is introduced, which is the modal name\(**iifeCounterModule**\). Later the module name can be used to call the exported module APIs. This is called the **module pattern of JavaScript**.

#### Import Mixins

```text
 Define IIFE module with dependencies.
const iifeCounterModule = ((dependencyModule1, dependencyModule2) => {
    let count = 0;
    return {
        increase: () => ++count,
        reset: () => {
            count = 0;
            console.log("Count is reset.");
        }
    };
})(dependencyModule1, dependencyModule2);
```

### Revealing module: 

The revealing module pattern is named by Christian Heilmann. With this syntax, it becomes easier when the APIs need to call each other.. This pattern is also an IIFE, but it emphasizes defining all APIs as local variables inside the anonymous function:

```text
// Define revealing module.
const revealingCounterModule = (() => {
    let count = 0;
    const increase = () => ++count;
    const reset = () => {
        count = 0;
        console.log("Count is reset.");
    };

    return {
        increase,
        reset
    };
})();

// Use revealing module.
revealingCounterModule.increase();
revealingCounterModule.reset();
```

### CJS: CommonJS module, or Node.js module

* pattern to define and consume modules.
* Implemented by node.js, by default, each .js file is a CommonJS module.
* At runtime, Node.js implements this by wrapping the code inside the file into a function, then passes the `exports` variable, `module` variable, and `require` function through arguments.

### AMD module: Asynchronus Module Defination, or RequireJS module

* AMD provides a define module, which accepts the module name, dependency moduels' name, and a facory function:

```text
// Define AMD module.
define("amdCounterModule", ["dependencyModule1", "dependencyModule2"], (dependencyModule1, dependencyModule2) => {
    let count = 0;
    const increase = () => ++count;
    const reset = () => {
        count = 0;
        console.log("Count is reset.");
    };

    return {
        increase,
        reset
    };
});

```

It also provides a require function to consume module:

```text
// Use AMD module.
require(["amdCounterModule"], amdCounterModule => {
    amdCounterModule.increase();
    amdCounterModule.reset();
});
```

* AMD `require` accept the names of modules to be consumed, and pass the module to a function argument.

#### Dynamic loading

* TK

#### AMD module from CommonJS module

```text
// Define AMD module with CommonJS code.
define((require, exports, module) => {
    // CommonJS code.
    const dependencyModule1 = require("dependencyModule1");
    const dependencyModule2 = require("dependencyModule2");

    let count = 0;
    const increase = () => ++count;
    const reset = () => {
        count = 0;
        console.log("Count is reset.");
    };

    exports.increase = increase;
    exports.reset = reset;
});

// Use AMD module with CommonJS code.
define(require => {
    // CommonJS code.
    const counterModule = require("amdCounterModule");
    counterModule.increase();
    counterModule.reset();
});
```

### UMD module: Universal Module Definition, or UmdJS module

UMD \(Universal Module Definition, [https://github.com/umdjs/umd](https://github.com/umdjs/umd)\) is a set of tricky patterns to make your code file work in multiple environments.

### ES module: ECMAScript 2015, or ES6 module

The main syntax is the `import` keyword and the `export` keyword.

### ES dynamic module: ECMAScript 2020, or ES11 dynamic module

In 2020, the latest JavaScript spec version 11 is introducing a built-in function `import` to consume an ES module dynamically. The `import` function returns a `promise`, so its `then` method can be called to consume the module:

```text
// Use dynamic ES module with promise APIs, import from named export:
import("./esCounterModule.js").then(({ increase, reset }) => {
    increase();
    reset();
});
// Or import from default export:
import("./esCounterModule.js").then(dynamicESCounterModule => {
    dynamicESCounterModule.increase();
    dynamicESCounterModule.reset();
});
```

### System module: SystemJS module

SystemJS is a library that can enable ES6 module syntax for older ES5. For example, the following module is defined in ES6 syntax:

### Webpack module: bundle from CJS, AMD, ES modules

Webpack is a bundler for modules. It uses transpile combined CommonJS module, AMD module, and ES module into a harmony module pattern, and bundle all code into one single file.

```text
// Use ES module: index.js
import counterModule from "./esCounterModule";
counterModule.increase();
counterModule.reset();
```



Webpack can bundle all the above file, even they are in 3 different module systems, into a single file `main.js`:

* `root`
  * `dist`
    * `main.js (Bundle of all files under src)`
  * `src`
    * `amdDependencyModule1.js`
    * `commonJSDependencyModule2.js`
    * `esCounterModule.js`
    * `index.js`

### Babel module: transpile from ES module

Babel is another transpiler to convert ES6+ JavaScript code to the older syntax for the older environment like older browsers.

Babel can work with SystemJS to transpile CommonJS/Node.js module, AMD/RequireJS module, and ES module

### TypeScript module: Transpile to CJS, AMD, ES, System modules

TypeScript supports ES module syntax [https://www.typescriptlang.org/docs/handbook/modules.html](https://www.typescriptlang.org/docs/handbook/modules.html), which can be kept as ES6, or transpiled to other formats, including CommonJS/Node.js, AMD/RequireJS, UMD/UmdJS, or System/SystemJS, according to the specified transpiler option in tsconfig.json:

```text
{
    "compilerOptions": {
        "module": "ES2020", // None, CommonJS, AMD, System, UMD, ES6, ES2015, ES2020, ESNext.
    }
}
```

#### Internal module and namespace

TypeScipt also has a module keyword and a name space keyword, they are called internal modules:

[https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html\#pitfalls-of-namespaces-and-modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#pitfalls-of-namespaces-and-modules)

```text
module Counter {
    let count = 0;
    export const increase = () => ++count;
    export const reset = () => {
        count = 0;
        console.log("Count is reset.");
    };
}

namespace Counter {
    let count = 0;
    export const increase = () => ++count;
    export const reset = () => {
        count = 0;
        console.log("Count is reset.");
    };
}

```

They are both transpiled to JavaScript objects:

```text
var Counter;
(function (Counter) {
    var count = 0;
    Counter.increase = function () { return ++count; };
    Counter.reset = function () {
        count = 0;
        console.log("Count is reset.");
    };
})(Counter || (Counter = {}));
```

