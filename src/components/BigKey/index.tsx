import React from 'react'
import { View, Text, Vibration } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler';

import styles from './styles';

interface BigKeyProps {
    valor: string,
    onPress():any
}

const BigKey:React.FC<BigKeyProps> = ({valor, onPress}) => {
    return (
        <View style={styles.bigTeclaBox}>
            <BaseButton
                style={styles.bigTecla}
                onPress={()=>{
                    onPress() 
                    Vibration.vibrate(1)}}>
                <Text style={styles.text}>{valor}</Text>
            </BaseButton>
        </View>);
}


export default BigKey

