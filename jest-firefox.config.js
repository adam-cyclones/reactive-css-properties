const PORT = process.argv.find(arg => arg.startsWith('--port')).split('=').pop();
console.log(PORT)
module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: [
    "**/test/e2e/**/*.e2e.js"
  ],
  globals: {
    PORT
  }
}
