import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import { LinearGradient } from 'expo-linear-gradient';
import colors from './utils/colors';

export default function App() {
  const [gameState, setGameState] = useState('LOGIN');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const startGameHandler = (name, email) => {
    setName(name);
    setEmail(email);
    setIsModalVisible(true);
  };

  const handleModalConfirm = () => {
    setIsModalVisible(false);
    setGameState("GAME");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const restartGameHandler = () => {
    setGameState('LOGIN');
    setIsModalVisible(false);
    setName('');
    setEmail('');
  };

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.screen}
    >
      <ConfirmScreen name={name} email={email}
        handleModalConfirm={handleModalConfirm} handleModalCancel={handleModalCancel} visible={isModalVisible} />
      {gameState === "LOGIN" ? <StartScreen startGameHandler={startGameHandler} /> : <GameScreen restartGameHandler={restartGameHandler} />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
