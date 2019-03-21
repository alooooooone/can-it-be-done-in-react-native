import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Dimensions, Animated, PanResponder, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('screen');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: []
    }
    this.timer = null
    this.flatListRef = null
    this.pull = false
    this.pullValue = 0
    this.scrollY = new Animated.Value(0)
    this.animated = new Animated.Value(0)
    this.scrollY.addListener((value) => {
      if (this.pull) {
        this.pullValue = value.value
      }
    })
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onPanResponderGrant: () => {
        this.pull = true
      },
      onPanResponderRelease: () => {
        this.pull = false
        if (this.pullValue < -100) {
          this.onRefresh()
        }
      }
    })
  }
  async componentDidMount() {
    // this.onRefresh()
  }
  keyExtractor = (item, index) => item + index
  renderItem = ({ item, index }) => {
    return <TouchableOpacity>
      <View style={styles.itemStyle}>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  }
  onRefresh = async () => {
    if(this.state.refreshing){
      return
    }

    clearTimeout(this.timer)
    this.flatListRef.getNode().scrollToOffset({ offset: -80, animated: true })

    this.setState({
      refreshing: true
    })

    this.startAnimated()

    this.timer = setTimeout(() => {
      this.setState({
        refreshing: false,
        data: ["David", "Mike", "MacBook Pro", "AirPods", "iMac Pro", "Sony PS4", "Nintendo Switch", "Good Job", "Coke", "Tesla"]
      })
    }, 4000);
  }
  startAnimated = () => {
    this.animated.setValue(0)

    Animated.timing(this.animated, {
      toValue: 1,
      duration: 2000
    }).start((finished) => {
      if (finished) {
        if (this.state.refreshing) {
          this.startAnimated()
        } else {
          this.flatListRef.getNode().scrollToOffset({ offset: 0, animated: true })
        }
      }
    })
  }

  render() {
    const progress = this.state.refreshing ? this.animated : this.scrollY.interpolate({
      inputRange: [-160, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.headerStyle}>
            <Text>Header</Text>
          </View>
          <AnimatedFlatList
            onLayout={e => console.log(e.nativeEvent)}
            ref={ref => this.flatListRef = ref}
            {...this._panResponder.panHandlers}
            contentContainerStyle={{ position: 'relative' }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } }]
            )}
            ListHeaderComponent={<View style={[styles.itemStyle, styles.refreshControlStyle]}>
              <LottieView
                progress={progress}
                source={require('./static/lottie/planet.json')} />
            </View>}
            data={this.state.data}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  headerStyle: {
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    flexDirection: 'row',
    width: width,
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  refreshControlStyle: {
    position: 'absolute',
    top: -80,
    left: 0,
    backgroundColor: 'transparent'
  },
  separatorStyle: {
    height: 15,
    backgroundColor: 'transparent'
  }
});
