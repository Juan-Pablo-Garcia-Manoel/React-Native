import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"


import TelaInicial from "../../view/home/HomeView"
import TelaLogin from "../../view/login/LoginView"
import TelaCadastro from "../../view/cadastro/CadastroView"
import TelaDashBoard from "../../view/dashboard/DashboardView"
import Player from "../../view/player/Player"

const Navigator = ()=>{

    const Stack = createStackNavigator()

    return(
        <NavigationContainer>
            
            <Stack.Navigator initialRouteName="Tela Inicial">


                <Stack.Screen name="Tela Inicial" 
                component={TelaInicial}/>

                <Stack.Screen name="Tela Login"
                component={TelaLogin}/>

                <Stack.Screen name="Tela Cadastro"
                component={TelaCadastro}/>

                <Stack.Screen name="Tela DashBoard"
                component={TelaDashBoard}/>

                <Stack.Screen name="Tela Player"
                component={Player}/>

            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Navigator