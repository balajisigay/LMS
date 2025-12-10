import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface TrustedPartnersProps {}

export const TrustedPartners: React.FC<TrustedPartnersProps> = () => {
  const partners = ['Google', 'Spotify', 'Airbnb', 'Amazon', 'Meta'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRUSTED BY INNOVATORS AT</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.partnersScroll}
        contentContainerStyle={styles.partnersContent}
      >
        {partners.map((partner, index) => (
          <View key={index} style={styles.partnerItem}>
            <Text style={styles.partnerName}>{partner}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    textAlign: 'center',
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textLight,
    letterSpacing: 0.5,
    marginBottom: spacing.xl,
  },
  partnersScroll: {
    marginHorizontal: -spacing.lg,
  },
  partnersContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerItem: {
    paddingHorizontal: spacing.lg,
  },
  partnerName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textLighter,
  },
});
