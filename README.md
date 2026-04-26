# Evolve UI

React Native component library with a central theme file: `evolve.config`.

## Requirements

- Node.js with npm, pnpm, or yarn
- A **React Native** app with **React 18+** and **React Native 0.72+** (peer dependencies)

## Installation

In your app directory:

```bash
npm install @felipeeweiss/evolve-ui
```

With Yarn or pnpm:

```bash
yarn add @felipeeweiss/evolve-ui
```

```bash
pnpm add @felipeeweiss/evolve-ui
```

`react` and `react-native` are peer dependencies: they are not installed by this package and must already be present in your app.

## Theme setup

1. Add **`evolve.config.ts`** (or `.js`) at your app root. You can start from the bundled `evolve.config.example.ts` in this package and adjust values.

2. Wrap your app with **`EvolveUIProvider`** and pass the config object:

```tsx
import { EvolveUIProvider, Button } from '@felipeeweiss/evolve-ui';
import evolveConfig from './evolve.config';

export default function App() {
  return (
    <EvolveUIProvider config={evolveConfig}>
      <Button variant="primary" onPress={() => {}}>
        Save
      </Button>
    </EvolveUIProvider>
  );
}
```

3. Components read colors via `useEvolveUI()`. Where supported, override layout and typography with `style` and `textStyle` (for example on `Button`).

## Local development of this library

To test changes before publishing, point the app to this package with a `file:` dependency in the app’s `package.json`:

```json
{
  "dependencies": {
    "@felipeeweiss/evolve-ui": "file:../path/to/evolve-ui"
  }
}
```

Then run `npm install` in the app. Before publishing the library, run `npm run build` in the package root to generate declaration files in `dist/`.

## License

MIT
