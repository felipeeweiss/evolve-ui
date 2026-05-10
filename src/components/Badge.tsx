import React from 'react';
import { Text, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export type BadgeSize = 'sm' | 'md';

export type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  testID,
  style,
  textStyle,
}: BadgeProps) {
  const { colors } = useEvolveUI();

  const palette = resolvePalette(variant, colors);
  const fontSize = size === 'sm' ? 11 : 13;
  const paddingVertical = size === 'sm' ? 2 : 4;
  const paddingHorizontal = size === 'sm' ? 8 : 10;

  return (
    <View
      testID={testID}
      style={[
        {
          alignSelf: 'flex-start',
          backgroundColor: palette.bg,
          borderRadius: 999,
          paddingVertical,
          paddingHorizontal,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: palette.fg,
            fontSize,
            fontWeight: '600',
            lineHeight: fontSize + 4,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

type Palette = { bg: string; fg: string };

function resolvePalette(
  variant: BadgeVariant,
  colors: {
    primary: string;
    primaryText: string;
    secondary: string;
    secondaryText: string;
    error: string;
    toastIconSuccess: string;
    toastIconWarning: string;
    toastIconInfo: string;
  }
): Palette {
  switch (variant) {
    case 'primary':
      return { bg: colors.primary, fg: colors.primaryText };
    case 'secondary':
      return { bg: colors.secondary, fg: colors.secondaryText };
    case 'success':
      return { bg: colors.toastIconSuccess, fg: '#FFFFFF' };
    case 'error':
      return { bg: colors.error, fg: '#FFFFFF' };
    case 'warning':
      return { bg: colors.toastIconWarning, fg: '#FFFFFF' };
    case 'info':
      return { bg: colors.toastIconInfo, fg: '#FFFFFF' };
  }
}
