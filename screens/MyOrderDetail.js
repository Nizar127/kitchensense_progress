import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem, ListItem } from 'native-base';
import {auth, firestore, db} from '../config/Firebase'
//import JobList from '../../components/chat/JobList';

const { width, height } = Dimensions.get('window')

/* sendNotification = async()=>{

    console.log("send_notificaiton")
    console.log("uid", auth.currentUser.uid)
            try{
         */
                if(true){
                    firestore.collection('IngredientList').get().then((snapshot) =>{
                        snapshot.forEach((childSnapshot) =>{
                            var expiry = childSnapshot.data().expiry_Date;
                            console.log("expotoken",expiry)
                            var dateEnd = new Date(Date.now() + 3* 24 * 60 * 60 * 1000);

                            if(expiry == dateEnd){
                                const trigger = new Date(Date.now() + 3* 24 * 60 * 60 * 1000);
                                trigger.setMinutes(0);
                                trigger.setSeconds(0);
                                
                                Notifications.scheduleNotificationAsync({
                                    content: {
                                        title: 'This Item Will Expired in 3 days',
                                    },
                                    trigger,
                                })
                            }


                                                  
                        })
                    })
                    
                }
/*             }catch(error){
                console.log(error)
            }
          }
 */
export default class MyOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            arduinoWeight:'',
            uniqueId: null,
            jobname: null,
            jobdesc: null,
            salary: null,
            peoplenum: null,
            chosenDate: null,
            ingredientname:null,
                ingredientDesc:null,
                quantity:null,
                date_bought:null,
                expiry_Date:null,
                ExpiryReceived:null,
                alert:null, 
            url: null,
            dynamicAddress: [],
            item: {},
            items: [],
        }

    }

    componentDidMount() {
        const detailRef = firestore.collection('IngredientList').doc(this.props.route.params.userkey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const job = res.data();
                this.setState({
                    key: res.id,
                    ingredientname: job.ingredientname,
                    ingredientDesc: job.ingredientDesc,
                    quantity: job.quantity,
                    date_bought: job.date_bought,
                    expiry_Date: job.expiry_Date,
                    ExpiryReceived: job.ExpiryReceived,
                    alert: job.alert, 
                    url: job.url
                });
                console.log("state", this.state)
            } else {
                console.log("Whoops! Document does not exists");
            }
        })
        
        let weightRef = db.ref('/quantity');
        weightRef.on('value', (snapshot) => {
            let data = snapshot.val();
              if(data){
                let firebaseData = Object.values(data);
                this.setState({arduinoWeight: firebaseData});
                console.log(this.state.arduinoWeight);
              }
         });
    }


    
    setUniqueId = (value) => {
        this.setState({ uniqueId: value });
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }

      updateQuantity() {
        this.setState({
          isLoading: true,
        });
        const updateDBRef = firestore.collection('IngredientList').doc(this.state.key);
        updateDBRef.update({
                quantity: this.state.quantity,
        }).then((docRef) => {
          this.setState({
            key: '',
            quantity: '',
            isLoading: false,
          });
         // sendNotificationToAllUsers
        })
        .catch((error) => {
          console.error("Error: ", error);
          this.setState({
            isLoading: false,
          });
        });
      }

      sendNotificationToAllUsers = async () => {
        const users = await firestore.collection('Users').get();
        users.docs.map((user) =>this.sendNotification(user.data().expoToken));
    } 
    
    sendNotification = async()=>{

console.log("send_notificaiton")
console.log("uid", auth.currentUser.uid)
        try{
    
            if(true){
                firestore.collection('Users').get().then((snapshot) =>{
                    snapshot.forEach((childSnapshot) =>{
                        var expotoken = childSnapshot.data().push_token;
                        console.log("expotoken",expotoken)
                                              
    
                        fetch('https://exp.host/--/api/v2/push/send',
                         {
                            method: 'POST',
                            headers: {
                            Accept: 'application/json',
                            'Accept-encoding': 'gzip, deflate',
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify
                            ({
                                to: expotoken.data,
                                sound: 'default',
                                title: 'KitchenSense',
                                body: 'This item'+ingredientname+'has been in Low Quantity.'
                            })
                        }).then((response)=>{
                            console.log(response)
                        });
                    })
                })
                
            }
        }catch(error){
            console.log(error)
        }
      }
    
    
      deleteUser() {
        const deleteRef = firestore.collection('IngredientList').doc(this.props.route.params.userkey)
          deleteRef.delete().then((res) => {
              console.log('Item removed from database')
              this.props.navigation.navigate('MyOrderDetail');
          })
      }
    
      openAlert=()=>{
        Alert.alert(
          'Delete Item',
          'Are you sure?',
          [
            {text: 'Yes', onPress: () => this.deleteUser()},
            {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
        }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>
                </Header>

                <Content padder>
                    <Card>
                       <CardItem bordered header style={{flexDirection:'column', padding: 10}}>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.ingredientname}</Text>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 300 }}>
                        <Image source={{ uri: this.state.url }} style={{ height: 300 }} />
                    </Card>

                    <Card>

                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>Expiry Date</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.expiry_Date}</Text>
                            </Body>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>About The Ingredient</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.ingredientDesc}</Text>
                            </Body>
                        </CardItem>
                    </Card>


                    <Card style={{ height: 400 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Quantity</Text>
                        </CardItem>
                        <CardItem cardBody style={{flexDirection:'column', padding: 10}}>
                            <Body>
                                <ListItem>
                                    <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.quantity}</Text>
                                </ListItem>

                            </Body>
                        </CardItem>
                        <CardItem>
                            <TextInput
                                    placeholder={'Quantity'}
                                    value={this.state.quantity}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'quantity')}
                                />
                                <Body>
                                                                   
                                 <Button primary onPress={() => this.updateQuantity() } >
                                        <Text>Update</Text>
                                    </Button>
                                </Body>
                        </CardItem>

                     </Card>
                    <Card>
                        <CardItem cardBody>
                        <Text style={{ fontWeight: "bold" }}>Alert</Text>
                            <Body>
                                <ListItem>
                                  <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.alert}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>

                    </Card>

                     <Card>
                     <View style={{flex: 1, flexDirection:'row', margin: 10, alignItems: 'center', justifyContent:'space-around'}}>
                                    <Button primary onPress={() => this.sendNotificationToAllUsers()} >
                                        <Text>Update</Text>
                                    </Button>
                                    <Button danger iconRight /* onPress={this.openAlert} */>
                                        <Text>Delete</Text>
                                        <Icon name="md-trash-outline"/>
                                    </Button>
                                </View>
                     </Card>


                </Content>




            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
/*     map: {
        height: 300,
        // disabledwidth: 100,
        width: 370,
        //...StyleSheet.absoluteFillObject
    }, */
});

