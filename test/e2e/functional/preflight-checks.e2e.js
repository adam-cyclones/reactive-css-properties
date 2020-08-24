// doc const aHandle = await frame.evaluateHandle(() => document.body);

beforeAll(async () => {
  await page.goto(`http://localhost:${PORT}`);
})

test('all elements in this example should be available to test', async () => {
  const expected = [
    "heading",
    "paragraph",
    "light-theme",
    "dark-theme",
    "scoped-footer",
    "theme-is-text",
  ];
  const foundElsIds = []
  for (const id of expected) {
    try {
      const elId = await (
        await page.waitForSelector(`#${id}`, { timeout: 100 })
      )
        .evaluate(self => self.id);
      // push all found
      foundElsIds.push(elId);
    } catch (err) {
      throw err;
    }
  }
  expect((foundElsIds.sort())).toEqual((expected.sort()));
});


test('proves a variable has been set before javascript loads', async () => {
  await page.waitForLoadState('domcontentloaded');
  // Get all css variables on html :root
  const customProperties = new Map(await page.evaluate(() =>
    Array.from(document.documentElement.computedStyleMap().entries(), ([key, value]) =>
      key.startsWith('--') ? [key, Object.values(value[0])[0].trim()] : null ).filter(Boolean)))

  expect(customProperties.get('--theme')).toBe('light')
})
