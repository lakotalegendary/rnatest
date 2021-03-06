import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, PanResponder} from 'react-native';

const {width} = Dimensions.get('window');

export default class ListItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.gestureDelay = -35;
        this.scrollViewEnabled = true;

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx > 35) {
                    this.setScrollViewEnabled(false);
                    let newX = gestureState.dx + this.gestureDelay;
                    position.setValue({x: newX, y: 0});
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < 150) {
                    Animated.timing(this.state.position, {
                        toValue: {x: 0, y: 0},
                        duration: 150,
                    }).start(() => {
                        this.setScrollViewEnabled(true);
                    });
                } else {
                    Animated.timing(this.state.position, {
                        toValue: {x: width, y: 0},
                        duration: 300,
                    }).start(() => {
                        this.props.success(this.props.text);
                        this.setScrollViewEnabled(true);
                    });
                }
            },
        });

        this.panResponder = panResponder;
        this.state = {position};
    }

    setScrollViewEnabled(enabled) {
        if (this.scrollViewEnabled !== enabled) {
            this.props.setScrollEnabled(enabled);
            this.scrollViewEnabled = enabled;
        }
    }

    render() {
        return (
            <View style={styles.listItem}>
                <Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
                    <View style={styles.absoluteCell}>
                        <Text style={styles.absoluteCellText}>DELETE</Text>
                    </View>
                    <View style={styles.innerCell}>
                        <Text style={{color:'#fff'}}>
                            {this.props.text}
                        </Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        height: 50,
        marginLeft: -100,
        justifyContent: 'center',
        backgroundColor: 'red',
        color: '#fff',
    },
    absoluteCell: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: '#fff',
    },
    absoluteCellText: {
        margin: 16,
        color: '#FFF',
    },
    innerCell: {
        width: width,
        height: 50,
        marginLeft: 100,
        backgroundColor: '#023c69',
        color:'#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});