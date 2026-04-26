import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
  type StyleProp,
  type TextStyle,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type InputVariant =
  | 'general'
  | 'email'
  | 'password'
  | 'username'
  | 'number'
  | 'code';

type InputShared = {
  /** Label above the field, left-aligned. */
  label: string;
  /** When set, the field border uses `colors.error` and the message shows under the field. */
  error?: string;
  testID?: string;
  /** Optional outer container style. */
  style?: StyleProp<ViewStyle>;
};

type StandardInputProps = InputShared & {
  variant?: Exclude<InputVariant, 'code'>;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** @default true */
  editable?: boolean;
  inputStyle?: StyleProp<TextStyle>;
};

type CodeInputProps = InputShared & {
  variant: 'code';
  value: string;
  onChangeText: (text: string) => void;
  /** How many one-digit cells. @default 6 */
  codeLength?: number;
};

export type InputProps = StandardInputProps | CodeInputProps;

const ICON = 20;

type IonName = React.ComponentProps<typeof Ionicons>['name'];

export function Input(props: InputProps) {
  if (props.variant === 'code') {
    return <CodeInputField {...props} />;
  }
  return <SingleLineInput {...props} variant={props.variant ?? 'general'} />;
}

type SingleWithVariant = StandardInputProps & { variant: Exclude<InputVariant, 'code'> };

function SingleLineInput({
  label,
  variant,
  value,
  onChangeText,
  placeholder,
  editable = true,
  error,
  testID,
  style,
  inputStyle,
}: SingleWithVariant) {
  const { colors } = useEvolveUI();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = variant === 'password';
  const hasLeftIcon = variant !== 'general';
  const showToggle = isPassword;
  const leftIcon = getLeftIconName(variant);
  const hasError = Boolean(error && error.length > 0);
  const borderColor = hasError ? colors.error : colors.inputBorder;

  const textInputProps: TextInputProps = {
    value,
    onChangeText,
    placeholder,
    editable,
    testID: testID ? `${testID}-input` : undefined,
    placeholderTextColor: colors.body,
    style: [
      {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.title,
        paddingLeft: hasLeftIcon ? 8 : 12,
        paddingRight: showToggle ? 40 : 12,
        minHeight: 48,
      },
      inputStyle,
    ],
  };

  if (isPassword) {
    textInputProps.autoCapitalize = 'none';
    textInputProps.autoCorrect = false;
    textInputProps.autoComplete = 'password';
    textInputProps.textContentType = 'password';
    textInputProps.secureTextEntry = !showPassword;
  } else {
    if (variant === 'email') {
      textInputProps.keyboardType = 'email-address';
      textInputProps.autoCapitalize = 'none';
      textInputProps.autoCorrect = false;
      textInputProps.autoComplete = 'email';
      textInputProps.textContentType = 'emailAddress';
    } else if (variant === 'username') {
      textInputProps.autoCapitalize = 'none';
      textInputProps.autoCorrect = false;
      textInputProps.textContentType = 'username';
      textInputProps.autoComplete = 'username';
    } else if (variant === 'number') {
      textInputProps.keyboardType = 'numeric';
    }
  }

  return (
    <View style={[{ width: '100%' }, style]} testID={testID}>
      <Text
        style={{
          color: colors.title,
          fontSize: 14,
          fontWeight: '500',
          marginBottom: 6,
          alignSelf: 'flex-start',
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor,
          borderRadius: 8,
          backgroundColor: colors.surface,
          minHeight: 48,
        }}
      >
        {hasLeftIcon && leftIcon && (
          <Ionicons
            name={leftIcon}
            size={ICON}
            color={colors.body}
            style={{ marginLeft: 12 }}
          />
        )}
        <TextInput {...textInputProps} />
        {showToggle && (
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              paddingRight: 8,
            }}
          >
            <Pressable
              onPress={() => setShowPassword((p) => !p)}
              hitSlop={8}
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={ICON}
                color={colors.body}
              />
            </Pressable>
          </View>
        )}
      </View>
      {hasError && (
        <Text style={{ color: colors.error, fontSize: 12, marginTop: 4 }}>{error}</Text>
      )}
    </View>
  );
}

function getLeftIconName(
  variant: Exclude<InputVariant, 'code'>
): IonName | null {
  switch (variant) {
    case 'email':
      return 'mail-outline';
    case 'password':
      return 'lock-closed-outline';
    case 'username':
      return 'person-outline';
    case 'number':
      return 'keypad-outline';
    default:
      return null;
  }
}

function CodeInputField({
  label,
  value,
  onChangeText,
  error,
  testID,
  style,
  codeLength = 6,
}: CodeInputProps) {
  const { colors } = useEvolveUI();
  const hasError = Boolean(error && error.length > 0);
  const errBorder = hasError ? colors.error : colors.inputBorder;

  const clean = (value || '').replace(/\D/g, '').slice(0, codeLength);
  const refs = useRef<(TextInput | null)[]>([]);

  const onChange = (index: number, text: string) => {
    const only = text.replace(/\D/g, '');

    if (only.length > 1) {
      const next = only.slice(0, codeLength);
      onChangeText(next);
      const last = next.length;
      const focusTo = last >= codeLength ? codeLength - 1 : last;
      requestAnimationFrame(() => refs.current[focusTo]?.focus());
      return;
    }

    if (only.length === 1) {
      const next = clean.substring(0, index) + only + clean.substring(index + 1);
      onChangeText(next);
      if (index < codeLength - 1) {
        requestAnimationFrame(() => refs.current[index + 1]?.focus());
      }
      return;
    }

    if (only.length === 0) {
      if (index < clean.length) {
        const next = clean.substring(0, index) + clean.substring(index + 1);
        onChangeText(next);
        if (index > 0) {
          requestAnimationFrame(() => refs.current[index - 1]?.focus());
        }
      }
    }
  };

  const onKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key !== 'Backspace') {
      return;
    }
    const ch = index < clean.length ? clean[index]! : '';
    if (!ch && index > 0) {
      requestAnimationFrame(() => refs.current[index - 1]?.focus());
    }
  };

  return (
    <View style={[{ width: '100%' }, style]} testID={testID}>
      <Text
        style={{
          color: colors.title,
          fontSize: 14,
          fontWeight: '500',
          marginBottom: 6,
          alignSelf: 'flex-start',
        }}
      >
        {label}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: codeLength }, (_, i) => {
          const ch = i < clean.length ? (clean[i] ?? '') : '';
          return (
            <View
              key={i}
              style={{
                flex: 1,
                marginLeft: i > 0 ? 6 : 0,
                borderWidth: 1,
                borderColor: errBorder,
                borderRadius: 8,
                backgroundColor: colors.surface,
                minHeight: 48,
              }}
            >
              <TextInput
                ref={(el) => {
                  refs.current[i] = el;
                }}
                value={ch}
                onChangeText={(t) => onChange(i, t)}
                onKeyPress={(e) => onKeyPress(i, e)}
                testID={testID ? `${testID}-code-${i}` : undefined}
                keyboardType="number-pad"
                textContentType={i === 0 && Platform.OS === 'ios' ? 'oneTimeCode' : 'none'}
                maxLength={1}
                textAlign="center"
                style={{
                  flex: 1,
                  minHeight: 48,
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.title,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                }}
              />
            </View>
          );
        })}
      </View>
      {hasError && (
        <Text style={{ color: colors.error, fontSize: 12, marginTop: 4 }}>{error}</Text>
      )}
    </View>
  );
}
