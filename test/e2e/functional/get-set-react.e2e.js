
beforeEach(async () => {
  await page.goto(`http://localhost:${PORT}`);
});


test('clicking button changes theme', async () => {
  await page.waitForSelector('#dark-theme');
  await page.click('#dark-theme');
  // Get all css variables on html :root
  const customProperties = new Map(await page.evaluate(() =>
    Array.from(document.documentElement.computedStyleMap().entries(), ([key, value]) =>
      key.startsWith('--') ? [key, Object.values(value[0])[0].trim()] : null ).filter(Boolean)))

  expect(customProperties.get('--theme')).toBe('dark')
});


test('clicking button changes theme and another variable changes as a side-effect from subscribe callback', async () => {
  await page.waitForLoadState('domcontentloaded');
  // Get all css variables on html :root
  const customProperties = async () => new Map(await page.evaluate(() =>
    Array.from(document.documentElement.computedStyleMap().entries(), ([key, value]) =>
      key.startsWith('--') ? [key, Object.values(value[0])[0].trim()] : null ).filter(Boolean)))
  // check theme text before click
  expect((await customProperties()).get('--theme-text-color')).toBe('#000');

  await page.waitForSelector('#dark-theme');
  await page.click('#dark-theme');

  expect((await customProperties()).get('--theme')).toBe('dark')
  // check theme text after click, this should have changed in response to subscribe callback
  expect((await customProperties()).get('--theme-text-color')).toBe('red')
});
