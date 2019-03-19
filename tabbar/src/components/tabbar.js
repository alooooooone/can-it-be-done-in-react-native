import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';

const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const AnimatedPath = Animated.createAnimatedComponent(Path)
const { width } = Dimensions.get('screen');
const BottomTab = [{
    name: 'home',
    icon: 'home',
    backgroundColor: '#FA002E',
},{
    name: 'smartphone',
    icon: 'smartphone',
    backgroundColor: 'green',
},{
    name: 'tv',
    icon: 'tv',
    backgroundColor: 'blue',
},{
    name: 'cloud-rain',
    icon: 'cloud-rain',
    backgroundColor: '#FA002E',
}]
const tabWidth = width / BottomTab.length
const tabHeight = 90
const iconRadius = tabWidth - 35

class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: 50,
            active: 0,
            prevActive: 0
        }

        this.value2.addListener((p) => {
            this.setState({
                radius: p.value,
            });
        });
    }
    svgTransXValue = new Animated.Value(0)
    value2 = new Animated.Value(50)

    startAnimation = (index) => {
        const {
            navigation
        } = this.props;

        return () => {
            this.setState({
                active: index,
                prevActive: this.state.active
            })
            navigation.navigate(navigation.state.routes[index].key)
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(this.value2, {
                        duration: 200,
                        toValue: 20
                    }),
                    Animated.timing(this.value2, {
                        duration: 100,
                        toValue: 50
                    }),
                ]),
                Animated.spring(this.svgTransXValue, {
                    toValue: index * tabWidth
                }),
            ]).start()
        }
    }

    renderBottomTab = () => {
        return BottomTab.map((item, index) => {
            const transY = this.svgTransXValue.interpolate({
                inputRange: [tabWidth * (index - 1), tabWidth * index, tabWidth * (index + 1)],
                outputRange: [tabHeight+10, -20, tabHeight+10],
                extrapolate: 'clamp'
            })
            // const zIndex = this.svgTransXValue.interpolate({
            //     inputRange: [tabWidth * (index - 1), tabWidth * index, tabWidth * (index + 1)],
            //     outputRange: [-1, 1, -1],
            //     extrapolate: 'clamp'
            // })
            return (
                <TouchableOpacity activeOpacity={1} key={item.name + index} onPress={this.startAnimation(index)} style={styles.button}>
                    {
                        this.state.active !== index ? <View style={styles.icon_static}>
                            <Icon name={item.icon} size={30} color={"#bababa"} />
                        </View> : null
                    }
                    <Animated.View style={[styles.icon, { transform: [{ translateY: this.state.active == index || this.state.prevActive == index ? transY : tabHeight + 10 }]}]}>
                        <Icon name={item.icon} size={30} color={this.state.active === index ? "#000" : "#bababa"} />
                    </Animated.View>
                </TouchableOpacity>
            )
        })
    }

    render() {
        const { svgTransXValue } = this;
        const d = `
                M 0,0
                L ${width},0
                C ${width + tabWidth / 4},${tabHeight-50} ${width + tabWidth / 5},${this.state.radius} ${width + tabWidth / 2},${this.state.radius} ${width + tabWidth * 4 / 5},${this.state.radius} ${width + tabWidth * 3 / 4},${tabHeight-50} ${width + tabWidth},0
                L ${width * 2},0
                L ${width * 2},${tabHeight}
                L 0,${tabHeight}
                Z
            `
        const translateX = svgTransXValue.interpolate({
            inputRange: [0, width],
            outputRange: [-width, 0]
        })
        return (
            <View style={[styles.container, {backgroundColor: BottomTab[this.state.active].backgroundColor}]}>
                <AnimatedSvg
                    width={width * 2}
                    height={180}
                    style={{transform: [{translateX}], backgroundColor: 'transparent'}}>
                    <AnimatedPath d={d} fill="#fff" stroke="rgb(255,255,255)" style={{zIndex: 100}}/>
                </AnimatedSvg>
                <View style={styles.icon_row}>
                    { this.renderBottomTab() }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height: tabHeight,
        bottom: 0,
        left: 0
    },
    button: {
        width: tabWidth,
        height: tabHeight,
        alignItems: 'center',
        zIndex: 1
    },
    icon_row: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0 
    },
    icon: {
        width: iconRadius,
        height: iconRadius,
        borderRadius: iconRadius / 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#000',
        shadowOpacity: 0.8
    },
    icon_static: {
        width: iconRadius,
        height: iconRadius,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'transparent'
    }
})

export default TabBar;