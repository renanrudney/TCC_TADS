import { type ComponentProps } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = Omit<ComponentProps<typeof Pressable>, 'href'> & { text: string, type: 'danger' | 'success' };

export function ActionButton({ onPress, text, type, disabled }: Props) {
  const typeStyle = type === 'danger' ? styles.danger : styles.success
  const disabledStyle = disabled ? styles.disabled : ''

  return (
    <Pressable
      style={[styles.button, typeStyle, disabledStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  danger: { backgroundColor: 'red' },
  success: { backgroundColor: 'green' },
  disabled: { backgroundColor: '#cccccc', color: '#666666'},
  button: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25, elevation: 3  },
  text: { color: 'white', fontSize: 24, textAlign: 'center', fontWeight: '500' }
})
