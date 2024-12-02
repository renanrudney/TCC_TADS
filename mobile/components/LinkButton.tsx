import { Link } from 'expo-router';
import { type ComponentProps } from 'react';
import { StyleSheet } from 'react-native';

type Props = ComponentProps<typeof Link> & { text: string }

export function LinkButton({ href, text }: Props) {
  return <Link style={styles.button} replace href={href}>{text}</Link>
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#145a73',
    color: '#fff',
    width: 150,
    paddingVertical: 12,
    margin: 20,
    borderRadius: 25,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
})
