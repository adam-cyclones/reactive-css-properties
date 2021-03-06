<p align="center">
<img width="100px" height="100px" alt="Reactive css logo" src="docs/assets/reactive-css-logo.svg"/>
<h1 align="center">Reactive CSS Properties</h1>
<p>A tiny library to supercharge your styling workflow. With Reactive CSS Properties (re.css) you can set css custom properties and react to changes in realtime from JavaScript</p>
</p>
<p align="center">
<a target="_blank" href="https://adam-cyclones.github.io/reactive-css-properties/">Website</a>
<span>-</span>
<a target="_blank" href="https://adam-cyclones.github.io/reactive-css-properties/issues">Report a bug</a>
<span>-</span>
<a target="_blank" href="https://github.com/adam-cyclones/reactive-css-properties#use-with-my-favourite-framework">Supported frameworks</a>
</p>

**Table of contents**
- [The case for re.css](#the-case-for-recss)
- [Why reactive?](#why-reactive)
  - [How it works?](#how-it-works)
- [What is the use case?](#what-is-the-use-case)
- [Browser support](#browser-support)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Reacting to css changes](#reacting-to-css-changes)
    - [Methods](#methods)
    - [reCSSProps constructor details](#recssprops-constructor-details)
  - [How to use a reactive variable](#how-to-use-a-reactive-variable-optional)
    - [From stylesheets](#from-stylesheets)
    - [From JavaScript](#from-javascript)
    - [From Typescript](#from-typescript)
- [Use with my favourite framework](#use-with-my-favourite-framework)
- [Where are the tutorials, examples, perf metrics and style guide?](#where-are-the-tutorials-examples-perf-metrics-and-style-guide)
- [Why should I help?](#why-should-i-help)


## The case for re.css
You can think of modern JavaScript having two main responsibilities, updating business logic and updating styling, The trouble with the latter is that this adds extra overhead and new problems to overcome, re.css sets out that it is css's responsibility to update styling and JavaScript should only have a pointer, a way to cheeply make changes, not to elements in the DOM but variables on mass.

CSS-in-JS is not essential with the advent of CSS custom properties (CSS variables), This is because a developer can `set` and `get` css custom properties from JavaScript or update existing variables defined in stylesheets, this has important performance and UX implications, reducing the time to first contentful paint and also the amount of work components need to do on update.

JavaScript and CSS can now share data easily and bi-directionally, the result is that styles can remain in stylesheets and JavaScript can continue to add the gloss and sparkles ✨, but that is not enough, we need reactivity.

## Why reactive?
If you open devtools and change the value a css variable (other examples: change from a breakpoint or :hover... or anything else), this change happens in realtime, JavaScript is unable to detect this change. So we need a workaround, using re.css reactive-css-properties this now becomes a reality.

### How it works?
An observable gets set to watch for `style` attribute changes of the specified root element, JavaScript can then respond in realtime, diffing the `oldValue` vs `value` then calling a function if changes have been detected.

## What is the use case?
- Remove FOUK (flash of un-styled content) forever.
- Performance benefits over pure CSS-in-JS - cheaper component re-renders
- Change one variable and have JavaScript set an entire theme's worth of variables.
- Update a css variable based on screen position or any sensor / event that JavaScript can access that CSS cannot
- Get CSS variables values and use them in logic
- Separation of concerns between styling and business logic
- Dry code
- SSR support / SSR like styling performance without SSR
- CSS can be used as configuration which is isomorphic between CSS and JS
- Encourage developers to think differently and style variables instead of individual elements on the page, it might just change how you create apps and websites

## Browser support
As IE11 does not support css custom properties (sort of), at the moment it is not within scope to support IE11, however it may be possible.

*Related reading:*
- [Javascript Enhanced scss mixins concepts explained](https://dev.to/adam_cyclones/javascript-enhanced-scss-mixins-concepts-explained-3mpo)
- [Reactive CSS Explained](https://dev.to/adam_cyclones/great-scott-reactive-css-231m)


## Getting started
### Installation
``` sh
yarn add reactive-css-properties --production

# or

npm i reactive-css-properties --only=production
```

### Usage
Set a css custom property.
``` js
import rCSSProps from "reactive-css-properties";

// rCSSProps object has no undefined properties and will always yield a class-like callable object.
// The name of your destructured variable is the name of the css variable in snake-case
const { themeTextColor } = rCSSProps();

// insert `--theme-text-color: #000;` into the root element `style` (<html> in this example).
themeTextColor("#000");

// or provide a fallback for browsers which do not support css custom properties
themeTextColor("#000", "#000");
```

#### Reacting to css changes
``` js
// any themeTextColor calls after this subscription will become reactive
themeTextColor.subscribe((change) => {
  console.log("Im watching for theme text changes", change);
  themeTextBackground('#000');
});
```
#### Methods
``` js
// Get the full var() to insert into css  
themeTextColor.getUsage();
// Get the key
themeTextColor.getKey();
// Get the value currently, this is not reactive, use subscribe to get realtime values
themeTextColor.getValue();
// Get the fallback value currently, this is not reactive, use subscribe to get realtime values
themeTextColor.getFallbackValue();
// Get scope you optionally provided
themeTextColor.getScope();
```
#### reCSSProps constructor details
``` js
reCSSProps(element, scopeString);
```
You can optionally provide an element to set the css variables onto, this provides a scope for this element and its descendants, You can also provide a scope string to prefix all variables with scope, this comes in handy when you have a generated GUID and want to limit the scope to a component.
For custom elements, internally the `element` should be the `this` keyword, externally the `element` should be the `<custom-element>` known as `:host`.

---

### How to use a reactive variable (optional)
#### From stylesheets
Use the variable within `css`, `sass` or anything which results in css
``` css
body {
    color: var(--theme-text-color);
}
```
You should define the variable before JavaScript has loaded, this is **recommended** to provide some placeholder styling before JavaScript loads and takes ownership, also to help keep track of variables in use.
``` css
:root {
    --theme-text-color: #C0FF33;
}
```
#### From JavaScript
CSS-in-JS is not essential, however it is useful, with the workflow described above, you provide styling with or without JavaScript, removing one of the major cases against CSS-in-JS.
Using a variable in a string is very simple, cast the variable it to a string, thats it!
``` js
const styles = `
    body {
        color: ${themeTextColor};
    }
`
```

#### From Typescript
1st class Typescript support for consumers, and our source code is also wrote in TypeScript. The usage is the same as JavaScript and fully typed. Any issues, PR's Welcome!  

## Use with my favourite framework
- [Vue](https://github.com/adam-cyclones/vue-reactive-css-properties)
- React - **Planned**
- Angular - **Planned**
- Lit HTML / Lit Element - **Fully supported**
- Not listed? PRs welcome!

## Where are the tutorials, examples, perf metrics and style guide?
Its a very high priority to demonstrate the capabilities so you can trust what I am saying. I have used this library before it was released for around a year now, I enjoyed it and imeadiatly saw changes in my workflow and the websites performance as long as I followed my rules. Please keep an eye on the **issues** section and feel free to pick any of the work up. 

## Why should I help? 
Because I think this project could change the web world for the better and bring new proposals that add new concepts to the Houdini specification... when its ready, It would be a neat project to have on your CV and boost your understanding of CSSOM, browser rendering, TypeScript and bringing a project to release - probably a lot more along the way.

Made with 🧡 and passion for our community by Adam.
