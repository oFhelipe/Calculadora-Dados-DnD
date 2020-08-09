import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    bigTeclaBox:{
        height:Dimensions.get('screen').width * 0.2,
        width:Dimensions.get('screen').width * 0.2,
        backgroundColor:'#FFF',
        elevation: 4,
        marginRight:8,
        marginVertical:4,
    },
    bigTecla:{
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
    },
    text:{
        fontFamily:'Roboto',
    },
});

export default styles;