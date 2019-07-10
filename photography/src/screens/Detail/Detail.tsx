import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Block, Text } from '../../components';
import DeviceInfo from '../../constants/Device';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationScreenProp } from 'react-navigation';

const { width, height, headerPadding } = DeviceInfo;

interface Props {
    navigation: NavigationScreenProp<any, any>
}
const Detail = (props: Props) => {
    return (
        <Block style={{position: 'relative'}}>
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{position: 'absolute', top: headerPadding + 5, left: 15, zIndex: 10}}>
                <Icon name="chevron-left" size={36} color="#fff"/>
            </TouchableOpacity>
            <Block flex={false} width={width} height={height- 200} color="#C4E7FE"></Block>
            <Block flex={false} width={width} height={260} color="#fff" style={{paddingTop: 30, borderTopLeftRadius: 60, transform: [{translateY: -60}]}}>
                <Text h1 style={{marginLeft: 30}}>Size</Text>
                <Block row center flex={false} marginTop={15} style={{paddingLeft: 30}}>
                    {
                        ['S', 'M', 'L', 'XL'].map(item => (<Block key={item} flex={false} width={55} height={55} card center middle style={{borderWidth: 1, borderColor: '#ACAAAD', marginRight: 15}}>
                            <Text title>{item}</Text>
                        </Block>))
                    }
                    <Icon name="more-vertical" size={28} color="#ACAAAD" style={{position: 'absolute', right: 30}}/>
                </Block>
            </Block>
            <Block flex={false} width={width} height={290} color="#4FAEF6" center style={{ borderTopLeftRadius: 60, transform: [{translateY: -150}, {translateX: 30}]}}>
                <Text h1 color="#fff" marginTop={20}>Buy</Text>
            </Block>
        </Block>
    )
}

export default Detail;
