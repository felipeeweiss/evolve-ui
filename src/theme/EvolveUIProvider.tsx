import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  defaultEvolveUIConfig,
  mergeEvolveUIConfig,
  type EvolveUIConfig,
  type EvolveUIConfigInput,
} from './config';

const EvolveUIContext = createContext<EvolveUIConfig>(defaultEvolveUIConfig);

export type EvolveUIProviderProps = {
  /** Optional theme from e.g. `./evolve.config`; omitted fields use `defaultEvolveUIConfig`. */
  config?: EvolveUIConfigInput | null;
  children: ReactNode;
};

/** Supplies the Evolve UI theme to hooks and components below it in the tree. */
export function EvolveUIProvider({ config, children }: EvolveUIProviderProps) {
  const value = useMemo(
    () => mergeEvolveUIConfig(defaultEvolveUIConfig, config),
    [config]
  );
  return (
    <EvolveUIContext.Provider value={value}>{children}</EvolveUIContext.Provider>
  );
}

/** Current merged theme. Must be used under `EvolveUIProvider`. */
export function useEvolveUI(): EvolveUIConfig {
  return useContext(EvolveUIContext);
}
