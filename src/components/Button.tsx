import React, { useMemo, type ReactNode } from 'react';
import {
  Pressable,
  Text,
  type PressableStateCallbackType,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};

export function Button({
  variant = 'primary',
  children,
  onPress,
  style,
  textStyle,
  disabled,
}: ButtonProps) {
  const { colors } = useEvolveUI();

  const palette = useMemo(() => {
    if (variant === 'secondary') {
      return { bg: colors.secondary, fg: colors.secondaryText };
    }
    return { bg: colors.primary, fg: colors.primaryText };
  }, [colors, variant]);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={(state) =>
        resolveButtonStyle(state, palette.bg, style, disabled)
      }
    >
      <Text style={[{ color: palette.fg, fontSize: 16, fontWeight: '600' }, textStyle]}>
        {children}
      </Text>
    </Pressable>
  );
}

function resolveButtonStyle(
  state: PressableStateCallbackType,
  backgroundColor: string,
  custom: StyleProp<ViewStyle> | undefined,
  disabled: boolean | undefined
): StyleProp<ViewStyle> {
  const base: ViewStyle = {
    backgroundColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    opacity: disabled ? 0.5 : 1,
  };
  if (state.pressed && !disabled) {
    base.opacity = 0.92;
  }
  return [base, custom];
}
