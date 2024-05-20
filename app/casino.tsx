import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import dice1 from '../assets/images/dice-six-faces-one.png';
import dice2 from '../assets/images/dice-six-faces-two.png';
import dice3 from '../assets/images/dice-six-faces-three.png';
import dice4 from '../assets/images/dice-six-faces-four.png';
import dice5 from '../assets/images/dice-six-faces-five.png';
import dice6 from '../assets/images/dice-six-faces-six.png';

interface CasinoProps {
    onLogout: () => void;
}


const Casino = ({ onLogout }: CasinoProps) => {
  const navigation = useNavigation();
  const [playerFortune, setPlayerFortune] = useState(50);
  const [casinoFortune, setCasinoFortune] = useState(Math.floor(Math.random() * 91) + 10);
  // random fortune between 10 and 100

  
  const [roundResults, setRoundResults] = useState('');
  const [resultsHistory, setResultsHistory] = useState<string[]>([]);
  const [diceImage, setDiceImage] = useState(dice1);

  const rollDice = () => {
    const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
    const randomIndex = Math.floor(Math.random() * diceImages.length);
    const randomImage = diceImages[randomIndex];

    // Change the dice image every 100ms for 3 seconds
    const intervalId = setInterval(() => {
      setDiceImage(diceImages[Math.floor(Math.random() * diceImages.length)]);
    }, 100);

    // After 3 seconds, clear the interval and set the dice image to the initially chosen random image
    setTimeout(() => {
      clearInterval(intervalId);
      setDiceImage(randomImage);

       // Update fortunes based on game's logic
       let result ='';
  if (randomIndex === 1 || randomIndex === 2) { // player wins
    setPlayerFortune(prevFortune => prevFortune + 1);
    setCasinoFortune(prevFortune => prevFortune - 1);
  } else { // casino wins
    setPlayerFortune(prevFortune => prevFortune - 1);
    setCasinoFortune(prevFortune => prevFortune + 1);
  }       // Check if the game is over
  if (playerFortune == 0 || casinoFortune == 0) {
    result = playerFortune == 0 ? 'Casino wins!' : 'Player wins!';
    setRoundResults(result);
    // Update results history
  setResultsHistory(prevHistory => [...prevHistory, result]);
  }
  

  
}, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.link} onPress={() => {}}>
        <Icon name="gamepad" size={24} color="white" />
          <Text style={styles.headerText}>Player's Ruin</Text>
        </TouchableOpacity>
        <View style={styles.nav}>
          <TouchableOpacity style={styles.navLink} onPress={() => {}}>
            <Text style={styles.navText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Icon name="sign-out" size={20} color="white" 
            onPress={() => {
                onLogout();
            }} />
            <Text style={styles.srOnly}  >Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Player's Fortune</Text>
          <Text style={[styles.cardContent, styles.playerFortune]}>${playerFortune}</Text>
        </View>
        <TouchableOpacity style={styles.card} onPress={rollDice}>
            <Image source={diceImage} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Casino's Fortune</Text>
          <Text style={[styles.cardContent, styles.casinoFortune]}>${casinoFortune}</Text>
        </View>
      </View>
      <View style={styles.resultsContainer}>
  <Text style={styles.resultsTitle}>Round Results</Text>
  <Text style={styles.resultsText}>{roundResults}</Text>
  {resultsHistory.map((result, index) => (
    <View key={index} style={styles.resultsCard}>
      <Text style={styles.resultsCardTitle}>Round {index + 1}</Text>
      <Text style={styles.resultsCardContent}>{result}</Text>
    </View>
  ))}</View>
    </ScrollView>
  );
}

const Dice1Icon = (props:any) => (
  <Icon name="dice-one" size={24} color="white" {...props} />
);

const LogOutIcon = (props:any) => (
  <Icon name="sign-out" size={20} color="white" {...props} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#111827',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    marginRight: 16,
  },
  navText: {
    color: '#D1D5DB',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  srOnly: {
    display: 'none',
  },
  main: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  playerFortune: {
    color: '#10B981',
  },
  casinoFortune: {
    color: '#EF4444',
  },
  resultsContainer: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    margin: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  resultsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  resultsCard: {
    flex: 1,
    alignItems: 'center',
  },
  resultsCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultsCardContent: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exitButton: {
    borderWidth: 1,
    borderColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  exitButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    height: 24,
    width: 24,
  },
  logoutIcon: {
    height: 20,
    width: 20,
  },
});

export default Casino;
