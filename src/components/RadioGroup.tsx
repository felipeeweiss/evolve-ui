import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type RadioOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  label?: string;
  value: string | null;
  options: RadioOption[];
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function RadioGroup({
  label,
  value,
  options,
  onValueChange,
  error,
  disabled = false,
  testID,
  style,
  labelStyle,
}: RadioGroupProps) {
  const { colors } = useEvolveUI();
  const hasError = Boolean(error && error.length > 0);

  return (
    <View style={[{ width: '100%' }, style]} testID={testID}>
      {label ? (
        <Text
          style={[
            {
              color: colors.title,
              fontSize: 14,
              fontWeight: '500',
              marginBottom: 6,
              alignSelf: 'flex-start',
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={{
          borderWidth: 1,
          borderColor: hasError ? colors.error : colors.inputBorder,
          borderRadius: 8,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        }}
      >
        {options.map((option, index) => {
          const isSelected = option.value === value;
          const isOptionDisabled = disabled || option.disabled;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{
                selected: isSelected,
                disabled: Boolean(isOptionDisabled),
              }}
              disabled={isOptionDisabled}
              onPress={() => onValueChange(option.value)}
              testID={testID ? `${testID}-option-${option.value}` : undefined}
              style={({ pressed }) => ({
                minHeight: 48,
                paddingHorizontal: 12,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: index === 0 ? 0 : 1,
                borderTopColor: colors.inputBorder,
                opacity: isOptionDisabled ? 0.5 : pressed ? 0.9 : 1,
              })}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: isSelected ? colors.primary : colors.inputBorder,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                  backgroundColor: colors.background,
                }}
              >
                {isSelected ? (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: colors.primary,
                    }}
                  />
                ) : null}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.title, fontSize: 15, fontWeight: '500' }}>
                  {option.label}
                </Text>
                {option.description ? (
                  <Text style={{ color: colors.body, fontSize: 13, marginTop: 2 }}>
                    {option.description}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      {hasError ? (
        <Text style={{ color: colors.error, fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
