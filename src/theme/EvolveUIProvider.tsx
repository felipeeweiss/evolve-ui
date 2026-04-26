import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  defaultEvolveUIConfig,
  mergeEvolveUIConfig,
  type EvolveUIConfig,
  type EvolveUIConfigInput,
} from './config';

const EvolveUIContext = createContext<EvolveUIConfig>(defaultEvolveUIConfig);

export type EvolveUIProviderProps = {
  config?: EvolveUIConfigInput | null;
  children: ReactNode;
};

export function EvolveUIProvider({ config, children }: EvolveUIProviderProps) {
  const value = useMemo(
    () => mergeEvolveUIConfig(defaultEvolveUIConfig, config),
    [config]
  );
  return (
    <EvolveUIContext.Provider value={value}>{children}</EvolveUIContext.Provider>
  );
}

export function useEvolveUI(): EvolveUIConfig {
  return useContext(EvolveUIContext);
}
