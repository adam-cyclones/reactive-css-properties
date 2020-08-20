<center>
<h1>Reactive CSS Properties</h1>
<p>Drive business logic from your styling and styling from your business logic. With Reactive CSS Properties you can set css custom properties and react to changes in realtime from JavaScript</p>
<a target="_blank" href="https://adam-cyclones.github.io/reactive-css-properties/">Website</a>
<span>––</span>
<a target="_blank" href="https://adam-cyclones.github.io/reactive-css-properties/">Report a bug</a>
</center>


## The case for reactive-css-properties
CSS in JavaScript is not essential with the advent of CSS custom properties (CSS variables), This is because a developer can `set` and `get` css custom properties from JavaScript or update existing variables defined in stylesheets.

JavaScript and CSS can now share data easily and bi-directionally, the result is that styles can remain in stylesheets and JavaScript can continue to add the gloss and sparkles.

## Why reactive?
If you open devtools, change a css variable, this change happens in realtime, JavaScript is unable to detect this change. So we need a workaround, Using reactive-css-properties, an observable gets set to watch for `style` attribute changes of the specified root element, JavaScript can then respond in realtime, diffing the `oldValue` vs `value` then calling a function if changes have been detected.

## What is the use case?
- Kill FOUK (flash of un-styled content) for good.
- Performance benefits over pure CSS-in-JS - cheaper component re-renders
- Change one variable and have JavaScript set an entire theme's worth of variables.
- Update a css variable based on screen position or any sensor / event that JavaScript can access that CSS cannot
- Get CSS variables values and use them in logic
- Separation of concerns between styling and business logic
- Dry code
- SSR supported
- CSS can be used as configuration which is isomorphic
- More efficient and natural feeling workflow 
- Encourage developers to think differently and style variables instead of individual elements on the page, it might just change how you create apps and websites

*Related reading:*
- [Javascript Enhanced scss mixins concepts explained](https://dev.to/adam_cyclones/javascript-enhanced-scss-mixins-concepts-explained-3mpo)
- [Reactive CSS Explained](https://dev.to/adam_cyclones/great-scott-reactive-css-231m)


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

#### Watch for changes
``` js
// any themeTextColor calls after this subscription will become reactive
themeTextColor.subscribe((change) => {
  console.log("Im watching for theme text changes", change);
  themeTextBackground('#000');
});
```
#### Other useful properties
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
#### rCSSProps constructor details
``` js
rCSSProps(element, scopeString);
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
CSS in JavaScript is not essential, however it is useful, with the workflow described above, you provide styling with or without JavaScript, removing one of the major cases against CSS in JS.
Using the variable in a js string is very simple, cast the variable it to a string.
``` js
const styles = `
    body {
        color: ${themeTextColor};
    }
`
```
