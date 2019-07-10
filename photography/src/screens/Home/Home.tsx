import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Block, Text } from '../../components';
import DeviceInfo from '../../constants/Device';
import Icon from 'react-native-vector-icons/Feather';
import Theme from '../../constants/Theme';
import { NavigationScreenProp } from 'react-navigation';

const { headerPadding, footerPadding, width } = DeviceInfo;
const { margin, padding } = Theme.sizes;
const { blue } = Theme.colors;

interface Props {
    navigation: NavigationScreenProp<any, any>
}

const Home = (props: Props) => {
    let x = new Animated.Value(0)
    let scrollRef = null;
    const [active, setActive] = useState(0);

    return (
        <Block padding={[headerPadding, 0, footerPadding, 0]}>
            <Block flex={false} row margin={[0, margin]}>
                <Block>
                    <Text big bold>ShaKira</Text>
                    <Text title>Photographer</Text>
                </Block>
                <Block flex={false} marginTop={5} style={{ position: 'relative' }}>
                    <TouchableOpacity>
                        <Icon name="bell" size={28} color="#D2D3DA" />
                    </TouchableOpacity>
                    <Block flex={false} width={6} height={6} color={blue} style={{ position: 'absolute', top: 0, right: 0, borderRadius: 3 }} />
                </Block>
            </Block>
            <Block flex={false} center>
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{
                            nativeEvent: { contentOffset: { x } },
                        }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: padding, marginTop: 50 }}>
                    {
                        new Array(10).fill(1).map((t, i) => (
                            <TouchableOpacity key={i.toString()} onPress={() => props.navigation.navigate('Detail')}>
                                <Block flex={false} width={100} height={100} color={blue} card shadow style={{ marginRight: i === 9 ? 0 : margin }}></Block>
                            </TouchableOpacity>
                        ))
                    }
                </Animated.ScrollView>
                <Block flex={false} width={width * 0.5} height={4} card color="#D2D3DA" marginTop={40} style={{ overflow: 'hidden' }}>
                    <Animated.View style={{
                        width: width * 0.5, height: 4, borderRadius: 20, backgroundColor: blue, transform: [{
                            translateX: x.interpolate({
                                inputRange: [0, (100 + margin) * 10 + margin - width],
                                outputRange: [-width * 0.5 / 10 * 9, 0]
                            })
                        }]
                    }} />
                </Block>
            </Block>
            <Block flex={false} marginTop={50}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: padding }}>
                    {
                        ['Hot', 'Scenery', 'Living', 'Art', 'Design'].map((t, i) => (
                            <TouchableOpacity key={i.toString()} onPress={() => {
                                setActive(i)
                                scrollRef.scrollTo({ x: i * width })
                            }}>
                                <Block flex={false} style={{ marginRight: margin * 2 }}>
                                    <Text title style={[i === active && { color: '#1B2031' }]}>{t}</Text>
                                </Block>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <ScrollView
                    ref={ref => scrollRef = ref}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    snapToOffsets={[width]}
                    snapToInterval={0.99}
                    decelerationRate='fast'>
                    {
                        ['#4FAEF6', '#8DBFCD', '#AEDAF7', '#C4C8B5', '#B3DCEE'].map(item => (
                            <Block key={item} flex={false} width={width}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: padding, marginVertical: 20 }}>
                                    {
                                        new Array(3).fill(1).map((t, i) => (
                                            <TouchableOpacity key={i.toString()}>
                                                <Block flex={false} width={200} height={120} color={item} card style={{
                                                    marginRight: margin,
                                                    shadowColor: item,
                                                    shadowOffset: { width: 0, height: 0 },
                                                    shadowOpacity: 0.3,
                                                    shadowRadius: 7
                                                }}></Block>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </Block>
                        ))
                    }
                </ScrollView>
            </Block>
            <Block flex={false} margin={[0, margin]} marginTop={35}>
                <Text big medium>Style Exposition</Text>
                <Text title marginTop={10}>Every photographer has his own unique shooting style, from the subject of photography, there is a preference for scenery, portraits, humanities, architecture life</Text>
                <Block flex={false} row marginTop={30}>
                    <TouchableOpacity style={{ marginRight: margin }}>
                        <Icon name="facebook" size={20} color="#D9DDE4" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: margin }}>
                        <Icon name="twitter" size={20} color="#D9DDE4" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="linkedin" size={20} color="#D9DDE4" />
                    </TouchableOpacity>
                </Block>
            </Block>
        </Block>
    )
}

export default Home;
