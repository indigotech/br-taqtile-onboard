import {
  StackNavigator,
} from 'react-navigation';

import LoginPage from './loginPage'
import WelcomePage from './welcomePage'

const App = StackNavigator({
  Login: { screen: LoginPage },
  Welcome: { screen: WelcomePage },
});


export default App;