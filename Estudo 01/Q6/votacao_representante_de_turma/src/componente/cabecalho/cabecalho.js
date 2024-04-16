import { Dimensions, Image, StyleSheet, Text,View } from 'react-native';

const widthTela = Dimensions.get('screen').width

const Cabecalho = ({titulo, nome})=>{

    return(
        <View style={style.cab}>
            <Text style={style.titulo} >{titulo}</Text>        
            <Text style={style.desenv} >
                Desenvolvido por: {nome}</Text>        
        </View>
    )

}

export default Cabecalho

const style = StyleSheet.create({
    cab:{
        flex:1,
        justifyContent: 'center',
        alignContent:'flex-start'
    },
    desenv:{
        fontSize: 12,
        textAlign: 'right',
        color:'black',
        position:'absolute',
        bottom: 50,
        right:10
    },
    titulo:{
        fontSize : 29,
        fontWeight: 'bold',
        alignSelf: 'center',
        top:0,
        padding: 27,
        position:'absolute',
        color: 'black',
    }

})
