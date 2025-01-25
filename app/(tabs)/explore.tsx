import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function TabTwoScreen() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (!hasLaunched) {
        setShowOnboarding(true);
        await AsyncStorage.setItem('hasLaunched', 'true');
      }
    };
    checkOnboarding();
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleNext = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
      scrollViewRef.current?.scrollTo({ x: width * (currentSlide + 1), animated: true });
    } else {
      handleOnboardingComplete();
    }
  };

  return showOnboarding ? (
    <View style={styles.onboardingContainer}>
      {/* ScrollView for Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const slide = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slide);
        }}
        scrollEventThrottle={16}
      >
        {/* Onboarding Slides */}
        <View style={styles.slide}>
          <Image
            source={require('@/assets/images/Trust.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('@/assets/images/Send_money_abroad.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('@/assets/images/Receive_Money.png')}
            style={styles.image}
          />
        </View>
      </ScrollView>

      {/* Slider Indicator */}
      <View style={styles.sliderContainer}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={[
              styles.sliderDot,
              currentSlide === index && styles.activeSliderDot,
            ]}
          />
        ))}
      </View>

      {/* Text Below Slider */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {currentSlide === 0
            ? 'Trusted by millions of people, part of one part'
            : currentSlide === 1
            ? 'Spend money abroad, and track your expense'
            : 'Receive Money From Anywhere In The World'}
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text> 
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Explore Screen Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  slide: {
    width,
    height: height * 0.6, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '50%', 
    resizeMode: 'contain',
  },
  sliderContainer: {
    position: 'absolute',
    top: height * 0.60, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sliderDot: {
    width: 30,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#CCC',
    marginHorizontal: 5,
    transform: [{ scale: 1.2 }],
  },
  activeSliderDot: {
    width:20,
    backgroundColor: '#007BFF',
    transform: [{ scale: 0.9 }],
  },
  textContainer: {
    position: 'absolute', 
    top: height * 0.65, 
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  nextButton: {
    position: 'absolute',
    bottom: 80, 
    left: 20,
    right: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});