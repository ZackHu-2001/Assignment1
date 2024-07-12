// Import necessary modules and components from React and React Native
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen'; // Import the StartScreen component
import GameScreen from './screens/GameScreen'; // Import the GameScreen component
import ConfirmScreen from './screens/ConfirmScreen'; // Import the ConfirmScreen component
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for background gradient
import colors from './utils/colors'; // Import a utility file for color values

// Define the main App component
export default function App() {
  const [gameState, setGameState] = useState('LOGIN'); // State to manage the current screen ('LOGIN' or 'GAME')
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage the visibility of the confirmation modal

  const [name, setName] = useState(''); // State to store the user's name
  const [email, setEmail] = useState(''); // State to store the user's email

  // Function to handle the start of the game, triggered from the StartScreen
  const startGameHandler = (name, email) => {
    setName(name); // Set the user's name
    setEmail(email); // Set the user's email
    setIsModalVisible(true); // Show the confirmation modal
  };

  // Function to handle confirmation in the modal
  const handleModalConfirm = () => {
    setIsModalVisible(false); // Hide the confirmation modal
    setGameState("GAME"); // Change the state to show the GameScreen
  };

  // Function to handle cancellation in the modal
  const handleModalCancel = () => {
    setIsModalVisible(false); // Hide the confirmation modal
  };

  // Function to handle restarting the game
  const restartGameHandler = () => {
    setGameState('LOGIN'); // Change the state to show the StartScreen
    setIsModalVisible(false); // Hide the confirmation modal
    setName(''); // Reset the user's name
    setEmail(''); // Reset the user's email
  };

  return (
    // Apply a linear gradient background to the entire app
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.screen}
    >
      {/* Confirmation modal component */}
      <ConfirmScreen 
        name={name} 
        email={email}
        handleModalConfirm={handleModalConfirm} 
        handleModalCancel={handleModalCancel} 
        visible={isModalVisible} 
      />
      {/* Conditional rendering of screens based on gameState */}
      {gameState === "LOGIN" ? 
        <StartScreen startGameHandler={startGameHandler} /> : 
        <GameScreen restartGameHandler={restartGameHandler} />
      }
    </LinearGradient>
  );
}

// Define styles for the App component
const styles = StyleSheet.create({
  screen: {
    flex: 1, // Make the screen take up the entire space
  },
});
