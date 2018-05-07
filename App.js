import {
  StackNavigator,
} from 'react-navigation';

import LoginPage from './loginPage'
import Users from './usersPage'

const App = StackNavigator({
  Login: { screen: LoginPage },
  Welcome: { screen: Users },
});


export default App;