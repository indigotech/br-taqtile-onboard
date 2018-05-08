import {
  StackNavigator,
} from 'react-navigation';

import LoginPage from './pages/loginPage'
import Users from './pages/usersPage'

const App = StackNavigator({
  Login: { screen: LoginPage },
  Welcome: { screen: Users },
});


export default App;