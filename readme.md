
# About

基于ReactNative的项目，后台接口基于github Trending官方数据。
项目package.json内使用的模块，组件全部为官方目前最新版本，向后兼容。

项目功能主要有查看最新github最热项目，最热项目，收藏项目，个人中心，换肤功能，还有一些react-native基础组件的demo等等，
适合新手fork下来学习使用

特别感谢 crazycodeboy 提供的react-native教程及项目


## 项目运行


```
git clone https://github.com/tedQB/RN_project_txt 

react-react run-ios/android

```

## 预览
<img src=https://github.com/tedQB/RN_project_txt/blob/master/img/01.png?raw=true" width=200>
<img src=https://github.com/tedQB/RN_project_txt/blob/master/img/02.png?raw=true" width=200>
<img src=https://github.com/tedQB/RN_project_txt/blob/master/img/03.png?raw=true" width=200>
<img src=https://github.com/tedQB/RN_project_txt/blob/master/img/04.png?raw=true" width=200>
<img src=https://github.com/tedQB/RN_project_txt/blob/master/img/05.png?raw=true" width=200>

## 目标功能

- [x] Redux/React-redux接入 -- 完成
- [x] 导航配置 --完成
- [x] 收藏喜欢的项目 -- 完成
- [x] 多种颜色主题自由切换 -- 完成
- [x] 可以订阅 50 多种编程语言项目 -- 完成


## 待实现功能

- [ ] 热更新codepush
- [ ] 社会化分享
- [ ] 第三方登陆
- [ ] 打包发布-市面上很多了，发布计划搁置


## API接口文档

## 系统截图

## 项目布局

```
.
├── App.js                          RN默认首页
├── __tests__   
│   └── App-test.js                 RN默认测试用例
├── android                         android目录
│   ├── app
├── app.json                        APP名称配置
├── babel.config.js                 babel     
├── img                             img
│   ├── 01.png
│   ├── 02.png
│   ├── 03.png
│   ├── 04.png
│   ├── 05.png
│   ├── 06.png
│   ├── 07.png
│   └── aw.jpg
├── index.js                            APP主配置入口
├── ios                                 ios目录
├── js                                  工程目录
│   ├── ReactComponent                  React组件demo
│   │   ├── App.js
│   │   ├── AsyncStorageDemoPage.js
│   │   ├── DataStoreDemoPage.js
│   │   ├── FlatListDemo.js
│   │   ├── ModalDemo.js
│   │   ├── SectionListDemo.js
│   │   └── SwipeableFlatListDemo.js
│   ├── Reducer                         项目Reducer
│   │   ├── favorite
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── language
│   │   │   └── index.js
│   │   ├── popular
│   │   │   └── index.js
│   │   ├── theme
│   │   │   └── index.js
│   │   └── trending
│   │       └── index.js
│   ├── action                          项目action
│   │   ├── ActionUtil.js
│   │   ├── favorite
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── language
│   │   │   └── index.js
│   │   ├── popular
│   │   │   └── index.js
│   │   ├── theme
│   │   │   └── index.js
│   │   ├── trending
│   │   │   └── index.js
│   │   └── types.js
│   ├── common                          项目公共组件
│   │   ├── BackPressComponent.js
│   │   ├── BaseItem.js
│   │   ├── MORE_MENU.js
│   │   ├── NavigationBar.js
│   │   ├── PopularItem.js
│   │   ├── SafeAreaViewPlus.js
│   │   ├── TrendingDialog.js
│   │   └── TrendingItem.js
│   ├── expand                          项目数据操作框架
│   │   └── dao
│   │       ├── DataStore.js
│   │       ├── FavoriteDao.js
│   │       ├── LanguageDao.js
│   │       ├── ThemeDao.js
│   │       └── read.md
│   ├── model                           项目Model
│   │   ├── ProjectModel.js
│   │   └── TimeSpan.js
│   ├── navigator                       ReactNative Navigator demo
│   │   ├── AppNavigator.js
│   │   ├── DynamicTabNavigator.js
│   │   ├── NavigationUtil.js
│   │   ├── ReactComponentNavigator.js
│   │   ├── ReduxNavigator              项目Navigator配置
│   │   │   ├── AppNavigator.js
│   │   │   └── DynamicTabNavigator.js
│   │   └── StackSwitchNavigators.js
│   ├── page                            ReactNative Page demo
│   │   ├── AboutPage.js
│   │   ├── DetailPage.js
│   │   ├── FavoritePage.js
│   │   ├── FetchDemo.js
│   │   ├── HomePage.js
│   │   ├── MyPage.js
│   │   ├── PopularPage.js
│   │   ├── TrendingPage.js
│   │   ├── WelcomePage.js
│   │   └── read.md
│   ├── pageRedux                       项目配置了Redux的page目录
│   │   ├── App.js
│   │   ├── CustomTheme.js              
│   │   ├── DetailPage.js               详情
│   │   ├── FavoritePage.js             收藏
│   │   ├── HomePage.js                 主页
│   │   ├── MyPage.js                   我的
│   │   ├── PopularPage.js              最新
│   │   ├── TrendingPage.js             趋势
│   │   ├── WebViewPage.js              webview展示
│   │   ├── WelcomePage.js              欢迎页面
│   │   └── about                       关于页面
│   │       ├── AboutCommon.js
│   │       ├── AboutMePage.js
│   │       └── AboutPage.js
│   ├── res
│   │   ├── data                        多语言，分享，技术名称json
│   │   │   ├── config.json
│   │   │   ├── keys.json
│   │   │   ├── langs.json
│   │   │   └── share.json
│   │   └── styles                      项目公共style
│   │       ├── GlobalStyles.js
│   │       └── ThemeFactory.js
│   ├── store                           项目store
│   │   └── index.js
│   ├── test                            flowtest
│   │   └── flowtest.js
│   └── util                            项目公共工具
│       ├── ArrayUtil.js
│       ├── EventTypes.js
│       ├── FavoriteUtil.js
│       ├── ShareUtil.js
│       ├── Utils.js
│       └── ViewUtil.js
├── metro.config.js
├── package-lock.json
├── package.json
├── readme.md
└── yarn.lock   
.

```

# 感受

从学习ReactNative到开发完成这个项目，历时将近20多天，来谈谈感受

* 跨平台：目前React Native官方已经支持iOS、Android两个平台的移动设备，民间也有一些大牛在做macOS、tvOS，甚至UWP平台的适配。但由于不同平台特性不同，并不能一份代码在所有平台上直接运行，React Native的思想是「Learn once, write anywhere」，需要针对不同平台的特性写出不同的代码，尽量保持组件的高可复用性。

* 性能：官方宣称性能堪比Native，实际使用中会发现几个问题，比如复杂视图渲染出View层级过多、ListView（等同于iOS上的UITableView）无重用机制、有些组件存在内存泄露。这就会导致在部分低端Android机型上的性能过差，复杂的、大型的应用会有明显性能问题。

* 热更新：由于App Store应用商店发版迭代效率问题，热更新成为了iOS平台非常渴求的功能，可喜的是React Native的热更新能力非常好，通过将JavaScript代码部署到服务器中，运行过程中即可重新reload整个界面。

* 学习成本：对于iOS开发者来讲，要了解相当数量的Web前端开发知识才可以进行开发，对于Web前端开发者来讲，对于原生性能调优则需要原生开发知识和经验，所以说学习成本略高。

* 开发效率：Android和iOS平台可复用很多组件，仅部分代码需要各自平台分别维护，所以比开发两个平台原生应用效率要高得多。加上本身可动态渲染的能力，不用重新编译，Command⌘+R即可重新渲染界面，开发效率更是惊人地快。



# 项目中遇到的问题，

* 环境配置问题 [url]
* redux languages action await异步回调数据，即便页面TrendingPage  onLoadLanguage(FLAG_LANGUAGE.flag_language); 派发action之后，仍然拿不到数据，只有等到组件渲染完成才拿到。。
  
  通过观察,await异步申请的本地AsyncStorage数据，会存在请求不到的情况， 解决，判断keys
  ![avatar](./img/aw.jpg)
  
  
  ``` javascript
  //action 
  import Types from '../types'
  
  import LanguageDao from "../../expand/dao/LanguageDao"
  
  export function onLoadLanguage(flagKey) {
      return async dispatch=>{
          try {
              let languages = await new LanguageDao(flagKey).fetch();
              dispatch({
                  type:Types.LANGUAGE_LOAD_SUCCESS,
                  languages:languages,
                  flag:flagKey
              })
          }catch (e) {
              console.log(e)
          }
      }
  }
  
  //TrendingPage
  class TrendingPage extends Component<Props> {
    
     render(){
        const TabNavigator = keys.length?createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(), {
                //设置tab样式。..
            }
        )):null;
      }
     
  }
  const mapTrendingStateToProps = function(state){
      return {
          keys: state.language.languages,
          theme: state.theme.theme,
      };
  }
  ```
* 使用NavigationUtil页面无法进入DetailPage 
 ``` javascript
    //TrendingPage.js 
    import NavigationUtil from '../navigator/NavigationUtil'
    //......
   
    renderItem(data){
        const item = data.item;
        const {theme} = this.props;
        const {navigation} = this.props;
        NavigationUtil.navigation = this.props.navigation; 
          //此处NavigationUtil再次被覆盖，NavigationUtil类的 navigation对象出现异常。
          //正确使用方法在HomePage入口处一次配置，全部生效
        return <TrendingItem
            projectModel={item}
            theme={theme}
            onSelect={(callback)=>{
                console.log('cccc');
                NavigationUtil.goPage({
                    theme,
                    projectMode:item,
                    flag:FLAG_STORAGE.flag_trending,
                    callback,
                },'DetailPage')

            }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}
            />
    }
   ```
# 对比Flutter 


1. 技术架构上
    
React-Native、Weex 核心是通过 Javascript 开发，执行时需要 Javascript 解释器，UI 是通过原生控件渲染。
Flutter 与用于构建移动应用程序的其它大多数框架不同，因为 Flutter 既不使用 WebView，也不使用操作系统的原生控件。 
Flutter 使用自己的高性能渲染引擎来绘 制 widget。Flutter 使用 C、C ++、Dart 和 Skia（2D渲染引擎）构建。

2. 性能上 

RN的效率由于是将View编译成了原生View,所以效率上要比基于Cordova的HTML5高很多，但是它也有效率问题,RN的渲染机制是基于前端框架的考虑,复杂的UI渲染是需要依赖多个view叠加
Flutter 使用了新的语言Dart,避免了RN的那种通过桥接器与Javascript通讯导致效率低下的问题,所以在性能方面比RN更高一筹
  
3. 高频数据交换下
ReactNative在满帧的情况下实际是卡住的，不能切换路由，后端服务关闭后仍然会执行一段时间，证明有事件堆积。
而Flutter不会影响路由切换，因为Flutter的路由切换在ui主线程上，而react-navigation跑在js线程上。Flutter虽不满帧但可以实时更新数据。
在某些高性能场景下仍需要跨平台，Flutter是你唯一的选择！

4. UI 一致性
Flutter 因为是自己做的渲染，因此在iOS和Android的效果基本完全一致。
ReactNative存在将RN控件转换为对应平台原生控件的过程，存在一定的差异

5. App体积  Flutter较大


## License



[GPL](https://raw.githubusercontent.com/tedQB/trading-evil-collect/master/COPYING)
