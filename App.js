
import { createStackNavigator, createAppContainer } from 'react-navigation';
import InitialScreen from './components/initial'
import GameScreen from './components/game';
import PlayerScreen from './components/players';
import PointsTableScreen from './components/pointsTable';





const RootStack = createStackNavigator(
    {
        Initial: { screen: InitialScreen },
        Game: { screen: GameScreen },
        Players: { screen: PlayerScreen },
        PointsTable: { screen: PointsTableScreen }
    },
    {
        initialRouteName: 'Initial',
    }

);


const App = createAppContainer(RootStack);


export default App;