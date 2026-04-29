import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = {
  label: string;
  value: string | null;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function Select({
  label,
  value,
  options,
  onValueChange,
  placeholder = 'Select an option',
  error,
  disabled = false,
  testID,
  style,
  labelStyle,
}: SelectProps) {
  const { colors } = useEvolveUI();
  const [open, setOpen] = useState(false);
  const hasError = Boolean(error && error.length > 0);
  const borderColor = hasError ? colors.error : colors.inputBorder;

  const selectedLabel = useMemo(() => {
    if (value === null) {
      return '';
    }
    const found = options.find((o) => o.value === value);
    return found?.label ?? '';
  }, [options, value]);

  const displayValue = selectedLabel || placeholder;
  const isPlaceholder = !selectedLabel;

  return (
    <View style={[{ width: '100%' }, style]} testID={testID}>
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

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        testID={testID ? `${testID}-trigger` : undefined}
        style={({ pressed }) => [
          {
            minHeight: 48,
            borderRadius: 8,
            borderWidth: 1,
            borderColor,
            backgroundColor: colors.surface,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            color: isPlaceholder ? colors.body : colors.title,
            fontSize: 16,
            paddingRight: 8,
          }}
        >
          {displayValue}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.body} />
      </Pressable>

      {hasError && (
        <Text style={{ color: colors.error, fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      )}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.35)',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
          onPress={() => setOpen(false)}
        >
          <Pressable
            onPress={() => {}}
            style={{
              borderRadius: 12,
              backgroundColor: colors.background,
              maxHeight: '60%',
              paddingVertical: 8,
            }}
          >
            <ScrollView>
              {options.map((option) => {
                const isActive = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    disabled={option.disabled}
                    onPress={() => {
                      onValueChange(option.value);
                      setOpen(false);
                    }}
                    testID={
                      testID ? `${testID}-option-${option.value}` : undefined
                    }
                    style={({ pressed }) => ({
                      minHeight: 44,
                      paddingHorizontal: 14,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      opacity: option.disabled ? 0.4 : pressed ? 0.85 : 1,
                    })}
                  >
                    <Text style={{ color: colors.title, fontSize: 15 }}>
                      {option.label}
                    </Text>
                    {isActive ? (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={colors.primary}
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
