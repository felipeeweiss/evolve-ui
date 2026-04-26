/**
 * Copy to your app root as `evolve.config.ts` (or `.js`) and use:
 * `import type { EvolveUIConfigInput } from '@felipeeweiss/evolve-ui'`.
 * In `App.tsx`:
 *
 *   import evolveConfig from './evolve.config';
 *   <EvolveUIProvider config={evolveConfig}>...</EvolveUIProvider>
 */
import type { EvolveUIConfigInput } from './src/index';

const evolveConfig: EvolveUIConfigInput = {
  colors: {
    primary: '#0D9488',
    primaryText: '#FFFFFF',
    secondary: '#ECFDF5',
    secondaryText: '#064E3B',
    title: '#0F172A',
    body: '#475569',
    background: '#FFFFFF',
    surface: '#F1F5F9',
  },
};

export default evolveConfig;
