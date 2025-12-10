import React from 'react';
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TrustedPartners } from '../components/TrustedPartners';
import { Categories } from '../components/Categories';
import { LearningPaths } from '../components/LearningPaths';
import { InstructorSection } from '../components/InstructorSection';
import { Footer } from '../components/Footer';
import { colors } from '../styles/colors';

interface LandingScreenProps {
  navigation?: any;
  onViewCourse?: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ navigation, onViewCourse }) => {
  const handleExplorePress = () => {
    console.log('Explore Courses pressed');
    // navigation?.navigate('Courses');
  };

  const handleWatchDemoPress = () => {
    console.log('Watch Demo pressed');
    // Could open a modal or navigate to video player
  };

  const handleLoginPress = () => {
    console.log('Log in pressed');
    // navigation?.navigate('Login');
  };

  const handleJoinPress = () => {
    console.log('Join for free pressed');
    // navigation?.navigate('SignUp');
  };

  const handleCategoryPress = (category: string) => {
    console.log('Category pressed:', category);
  };

  const handleCoursePress = (courseId: string) => {
    console.log('Course pressed:', courseId);
    onViewCourse?.();
  };

  const handlePathPress = (pathId: string) => {
    console.log('Learning path pressed:', pathId);
    // navigation?.navigate('LearningPath', { pathId });
  };

  const handleStartTeachingPress = () => {
    console.log('Start Teaching pressed');
    // navigation?.navigate('InstructorSignUp');
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
          translucent={false}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Header onLoginPress={handleLoginPress} onJoinPress={handleJoinPress} />
          <HeroSection
            onExplorePress={handleExplorePress}
            onWatchDemoPress={handleWatchDemoPress}
          />
          <TrustedPartners />
          <Categories
            onCategoryPress={handleCategoryPress}
            onCoursePress={handleCoursePress}
          />
          <LearningPaths onPathPress={handlePathPress} />
          <InstructorSection onPress={handleStartTeachingPress} />
          <Footer />
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
