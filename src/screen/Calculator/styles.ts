import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F2F4F7'
    },
    displayContainer:{
        flex: 1,
    },
    contaText: {
        fontFamily:'Roboto',
        fontSize:18,
        marginTop:8,
    },
    resultText:{
        fontFamily:'Roboto',
        fontSize:56,
        fontWeight:'bold',
        margin:8,
    },
    upDisplay:{
        flex: 2,
        paddingLeft:8,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    downDisplay:{
        flex: 3,
        alignItems:'center',
        justifyContent:'center'
    },
    keyboardContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#FFF',
    },
    keyboardEsquerda:{
        flex: 1,
        alignItems:'center',
    },
    keyBreak:{
        flexDirection:'row',
    },
    keyboardDireita:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:8,
    },
    acButtonBox:{
        width:Dimensions.get('screen').width * 0.4 + 8,
        height:Dimensions.get('screen').width * 0.2,
        backgroundColor:'#F7B639',
        elevation: 4,
        marginRight:8,
        marginTop:4,
    },
    acButton:{
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
    },
    calcularButtonBox:{
        width:Dimensions.get('screen').width * 0.4 + 8,
        height:Dimensions.get('screen').width * 0.2,
        backgroundColor:'#F73939',
        elevation: 4,
        marginRight:8,
        marginBottom:4,
    },
    calcularButton:{
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
    },
    text:{
        fontFamily:'Roboto',
    },
    bigButtonText:{
        fontWeight:'bold',
        color:'#FFF',
        fontSize:18
    }
});

export default styles