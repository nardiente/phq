const StyleDictionary = require('style-dictionary');

// Register custom transform for Tailwind
StyleDictionary.registerTransform({
  name: 'tailwind/color',
  type: 'value',
  matcher: (token) => token.type === 'color',
  transformer: (token) => token.value
});

// Build tokens
const styleDictionary = StyleDictionary.extend('config.json');
styleDictionary.buildPlatform('tailwind'); 