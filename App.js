
import { createStackNavigator, createAppContainer } from 'react-navigation';
import InitialScreen from './components/initial'
import GameScreen from './components/game';
import playerScreen from './components/players';




const RootStack = createStackNavigator(
    {
        Initial: { screen: InitialScreen },
        Game: { screen: GameScreen },
        Players: { screen: playerScreen },
    },
    {
        initialRouteName: 'Initial',
    }

);


const App = createAppContainer(RootStack);


export default App;