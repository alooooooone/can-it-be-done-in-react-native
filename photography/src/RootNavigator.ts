import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home/Home';
import Detail from './screens/Detail/Detail';

const navigators = createStackNavigator({
    Home: {
        screen: Home
    },
    Detail: {
        screen: Detail
    }
}, {
    headerMode: 'none'
})

export default createAppContainer(navigators);