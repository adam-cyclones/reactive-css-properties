// please note that code sandbox relead doesnt play well,
// plesae reload the page after each change if playing around -->.

import rCSSProps from "./reactiveCSSProps";

const { themeTextColor } = rCSSProps();

// watch for changes
themeTextColor.subscribe((change) => {
  console.log("Im watching for theme text changes", change);
});

// set the variable and inject into the dom
themeTextColor("#000");

setTimeout(() => {
  // change the theme text color after 3 seconds to simulate dark mode toggled
  themeTextColor("#fff", "yellow");
}, 3000);

// just stringify it, its that easy!
console.log(`
  background: ${themeTextColor};
`);

console.log("JavaScript bend to thy will.");
