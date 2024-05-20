import { Image, StyleSheet, Platform } from 'react-native';


import { useState } from 'react';
import Login from '../login';
import Casino from '../casino';

export default function HomeScreen() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }
  
  return (
    <Casino onLogout={() => setIsAuthenticated(false)} />

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
