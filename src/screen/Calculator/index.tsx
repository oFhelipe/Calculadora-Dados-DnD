import React, { useState } from 'react'
import { View, Text, Vibration,  } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler';

import SmallKey from '../../components/SmallKey';
import BigKey from '../../components/BigKey';

import styles from './styles'

 interface operacaoProps {
    dado?: string,
    quantidade?: number,
    resultados?: Array<number> | number,
    total: number,
    operacao: string | boolean,
 }

const Calculator = () => {

    const [operacao, setOperacao] = useState<operacaoProps[]>([]);
    
    const [contaTexto, setContaTexto] = useState("");
    const [resultadoTexto, setResultadoTexto] = useState("");

    const [resultado, setResultado] = useState("");

    const [ultimoNumero, setUltimoNumero] = useState("");

    const [anterior, setAnterior] = useState(0);


    function resetData(){
        setContaTexto("");
        setAnterior(0);
        setUltimoNumero("");
        setOperacao([]);
        setResultado("");
        setResultadoTexto("");
        Vibration.vibrate(1)
    }

    function dadoCounter(dadoText:string){


        const teste = dadoText.includes('(');

        if(teste) {
            const [numeroS, dadoAspas ] = dadoText.split('(');

            const [dadoD,] = dadoAspas.split(')');

            const  [ ,dadoS] = dadoD.split('d');

            const dado = Number(dadoS);
            const numero = Number(numeroS)

            if(numero == 0) {

                return {
                    dado: '0',
                    quantidade: numero,
                    total:0,
                    operacao:false
                }

            }

            let resultados:Array<number> = [];

            for(let i = 0; i < numero; i++){
            resultados = [...resultados,  Math.floor(Math.random() * dado + 1)];
            }

            const total = resultados.reduce((total, numero)=>{
                return total + numero;
            })

            return {
                dado: dadoD,
                quantidade: numero,
                resultados,
                total,
                operacao:false,
            }
        }
        else {
            const [ ,dadoS] = dadoText.split('d');
  
            const dado = Number(dadoS);

            const total = Math.floor(Math.random() * dado + 1 );

            return {
                dado: dadoText,
                quantidade: 1,
                resultados:total,
                total,
                operacao:false,
            } 
        }

    }

    function inserirOperacao(valor:string) {
        switch (anterior) {
            //Inicio
            case 0:
                //FAZER NADA
                break;
            //Numero
            case 1:
                setUltimoNumero("");
                setContaTexto(`${contaTexto} ${valor}`);
                let newOperacao = operacao;
                newOperacao[newOperacao.length - 1] = { ...newOperacao[newOperacao.length - 1], operacao:valor }
                setOperacao([...newOperacao]);
                setAnterior(3);
                break;
            //Dado
            case 2:
                setUltimoNumero("");
                setContaTexto(`${contaTexto} ${valor}`);
                 newOperacao = operacao;
                newOperacao[newOperacao.length - 1] = { ...newOperacao[newOperacao.length - 1], operacao:valor }
                setOperacao([...newOperacao]);
                setAnterior(3);
                break;
            //Operação
            case 3:
                //FAZER NADA
                break;
            //Erro
            default:
                resetData();
                setResultado("Error");
                break;
        }
    }

    function inserirNumero(valor:string) {
        switch (anterior) {

            //Inicio
            case 0:
                if(valor != '0') {
                setUltimoNumero(valor);
                setContaTexto(valor);
                setOperacao([{total:Number(valor), operacao:false}]);    
                setAnterior(1);
            }
                break;

            //Numero
            case 1:
                setContaTexto(`${contaTexto}${valor}`);
                setUltimoNumero(`${ultimoNumero}${valor}`);
                let newOperacao = operacao;
                newOperacao[newOperacao.length - 1] = { ...newOperacao[newOperacao.length - 1], total:Number(`${ultimoNumero}${valor}`) }
                setAnterior(1);
                break;
            //Dado
            case 2:
                //FAZER NADA
                break;

            //Operação
            case 3:
                setUltimoNumero(valor);
                setContaTexto(`${contaTexto} ${valor}`);
                setOperacao([...operacao, {total:Number(valor), operacao:null}]);
                setAnterior(1);
                break;

            //Erro
            default:
                resetData();
                setResultado("Error");
                break;
        }
    }


    function inserirDado(valor:string) {
        switch (anterior) {
            //Inicio
            case 0:
                setContaTexto(valor);
                setOperacao([dadoCounter(valor)]);
                setAnterior(2);
                break;
            //Numero
            case 1:
                setContaTexto(`${contaTexto}(${valor})`);
                let newOperacao = operacao;
                newOperacao.pop();
                newOperacao = [...newOperacao, dadoCounter(`${ultimoNumero}(${valor})`)]
                setUltimoNumero("");
                setOperacao([...newOperacao]);
                setAnterior(2);
                break;
            //Dado
            case 2:
                //FAZER NADA
                break;
            //Operação
            case 3:
                setContaTexto(`${contaTexto} ${valor}`);
                setUltimoNumero("");
                setOperacao([...operacao, dadoCounter(`${valor}`)]);
                setAnterior(2);
                break;
            //Erro
            default:
                resetData();
                setResultado("Error");
                break;
        }


        

    }

    function mostrarResultado(){

        const resultado = operacao.reduce((total, operacaoItem)=>{

            if(operacaoItem.dado !== undefined){
    
                if(operacaoItem.quantidade !== undefined && operacaoItem.quantidade > 1 && Array.isArray(operacaoItem.resultados)) {
                    return total = `${total} ${operacaoItem.quantidade}(${operacaoItem.dado}): [${operacaoItem.resultados.join(', ')}] ` + `${operacaoItem.operacao !== false ? operacaoItem.operacao : ""}`
                }
                else{
                    return total = `${total} ${operacaoItem.dado} = ${operacaoItem.total} ${operacaoItem.operacao !== false ? operacaoItem.operacao : ""} `
                }

            }
            else {
                return total = `${total} ${operacaoItem.total} ${ typeof(operacaoItem.operacao) === 'string' ? operacaoItem.operacao : ""}`
            }
                

        }, "");

        setResultadoTexto(`= ${resultado}`);

     }

    function calcularRecursivo(total:number, array:Array<operacaoProps>, indexAtual:number) {

        if(indexAtual >= array.length){
            setResultado(`${total}`);
            mostrarResultado();
        }
        else {

            if(array[indexAtual - 1].operacao === "+"){
                var newTotal = total + array[indexAtual].total;
                calcularRecursivo(newTotal, array, indexAtual + 1);
            }
            else if(array[indexAtual - 1].operacao === "-"){
                var newTotal = total - array[indexAtual].total;
                calcularRecursivo(newTotal, array, indexAtual + 1);
            }

        }
        
     }

    return (
        <View style={styles.container}>
            <View style={styles.displayContainer}>
                <View style={styles.upDisplay}>
                <Text style={styles.contaText}>{contaTexto} {resultadoTexto}</Text>
                </View>
                <View style={styles.downDisplay}>
                <Text style={[styles.resultText, resultado === "Error" && {color:'#F73939'}]}>{resultado}</Text>
                </View>
            </View>
            <View style={styles.keyboardContainer}>
                
                <View style={styles.keyboardEsquerda}>
                    <View style={styles.keyBreak}>
                        <SmallKey onPress={()=>{inserirDado('d3')}} valor="d3"/>    
                        <SmallKey onPress={()=>{inserirDado('d4')}} valor="d4"/>    
                        <SmallKey onPress={()=>{inserirDado('d6')}} valor="d6"/>
                    </View>
                    <View style={styles.keyBreak}>
                        <SmallKey onPress={()=>{inserirNumero("7")}} valor="7"/>    
                        <SmallKey onPress={()=>{inserirNumero("8")}} valor="8"/>    
                        <SmallKey onPress={()=>{inserirNumero("9")}} valor="9"/>
                    </View>
                    <View style={styles.keyBreak}>
                        <SmallKey onPress={()=>{inserirNumero("4")}} valor="4"/>    
                        <SmallKey onPress={()=>{inserirNumero("5")}} valor="5"/>    
                        <SmallKey onPress={()=>{inserirNumero("6")}} valor="6"/>
                    </View>
                    <View style={styles.keyBreak}>
                        <SmallKey onPress={()=>{inserirNumero("1")}} valor="1"/>    
                        <SmallKey onPress={()=>{inserirNumero("2")}} valor="2"/>    
                        <SmallKey onPress={()=>{inserirNumero("3")}} valor="3"/>
                    </View>
                    <View style={styles.keyBreak}>
                        <SmallKey onPress={()=>{inserirOperacao("-")}} valor="-"/>    
                        <SmallKey onPress={()=>{inserirNumero("0")}} valor="0"/>    
                        <SmallKey onPress={()=>{inserirOperacao("+")}} valor="+"/>
                    </View>
                </View>
                
                <View style={styles.keyboardDireita}>
                    <View style={styles.acButtonBox}>
                        <BaseButton 
                            style={styles.acButton}
                            onPress={()=>{resetData()}}>
                                <Text style={[styles.text, styles.bigButtonText]}>AC</Text>
                        </BaseButton>
                    </View>
                    <View style={styles.keyBreak}>
                        <BigKey onPress={()=>{inserirDado('d8')}} valor="d8"/>
                        <BigKey onPress={()=>{inserirDado('d10')}} valor="d10"/>
                    </View>
                    <View style={styles.keyBreak}>
                        <BigKey onPress={()=>{inserirDado('d12')}} valor="d12"/>
                        <BigKey onPress={()=>{inserirDado('d20')}} valor="d20"/>
                    </View>
                    <View style={styles.calcularButtonBox}>
                        <BaseButton 
                            style={styles.calcularButton}
                            onPress={()=>{Vibration.vibrate(1)
                                          operacao.length > 0 && calcularRecursivo(operacao[0].total, operacao, 1)}}>
                            <Text style={[styles.text, styles.bigButtonText]}>Calcular</Text>
                        </BaseButton>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default Calculator
