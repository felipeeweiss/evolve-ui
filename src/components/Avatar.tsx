import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import type {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarProps = {
  /** Image URI or require() source. When omitted or fails to load, `initials` are shown. */
  source?: ImageSourcePropType;
  /** Up to 2 characters shown when the image is absent or fails. */
  initials?: string;
  size?: AvatarSize;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const SIZE_MAP: Record<AvatarSize, { box: number; font: number }> = {
  sm: { box: 32, font: 12 },
  md: { box: 48, font: 18 },
  lg: { box: 64, font: 24 },
};

export function Avatar({
  source,
  initials,
  size = 'md',
  testID,
  style,
  textStyle,
}: AvatarProps) {
  const { colors } = useEvolveUI();
  const [imgError, setImgError] = useState(false);
  const { box, font } = SIZE_MAP[size];
  const radius = box / 2;

  const showImage = Boolean(source) && !imgError;
  const displayInitials = (initials ?? '').slice(0, 2).toUpperCase();

  const containerStyle: ViewStyle = {
    width: box,
    height: box,
    borderRadius: radius,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  return (
    <View
      testID={testID}
      accessibilityRole="image"
      style={[containerStyle, style]}
    >
      {showImage ? (
        <Image
          source={source!}
          onError={() => setImgError(true)}
          style={{ width: box, height: box, borderRadius: radius }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={[
            {
              color: colors.primaryText,
              fontSize: font,
              fontWeight: '600',
              includeFontPadding: false,
            },
            textStyle,
          ]}
          numberOfLines={1}
        >
          {displayInitials}
        </Text>
      )}
    </View>
  );
}
