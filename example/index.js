import cssProps from "../target/commonjs/index"

const elBtnLightTheme = document.getElementById("light-theme");
const elBtnDarkTheme = document.getElementById("dark-theme");
const themeIndicator = document.getElementById('theme-is-text');

const { theme, themeTextColor, themeBackgroundColor } = cssProps();

console.log('early get value', theme.getValue())

themeTextColor("#000", "#000");
themeBackgroundColor("#fff");

theme.subscribe(({ value }) => {
  themeIndicator.innerText = value;
  console.log(value)
  if (value === 'dark') {
    themeTextColor("red");
  } else {
    themeTextColor("blue")
  }
});

themeIndicator.innerText = theme.getValue();
const toggleThemeHandler = ({ target: { id } }) => {
  switch (id) {
    case "light-theme":
      theme("light");
      themeTextColor("#000");
      themeBackgroundColor("#fff");
      break;
    case "dark-theme":
      theme("dark");

      themeBackgroundColor("#000");
      break;
  }
}

if (elBtnDarkTheme && elBtnLightTheme) {
  for (const themeToggle of [elBtnDarkTheme, elBtnLightTheme]) {
    themeToggle.addEventListener('click',toggleThemeHandler);
  }
}

// checks
console.group('quick test')
console.log('value:', themeTextColor.getValue())
console.log('getScope:', themeTextColor.getScope())
console.log('getUsage:', themeTextColor.getUsage())
console.log('key:',themeTextColor.getKey())
console.groupEnd();
