import {
  StackNavigator,
} from 'react-navigation';

import LoginPage from './pages/loginPage'
import Users from './pages/usersPage'
import Detail from './pages/detail'
import SignUp from './pages/signUp'


const App = StackNavigator({
  Login: { screen: LoginPage },
  Welcome: { screen: Users },
  Detail: {screen: Detail},
  SignUp: {screen: SignUp}
});


export default App;