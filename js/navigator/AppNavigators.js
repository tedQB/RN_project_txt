import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'

import WelcomePage from '../page/WelcomePage';
import AboutPage from '../page/AboutPage';
import DetailPage from '../page/DetailPage';
import HomePage from '../page/HomePage';

const InitNavigator = createStackNavigator({
	WelcomePage: {
		screen: WelcomePage,
		navigationOptions: {
			header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
		}
	}
});


const MainNavigator = createStackNavigator({
	HomePage:{
		screen:HomePage,
		navigationOptions:{
			header:null
		}
	},
	DetailPage: {
		screen: DetailPage,
		navigationOptions: {
			header: null
		}
	},	
	AboutPage: {
		screen: AboutPage,
		navigationOptions: {
			header: null
		}
	}
});

export default createAppContainer(createSwitchNavigator({
	Init: InitNavigator,
	Main: MainNavigator,
},{ 
	navigationOptions:{
		header:null
	}
}))