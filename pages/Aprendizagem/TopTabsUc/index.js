import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Feather } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Encontros from '../Encontros/Encontros';
import Participantes from '../Participantes/Participantes';
import Competencias from '../Copetencia/Competencia';
import Notas from '../Notas/Notas';
import DescricaoUC from '../DescricaoUC/DescricaoUc';

const Tab = createMaterialTopTabNavigator();

function TopTabsUc({grupoId, unidadeCurricularId}) {
    return (
        <Tab.Navigator
            screenOptions={{
                lazy: true,
                tabBarLabelStyle: { fontSize: 9, fontWeight: 'bold' },
                tabBarInactiveTintColor: '#FFF',
                tabBarActiveTintColor: '#FFF',
                tabBarStyle: {
                    backgroundColor: '#205395'
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#EF8F2F',
                },

            }}
        >
            <Tab.Screen
                name="Descrição"
                children={() => <DescricaoUC grupoId = {grupoId}/>}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name="info"
                            size={22}
                            color={focused ? '#f8922c' : '#FFF'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Encontros"
                children={() => <Encontros grupoId = {grupoId}/>}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name="calendar"
                            size={22}
                            color={focused ? '#f8922c' : '#FFF'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Participantes"
                children={() => <Participantes grupoId = {grupoId}/>}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: {
                        elevation: 10,
                        width: 20,
                    },
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name="users"
                            size={22}
                            color={focused ? '#f8922c' : '#FFF'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Competências"
                children={() => <Competencias unidadeCurricularId = {unidadeCurricularId}/>}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused}) => (
                        <Feather
                            name="award"//award
                            size={22}
                            color={focused ? '#f8922c' : '#FFF'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Notas"
                children={() => <Notas grupoId = {grupoId}/>}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name="bar-chart-2"
                            size={25}
                            color={focused ? '#f8922c' : '#FFF'}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TopTabsUc;