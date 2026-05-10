import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type SwitchProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const TRACK_WIDTH = 44;
const THUMB_SIZE = 20;
const THUMB_MARGIN = 3;
const THUMB_ON = TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN;
const THUMB_OFF = THUMB_MARGIN;
const ANIM_MS = 180;

export function Switch({
  label,
  checked,
  onChange,
  description,
  disabled = false,
  testID,
  style,
  labelStyle,
}: SwitchProps) {
  const { colors } = useEvolveUI();
  const translateX = useRef(new Animated.Value(checked ? THUMB_ON : THUMB_OFF)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: checked ? THUMB_ON : THUMB_OFF,
      duration: ANIM_MS,
      useNativeDriver: true,
    }).start();
  }, [checked, translateX]);

  const trackHeight = THUMB_SIZE + THUMB_MARGIN * 2;
  const trackRadius = trackHeight / 2;

  return (
    <View style={[{ width: '100%' }, style]} testID={testID}>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled }}
        disabled={disabled}
        onPress={() => onChange(!checked)}
        testID={testID ? `${testID}-pressable` : undefined}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 48,
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.inputBorder,
          backgroundColor: colors.surface,
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
        })}
      >
        <View style={{ flex: 1, marginRight: 12 }}>
          {label ? (
            <Text
              style={[
                { color: colors.title, fontSize: 15, fontWeight: '500' },
                labelStyle,
              ]}
            >
              {label}
            </Text>
          ) : null}
          {description ? (
            <Text style={{ color: colors.body, fontSize: 13, marginTop: 2 }}>
              {description}
            </Text>
          ) : null}
        </View>

        <View
          style={{
            width: TRACK_WIDTH,
            height: trackHeight,
            borderRadius: trackRadius,
            backgroundColor: checked ? colors.primary : colors.inputBorder,
            justifyContent: 'center',
          }}
        >
          <Animated.View
            style={{
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              backgroundColor: colors.primaryText,
              transform: [{ translateX }],
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
}
