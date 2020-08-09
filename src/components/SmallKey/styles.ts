import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    teclaBox:{
        height:Dimensions.get('screen').width * 0.15,
        width: Dimensions.get('screen').width * 0.15,
        backgroundColor:'#FFF',
        elevation: 4,
        margin:4,
    },
    tecla:{
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
    },
    text:{
        fontFamily:'Roboto',
    },
});

export default styles;