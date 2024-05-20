import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
      return;
    }

    try {
      // Save the user's credentials securely
      await SecureStore.setItemAsync('email', email);
      await SecureStore.setItemAsync('password', password);

        // Redirect to the login screen
        navigation.navigate("login");
      
      ToastAndroid.show('Account created successfully', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Player's Ruin</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>
          Get started with our platform today.
        </Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#888"
            style={styles.input}
            textContentType="name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#888"
            style={styles.input}
            secureTextEntry
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Confirm your password"
            placeholderTextColor="#888"
            style={styles.input}
            secureTextEntry
            textContentType="password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link style={styles.link} href="/login">
          Login
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#111827',
  },
  link: {
    fontSize: 14,
    color: '#4F46E5',
    marginLeft: 5,
  },
});
