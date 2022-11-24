import { StyleSheet, Text, Touchable, TouchableOpacity, View, Dimensions } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import Container from '../components/Container'
import Title from '../components/Title'


export default function MemoryDisable() {
    const [active, setActive] = useState([false,false,false,false]);
    const [toggle, setToggle] = useState(true);
    const count = useRef(0);

    const sequence = [3,1,2,0];
    const {height} = Dimensions.get("window");
    const styles = {
        gameRow: {
            flexDirection: "row"
            
        },

        gameCell: {
            margin: 10,
            flex: 1,
            backgroundColor: "red",
            height: height / 3
        }
    };
    const delay = async (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))


    useEffect(() => {
        const func = async () => {
            console.log(count.current);
            if (toggle) {
                setActive([...active.slice(0, sequence[count.current]), true, ...active.slice(sequence[count.current]+1)]);
                count.current = count.current + 1;
            } else {
                setActive([false, false, false, false]);
            }
            if (count.current < 4) {
                setToggle(!toggle);
            } else {
                setActive([false, false, false, false]);
            }
            await delay();
        }
        func();
        
    },[toggle])

    const GameCell = ({id}) => {
        return(
            <TouchableOpacity style={{...styles.gameCell, backgroundColor: active[id] ? "blue" : "green"}}>
                <Text>{id}</Text>
            </TouchableOpacity>
        )
    };
  return (
    <Container children={
        <>
        <Title text="Memory"/>
        <View style={styles.gameRow}>
            <GameCell id={0}/>
            <GameCell id={1}/>
        </View>
        <View style={styles.gameRow}>
            <GameCell id={2}/>
            <GameCell id={3}/>
        </View>
        </>
        
    }/>

  )
}

