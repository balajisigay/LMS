import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface HeaderProps {
  onLoginPress?: () => void;
  onJoinPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoginPress,
  onJoinPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoText}>L</Text>
          </View>
          <Text style={styles.logoName}>Lumina</Text>
        </View>

        {/* Right Actions */}
        <View style={styles.rightActions}>
          <TouchableOpacity onPress={onLoginPress}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.joinButton} onPress={onJoinPress}>
            <Text style={styles.joinButtonText}>Join for free</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: colors.background,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  logoName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  loginText: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  joinButtonText: {
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
