import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput
} from 'react-native';

import { MonoText } from '../components/StyledText';
import ListItem from '../components/ListItem';



export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.success = this.success.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: true,
      searchInput:'',
      clearInput:false,
      data: [
        {key: 'Lol'},
        {key: '1. element'},
        {key: '3. element'},
        {key: '4. element'},
        {key: '5. element'},
      ]
    };
  }
  renderSeparator() {
    return (
        <View style={styles.separatorViewStyle}>
          <View style={styles.separatorStyle} />
        </View>
    );
  }

  success(key) {
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({
      data,
    });
  }

  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }
  renderItem(item) {
    return (
        <ListItem
            text={item.key}
            success={this.success}
            setScrollEnabled={enable => this.setScrollEnabled(enable)}
        />
    );
  }
  render () {
    return (
        <View style={styles.container}>
          <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Image
                  source={
                    __DEV__
                        ? require('../assets/images/robot-dev.png')
                        : require('../assets/images/robot-prod.png')
                  }
                  style={styles.welcomeImage}
              />
            </View>

            <View style={styles.getStartedContainer}>
              <DevelopmentModeNotice/>

              <Text style={styles.getStartedText}>Get started by opening</Text>

              <View
                  style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                <MonoText>screens/HomeScreen.js</MonoText>
              </View>

              <Text style={styles.getStartedText}>
                Change this text and your app will automatically reload.
              </Text>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
                <Text style={styles.helpLinkText}>
                  Help, it didn’t automatically reload!
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.helpContainer}>
              <TextInput
                  style={styles.textInputArea}
                  onEndEditing={(text) => {
                    this.setState({
                      data: [...this.state.data, {key: `${text.nativeEvent.text}`}]
                    })
                    this.value = ''
                  }}
                  placeholder={'Add new Item...'}git
              />
            </View>
            <View>
              <FlatList
                data={this.state.data}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({item}) => this.renderItem(item)}
                scrollEnabled={this.state.enable}
              />
            </View>
          </ScrollView>
        </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#fff',
  },
  textInputArea: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: 200,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
