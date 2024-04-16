import 'react-native-gesture-handler';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Navigator from './src/components/navigator/Navigator';
import { AuthProvider } from './src/components/auth/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>

  );
}
