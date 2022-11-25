import {TouchableOpacity, View, Dimensions} from 'react-native';
import React, {useEffect, useState, useRef, useContext} from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import {AppContext} from '../helper/AppContext';
import {colors} from '../data/theme';

//Generate random sequence of integers between 0 and 3
const getRandomNumber = () => Math.floor(Math.random() * 4);
const sequence = [
  getRandomNumber(),
  getRandomNumber(),
  getRandomNumber(),
  getRandomNumber(),
];

/**
 * Creates a tile memory game which when completed
 * stops an active alarm
 * @returns render for memory game
 */
export default MemoryDisable = () => {
  const [active, setActive] = useState([false, false, false, false]);
  const [toggle, setToggle] = useState(true);
  const [sequencePlaying, setSequencePlaying] = useState(true);
  const sequenceCount = useRef(0);
  const enteredCount = useRef(0);
  const {theme} = useContext(AppContext);

  const {height} = Dimensions.get('window');
  const styles = {
    gameRow: {
      flexDirection: 'row',
    },

    gameCell: {
      margin: 10,
      flex: 1,

      height: height / 3,
    },
  };
  const delay = async (ms = 1000) =>
    new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const func = async () => {
      console.log(sequenceCount.current);
      if (toggle) {
        setActive([
          ...active.slice(0, sequence[sequenceCount.current]),
          true,
          ...active.slice(sequence[sequenceCount.current] + 1),
        ]);
        await delay();
        sequenceCount.current++;
      } else {
        setActive([false, false, false, false]);
        await delay(100);
      }
      if (sequenceCount.current < sequence.length) {
        setToggle(!toggle);
      } else {
        setSequencePlaying(false);
        setActive([false, false, false, false]);
        sequenceCount.current = 0;
      }
    };
    func();
  }, [toggle]);

  /**
   * Handles game cell press
   *
   * If correct cell has been pressed increment entered count,
   * otherwise reset game state and replay animation.
   *
   * If entire sequence is entered correctly, stop the alarm
   * @param {Number} id id of game cell
   */
  const handlePress = id => {
    const resetSequence = () => {
      enteredCount.current = 0;
      setSequencePlaying(true);
      setToggle(!toggle);
    };

    if (sequence[enteredCount.current] !== id) {
      resetSequence();
    } else {
      enteredCount.current++;
    }

    if (enteredCount.current === sequence.length) {
      sequenceCount.current = 0;
      enteredCount.current = 0;
      console.log('you win!');
      //disable alarm  here
    }
  };

  /**
   * Creates a game cell which when pressed calls @handlePress
   * @param {Number} id id of game cell
   * @returns render for a game cell
   */
  const GameCell = ({id}) => {
    return (
      <TouchableOpacity
        onPress={sequencePlaying ? null : () => handlePress(id)}
        style={{
          ...styles.gameCell,
          backgroundColor: active[id]
            ? colors[theme].fgColor
            : colors[theme].fgColorLighter,
        }}
      />
    );
  };

  return (
    <Container
      children={
        <>
          <Title text="Memory" />
          <View style={styles.gameRow}>
            <GameCell id={0} />
            <GameCell id={1} />
          </View>
          <View style={styles.gameRow}>
            <GameCell id={2} />
            <GameCell id={3} />
          </View>
        </>
      }
    />
  );
};
