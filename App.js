
import { createStackNavigator, createAppContainer } from 'react-navigation';
import InitialScreen from './components/initial'
import GameScreen from './components/game';




const RootStack = createStackNavigator(
    {
        Initial: { screen: InitialScreen },
        Game: { screen: GameScreen },
    },
    {
        initialRouteName: 'Initial',
    }

);


const App = createAppContainer(RootStack);


export default App;