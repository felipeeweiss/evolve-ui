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
    inputBorder: string;
    error: string;
  };
};

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

export type EvolveUIConfigInput = {
  colors?: Partial<EvolveUIConfig['colors']>;
};

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
