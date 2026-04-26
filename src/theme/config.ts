/** Default Evolve UI theme: colors for buttons, typography, and surfaces. */
export type EvolveUIConfig = {
  colors: {
    primary: string;
    primaryText: string;
    secondary: string;
    secondaryText: string;
    title: string;
    body: string;
    background: string;
    surface: string;
    /** Default border for text fields. */
    inputBorder: string;
    /** Invalid field border and error message. */
    error: string;
  };
};

/** Out-of-the-box palette used when the app omits values (merged with your config). */
export const defaultEvolveUIConfig: EvolveUIConfig = {
  colors: {
    primary: '#2563EB',
    primaryText: '#FFFFFF',
    secondary: '#E5E7EB',
    secondaryText: '#111827',
    title: '#111827',
    body: '#4B5563',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    inputBorder: '#D1D5DB',
    error: '#DC2626',
  },
};

/** What you may pass to `EvolveUIProvider` — any color group may be partial. */
export type EvolveUIConfigInput = {
  colors?: Partial<EvolveUIConfig['colors']>;
};

/** Deep-merge defaults with a partial config. */
export function mergeEvolveUIConfig(
  base: EvolveUIConfig,
  partial?: EvolveUIConfigInput | null
): EvolveUIConfig {
  if (!partial) {
    return base;
  }
  return {
    ...base,
    colors: { ...base.colors, ...partial.colors },
  };
}
