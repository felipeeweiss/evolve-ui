import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useEvolveUI } from '../theme/EvolveUIProvider';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export type ToastProps = {
  visible: boolean;
  variant: ToastVariant;
  title: string;
  description?: string;
  onDismiss?: () => void;
  duration?: number;
  testID?: string;
};

const SLIDE = 200;
const ENTER_MS = 300;
const EXIT_MS = 300;
const DEFAULT_MS = 3000;

type Ion = React.ComponentProps<typeof Ionicons>['name'];

const ICONS: Record<ToastVariant, Ion> = {
  success: 'checkmark-circle',
  error: 'close-circle',
  info: 'information-circle',
  warning: 'warning',
};

function iconColor(
  variant: ToastVariant,
  c: {
    toastIconSuccess: string;
    toastIconError: string;
    toastIconInfo: string;
    toastIconWarning: string;
  }
): string {
  switch (variant) {
    case 'success':
      return c.toastIconSuccess;
    case 'error':
      return c.toastIconError;
    case 'info':
      return c.toastIconInfo;
    case 'warning':
      return c.toastIconWarning;
  }
}

export function Toast({
  visible,
  variant,
  title,
  description,
  onDismiss,
  duration = DEFAULT_MS,
  testID,
}: ToastProps) {
  const { colors } = useEvolveUI();
  const translateY = useRef(new Animated.Value(-SLIDE)).current;
  const [open, setOpen] = useState(false);
  const waitRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRef = useRef(false);
  const cancelledRef = useRef(true);
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;
  const durationRef = useRef(duration);
  durationRef.current = duration;

  useEffect(() => {
    if (visible) {
      cancelledRef.current = false;
      if (waitRef.current) {
        clearTimeout(waitRef.current);
        waitRef.current = null;
      }
      openRef.current = true;
      setOpen(true);
      translateY.setValue(-SLIDE);
      requestAnimationFrame(() => {
        if (cancelledRef.current) {
          return;
        }
        Animated.timing(translateY, {
          toValue: 0,
          duration: ENTER_MS,
          useNativeDriver: true,
        }).start((ok) => {
          if (!ok || cancelledRef.current) {
            return;
          }
          if (waitRef.current) {
            clearTimeout(waitRef.current);
          }
          waitRef.current = setTimeout(() => {
            waitRef.current = null;
            if (cancelledRef.current) {
              return;
            }
            Animated.timing(translateY, {
              toValue: -SLIDE,
              duration: EXIT_MS,
              useNativeDriver: true,
            }).start((fin) => {
              if (fin) {
                openRef.current = false;
                setOpen(false);
                onDismissRef.current?.();
              }
            });
          }, durationRef.current);
        });
      });
      return;
    }
    cancelledRef.current = true;
    if (waitRef.current) {
      clearTimeout(waitRef.current);
      waitRef.current = null;
    }
    if (openRef.current) {
      Animated.timing(translateY, {
        toValue: -SLIDE,
        duration: EXIT_MS,
        useNativeDriver: true,
      }).start((fin) => {
        if (fin) {
          openRef.current = false;
          setOpen(false);
        }
      });
    } else {
      setOpen(false);
    }
  }, [visible]);

  useEffect(
    () => () => {
      cancelledRef.current = true;
      if (waitRef.current) {
        clearTimeout(waitRef.current);
        waitRef.current = null;
      }
    },
    []
  );

  const topPad =
    (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0) + (Platform.OS === 'ios' ? 52 : 8);

  if (!open) {
    return null;
  }

  const ic = iconColor(variant, colors);
  return (
    <Modal visible={open} testID={testID} transparent animationType="none" statusBarTranslucent>
      <View style={{ flex: 1 }} pointerEvents="box-none">
        <View style={{ paddingHorizontal: 16, paddingTop: topPad }} pointerEvents="box-none">
          <Animated.View
            style={{
              transform: [{ translateY }],
              backgroundColor: colors.toastBackground,
              borderRadius: 12,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'flex-start',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Ionicons name={ICONS[variant]} size={28} color={ic} style={{ marginRight: 12 }} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ color: colors.title, fontSize: 15, fontWeight: '600' }} numberOfLines={2}>
                {title}
              </Text>
              {description ? (
                <Text
                  style={{ color: colors.body, fontSize: 13, marginTop: 4 }}
                  numberOfLines={2}
                >
                  {description}
                </Text>
              ) : null}
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}
