import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  error?: string;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function Checkbox({
  label,
  checked,
  onChange,
  description,
  error,
  disabled = false,
  testID,
  style,
  labelStyle,
}: CheckboxProps) {
  const { colors } = useEvolveUI();
  const hasError = Boolean(error && error.length > 0);
  const borderColor = hasError ? colors.error : colors.inputBorder;

  return (
    <View style={[{ width: '100%' }, style]} testID={testID}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        disabled={disabled}
        onPress={() => onChange(!checked)}
        testID={testID ? `${testID}-pressable` : undefined}
        style={({ pressed }) => ({
          minHeight: 48,
          borderRadius: 8,
          borderWidth: 1,
          borderColor,
          backgroundColor: colors.surface,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 10,
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
        })}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 1.5,
            borderColor: checked ? colors.primary : colors.inputBorder,
            backgroundColor: checked ? colors.primary : colors.background,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
          {checked ? (
            <View
              style={{
                width: 10,
                height: 6,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
                borderColor: colors.primaryText,
                transform: [{ rotate: '-45deg' }],
                marginBottom: 2,
              }}
            />
          ) : null}
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={[
              {
                color: colors.title,
                fontSize: 15,
                fontWeight: '500',
              },
              labelStyle,
            ]}
          >
            {label}
          </Text>
          {description ? (
            <Text style={{ color: colors.body, fontSize: 13, marginTop: 2 }}>
              {description}
            </Text>
          ) : null}
        </View>
      </Pressable>
      {hasError && (
        <Text style={{ color: colors.error, fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
