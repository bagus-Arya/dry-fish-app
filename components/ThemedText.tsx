import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'kicker' | 'body' | 'titleLearning' | 'description' | 'stepsTitle' | 'stepsDescription';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'kicker' ? styles.kicker : undefined,
        type === 'body' ? styles.body : undefined,
        type === 'titleLearning' ? styles.titleLearning : undefined,
        type === 'description' ? styles.description : undefined,
        type === 'stepsTitle' ? styles.stepsTitle : undefined,
        type === 'stepsDescription' ? styles.stepsDescription : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#38b6ff',
  },
  kicker: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 20,
    fontWeight: 'light',
    color: '#ffffff',
  },
  titleLearning: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepsDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
});
