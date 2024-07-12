import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import CardComponent from '../components/CardComponent';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';

const config = {
    time: 60,
    attempts: 5,
}

const GameScreen = ({ restartGameHandler }) => {
    const [randomNumber, setRandomNumber] = useState(null);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(config.attempts);
    const [time, setTime] = useState(config.time);
    const [hintUsed, setHintUsed] = useState(false);
    const [guessed, setGuessed] = useState(false);
    const [guessedCorrectly, setGuessedCorrectly] = useState(false);
    const [gameOverReason, setGameOverReason] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        initGameState();
        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (time === 0) {
            setGameOverReason('out of time');
        }
    }, [time])


    const initGameState = () => {
        const num = Math.floor(Math.random() * 100) + 1;
        setRandomNumber(num);
        setGuess('');
        setGuessed(false);
        setAttempts(config.attempts);
        setTime(config.time);
        setHintUsed(false);
        setGuessedCorrectly(false);
        setGameOverReason('');
    };

    const handleGuess = () => {
        const userGuess = parseInt(guess);
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            Alert.alert('Invalid input', 'Please enter a number between 1 and 100.');
            return;
        }

        inputRef.current.blur(); // Blur the input field to hide the keyboard
        setGuessed(true);
        setGuess('');

        if (userGuess === randomNumber) {
            setGuessedCorrectly(true);
        } else {
            if (attempts === 1) {
                setGameOverReason('out of attempts');
            }
            setAttempts(prevAttempts => prevAttempts - 1);
        }
    };

    const useHint = () => {
        setHintUsed(true);
    };

    const tryAgain = () => {
        setGuessed(false);
    };

    const endTheGame = () => {
        setGameOverReason('ended');
    };

    const newGame = () => {
        initGameState();
    };

    const RestartGame = () => {
        initGameState();
        restartGameHandler();
    };

    return (
        <View style={styles.screen}>
            <ButtonComponent title="Restart" onPress={RestartGame} />
            <CardComponent>
                {randomNumber && <Text>Random Number: {randomNumber}</Text>}
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
