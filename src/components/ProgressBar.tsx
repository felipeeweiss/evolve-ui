import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type ProgressBarProps = {
  /** Progress between 0 and 1 (values are clamped). */
  progress: number;
  /** Bar thickness in dp. Defaults to 8. */
  height?: number;
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

function clamp01(n: number): number {
  if (Number.isNaN(n)) {
    return 0;
  }
  return Math.min(1, Math.max(0, n));
}

export function ProgressBar({
  progress,
  height = 8,
  testID,
  style,
}: ProgressBarProps) {
  const { colors } = useEvolveUI();
  const p = clamp01(progress);
  const radius = height / 2;

  const a11y = useMemo(
    () => ({
      min: 0,
      max: 100,
      now: Math.round(p * 100),
    }),
    [p]
  );

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={a11y}
      testID={testID}
      style={[{ width: '100%' }, style]}
    >
      <View
        style={{
          height,
          borderRadius: radius,
          backgroundColor: colors.progressBarTrack,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${p * 100}%`,
            backgroundColor: colors.progressBarFill,
          }}
        />
      </View>
    </View>
  );
}
