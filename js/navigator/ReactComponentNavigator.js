import { createStackNavigator, createAppContainer} from 'react-navigation'
import FlatListDemo from '../ReactComponent/FlatListDemo'
import ModalDemo from '../ReactComponent/ModalDemo'
import SwipeableFlatListDemo from '../ReactComponent/SwipeableFlatListDemo'
import SectionListDemo from '../ReactComponent/SectionListDemo'
import AsyncStorageDemoPage from '../ReactComponent/AsyncStorageDemoPage'
import DataStoreDemoPage from '../ReactComponent/DataStoreDemoPage'

import App from '../ReactComponent/App'


export default createAppContainer(createStackNavigator({
    App:{
        screen: App,
        navigationOptions: {
            title: 'App'
        }
    },
    SwipeableFlatListDemo:{
        screen: SwipeableFlatListDemo,
        navigationOptions: {
            title: 'SwipeableFlatListDemo'
        }

    },
    ModalDemo:{
        screen: ModalDemo,
        navigationOptions: {
            title: 'ModalDemo'
        }

    },
    FlatListDemo: {
        screen: FlatListDemo,
        navigationOptions: {
            title: 'FlatListDemo'
        }
    },
    SectionListDemo: {
        screen: SectionListDemo,
        navigationOptions: {
            title: 'SectionListDemo'
        }
    },
    AsyncStorageDemoPage:{
        screen:AsyncStorageDemoPage,
        navigationOptions:{
            title: 'AsyncStorageDemoPage'
        }
    },
    DataStoreDemoPage:{
        screen:DataStoreDemoPage,
        navigationOptions:{
            title:'DataStoreDemoPage'
        }
    }
}))

