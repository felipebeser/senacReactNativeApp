import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { Stack } from 'expo-router'


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {


  const [fontsLoaded, error] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsThin: require('../assets/fonts/Poppins-Thin.ttf')
  })

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!fontsLoaded) {
    return undefined
  }

  const Layout = () => {
    const { authState } = useAuth();

    return (
          <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="(_tabs)" redirect={!authState.authenticated}/>
            <Stack.Screen name="Login" redirect={authState.authenticated}/>
          </Stack>)
  }


  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Layout/>
    </AuthProvider>
  )
}