import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import ConfirmScreen from './screens/ConfirmScreen';

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


  const gameOverHandler = () => {
    //   setGameState('CONFIRM');
  };

  const confirmHandler = () => {
    // setGameState('GAME_OVER');
  };

  const cancelHandler = () => {
    // setGameState('HOME');
  };

  const restartGameHandler = () => {
    // setGameState('HOME');
  };


  return (
    <View style={styles.screen}>
      <GameScreen />
      {/* <ConfirmScreen name={name} email={email}
      handleModalConfirm={handleModalConfirm} handleModalCancel={handleModalCancel} visible={isModalVisible}/>
      {gameState === "LOGIN" ? <StartScreen startGameHandler={startGameHandler} /> : <GameScreen />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
