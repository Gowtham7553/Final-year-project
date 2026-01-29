import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/5686541.png')}
          style={styles.logoIcon}
        />
        <Text style={styles.logoText}>Hope Connect</Text>
      </View>

      {/* Illustration Card */}
      <View style={styles.imageCard}>
        <Image
          source={require('../assets/un-child-rights.jpg')}
          style={styles.heroImage}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Every Child Deserves a{'\n'}Future
      </Text>

      {/* Description */}
      <Text style={styles.description}>
        Join a community dedicated to lifting children out of poverty.
        Whether you are a volunteer or a shelter, your help starts here.
      </Text>



      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Login */}
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Log in</Text>
        </TouchableOpacity>
      </Text>

    </View>
  );
}

const PURPLE = '#8B5CF6';
const LIGHT_BG = '#F7F5FF';
const TEXT_GRAY = '#6B7280';
const DARK_PURPLE = '#3B1D6A';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
    paddingHorizontal: 24,
    paddingTop: 50,
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  logoIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: PURPLE,
  },

  imageCard: {
    width: width - 48,
    height: 260,
    backgroundColor: '#EAF2EA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },

  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: DARK_PURPLE,
    textAlign: 'center',
    marginBottom: 16,
  },

  description: {
    fontSize: 16,
    color: TEXT_GRAY,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },

  dots: {
    flexDirection: 'row',
    marginBottom: 40,
  },

  activeDot: {
    width: 26,
    height: 8,
    borderRadius: 4,
    backgroundColor: PURPLE,
    marginHorizontal: 4,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD6FE',
    marginHorizontal: 4,
  },

  button: {
    width: '100%',
    height: 58,
    backgroundColor: PURPLE,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 18,
    elevation: 6,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  loginText: {
    fontSize: 14,
    color: TEXT_GRAY,
  },

  loginLink: {
    color: PURPLE,
    fontWeight: '700',
  },
});
