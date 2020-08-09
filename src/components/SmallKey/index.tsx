import React from 'react';
import { View, Text, Vibration } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';

import styles from './styles';

interface SmallKeyProps {
    valor:string,
    onPress():any
}

const SmallKey:React.FC<SmallKeyProps> = ({valor, onPress}) => {
    return (
        <View style={styles.teclaBox}>
            <BaseButton 
                style={styles.tecla}
                onPress={()=>{
                    onPress() 
                    Vibration.vibrate(1)}}>
                <Text style={[styles.text, {}]}>{valor}</Text>
            </BaseButton>
        </View>
    )
}

export default SmallKey
