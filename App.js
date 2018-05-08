import {
  StackNavigator,
} from 'react-navigation';

import LoginPage from './pages/loginPage'
import Users from './pages/usersPage'
import Detail from './pages/detail'


const App = StackNavigator({
  Login: { screen: LoginPage },
  Welcome: { screen: Users },
  Detail: {screen: Detail}
});


export default App;