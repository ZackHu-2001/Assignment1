// Import necessary modules and components from React and React Native
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import CardComponent from '../components/CardComponent'; // Import a custom CardComponent
import InputComponent from '../components/InputComponent'; // Import a custom InputComponent
import ButtonComponent from '../components/ButtonComponent'; // Import a custom ButtonComponent

// Configuration object for game settings
const config = {
    time: 60, // Initial time for the game
    attempts: 5, // Number of attempts allowed
}

// Define the GameScreen component
const GameScreen = ({ restartGameHandler }) => {
    const [randomNumber, setRandomNumber] = useState(null); // State to store the random number
    const [guess, setGuess] = useState(''); // State to store the user's guess
    const [attempts, setAttempts] = useState(config.attempts); // State to store the remaining attempts
    const [time, setTime] = useState(config.time); // State to store the remaining time
    const [hintUsed, setHintUsed] = useState(false); // State to track if the hint is used
    const [guessed, setGuessed] = useState(false); // State to track if a guess was made
    const [guessedCorrectly, setGuessedCorrectly] = useState(false); // State to track if the guess was correct
    const [gameOverReason, setGameOverReason] = useState(''); // State to store the reason for game over
    const inputRef = useRef(null); // Reference to the input field

    // Effect to initialize game state and start the timer
    useEffect(() => {
        initGameState();
        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1); // Decrement the time every second
        }, 1000);

        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []);

    // Effect to handle game over when time runs out
    useEffect(() => {
        if (time === 0) {
            setGameOverReason('out of time');
        }
    }, [time]);

    // Function to initialize the game state
    const initGameState = () => {
        const num = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
        setRandomNumber(num); // Set the random number
        setGuess(''); // Clear the guess input
        setGuessed(false); // Reset guessed state
        setAttempts(config.attempts); // Reset attempts
        setTime(config.time); // Reset time
        setHintUsed(false); // Reset hint usage
        setGuessedCorrectly(false); // Reset guessed correctly state
        setGameOverReason(''); // Clear game over reason
    };

    // Function to handle user's guess submission
    const handleGuess = () => {
        const userGuess = parseInt(guess);
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            Alert.alert('Invalid input', 'Please enter a number between 1 and 100.');
            return;
        }

        inputRef.current.blur(); // Blur the input field to hide the keyboard
        setGuessed(true); // Set guessed state to true
        setGuess(''); // Clear the guess input

        if (userGuess === randomNumber) {
            setGuessedCorrectly(true); // Set guessed correctly state to true if the guess is correct
        } else {
            if (attempts === 1) {
                setGameOverReason('out of attempts'); // Set game over reason if no attempts left
            }
            setAttempts(prevAttempts => prevAttempts - 1); // Decrement the attempts
        }
    };

    // Function to use a hint
    const useHint = () => {
        setHintUsed(true); // Set hint used state to true
    };

    // Function to allow the user to try again
    const tryAgain = () => {
        setGuessed(false); // Reset guessed state
    };

    // Function to end the game
    const endTheGame = () => {
        setGameOverReason('ended'); // Set game over reason to 'ended'
    };

    // Function to start a new game
    const newGame = () => {
        initGameState(); // Initialize the game state
    };

    // Function to restart the game and reset everything
    const RestartGame = () => {
        initGameState(); // Initialize the game state
        restartGameHandler(); // Call the restartGameHandler prop
    };

    return (
        <View style={styles.screen}>
            <ButtonComponent title="Restart" onPress={RestartGame} />
            <CardComponent>
                {/* Uncomment this line to show the answer */}
                {/* {randomNumber && <Text>Random Number: {randomNumber}</Text>} */}
                {gameOverReason ? (
                    <>
                        <Text style={styles.message}>The game is over!</Text>
                        <Image style={styles.image} source={require('../assets/image.png')} />
                        {gameOverReason === 'ended' ? null :
                            <Text>You are {gameOverReason === 'out of time' ? 'out of time' : 'out of attempts'}.</Text>}
                    </>
                ) : <>
                    {guessed ? <>
                        {guessedCorrectly ? (
                            <>
                                <Text style={styles.message}>You guessed correct!</Text>
                                <Text>Attempts used: {config.attempts - attempts}</Text>
                                <Image
                                    style={styles.image}
                                    source={{ uri: `https://picsum.photos/id/${randomNumber}/100/100` }}
                                />
                                <ButtonComponent title="New Game" onPress={newGame} />
                            </>
                        ) : (
                            <>
                                <Text style={styles.message}>You did not guess correct!</Text>
                                <ButtonComponent title="Try Again" onPress={tryAgain} />
                                <ButtonComponent title="End The Game" onPress={endTheGame} />
                            </>
                        )}
                    </> :
                        <>
                            <Text style={styles.message}>Guess A Number Between 1 & 100</Text>
                            <Text>Attempts left: {attempts}</Text>
                            <Text>Timer: {time}s</Text>
                            <InputComponent ref={inputRef} value={guess} onChangeText={setGuess} />
                            <ButtonComponent title="Use a hint" onPress={useHint} disabled={hintUsed} />
                            {hintUsed && <Text>{randomNumber > 50 ? 'The number is greater than 50' : 'The number is 50 or less'}</Text>}
                            <ButtonComponent title="Submit guess" onPress={handleGuess} />
                        </>
                    }
                </>

                }
            </CardComponent>
        </View>
    );
};

// Define styles for the GameScreen component
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 20,
        marginBottom: 20,
    },
});

export default GameScreen;
