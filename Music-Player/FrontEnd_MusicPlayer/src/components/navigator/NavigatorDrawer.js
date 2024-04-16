import { createDrawerNavigator } from "@react-navigation/drawer"
import { Feather, FontAwesome, Ionicons,AntDesign } from "@expo/vector-icons"

import { useAuth } from "../auth/AuthProvider"
import HomeView from "../../view/home/HomeView"

import CadMusica from "../../view/comum/CadMusica"

import Player from "../../view/player/Player"
import ExibeListaMusica from "../../view/comum/ExibeListaMusica"

const NavigatorDrawer = () => {

        const Drawer = createDrawerNavigator()

        const { isAdmin, isComum, logout } = useAuth();

        return (
                
                <Drawer.Navigator >

                        <Drawer.Screen name="Lista de Músicas"
                        component={ExibeListaMusica}
                        options={{
                                title: 'Lista de Músicas',
                                headerTitle: '',
                                drawerIcon: () => <Feather name="home" size={24} />
                        }} />

                        <Drawer.Screen name="Cadastro de Música"
                        component={CadMusica}
                        options={{
                                title: 'Cadastro de Música',
                                headerTitle: '',
                                drawerIcon: () => <Feather name="home" size={24} />
                        }} />

                        <Drawer.Screen name="player"
                                component={Player}
                                options={{
                                        title: 'Player',
                                        headerTitle: '',
                                        drawerIcon: () => <AntDesign name="play" size={24} color="black"/>
                                }} />

                        <Drawer.Screen name="sair"
                        component={HomeView}
                                options={{
                                        title: 'Sair',
                                        headerTitle: '',
                                        drawerIcon: () => <Ionicons name="exit" size={24}
                                                onPress={logout} />
                                }} />

                </Drawer.Navigator>
        )
}

export default NavigatorDrawer;