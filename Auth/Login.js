import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image} from 'react-native';
import {Root, Container, Content, Header, Form, Label, Input, Item, Button} from 'native-base';
import Icon from '@expo/vector-icons/Ionicons';
//import {db} from './config/firebase';
import {db, auth, storage, firestore} from '../config/Firebase';
import * as Facebook from 'expo-facebook';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


export default class Login extends Component {
  constructor(props){
    super(props);
    //this.dbRef = firestore.collection('User');
    this.state = { loading: true};
     this.state = ({
       email: '',
       password: '',
       push_token:''
   })

/*    auth.onAuthStateChanged(function(user){
      if(user){
        console.log("Logged in", user);
      }else{
        console.log("Logged Out");
      }
   }); */

  }

 async componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })

    this.currentUser = await auth.currentUser;
    await this.registerForPushNotificationsAsync();

  }


  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }


  signUpUser = () => {

    try {

        if (this.state.password.length < 6) {
            alert("Please enter atleast 6 characters")
            return;
        }

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    }
    catch (error) {
        console.log(error.toString())
    }
}

loginUser = () => {

    try {

        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
            
        })
        this.props.navigation.navigate('Router');

    }
    catch (error) {
        console.log(error.toString())
    }
}


registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  try {
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    //firestore.collection('Users').doc(this.currentUser.uid + '/push_token').set(token)
    firestore.collection('Users')
    .doc(auth.currentUser.uid)
    .update({'push_token': token})
    .then(()=>{
    console.log('token', token);
    }).catch((error)=>{
      console.log('error', error);
    })

/*           firebase
      .database()
      .ref('users/' + this.currentUser.uid + '/push_token')
      .set(token); */
  } catch (error) {
    console.log(error);
  }
};


  render() {
    return (
      <Container style={styles.container}>
      <Form>
          <Item floatingLabel>
              <Label>Email</Label>
              <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(email) => this.setState({ email: email })}
              />

          </Item>

          <Item floatingLabel>
              <Label>Password</Label>
              <Input
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(password) => this.setState({ password:password })}
              />
          </Item>

          <Button style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() => this.loginUser()}
          >
              <Text style={{ color: 'white' }}> Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() => this.props.navigation.navigate('SplashScreen')}    /* this.signUpUser() */
          >
              <Text style={{ color: 'white' }}> Sign Up</Text>
          </Button>

      </Form>
  </Container>
    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
});

