import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem, ListItem } from 'native-base';
import {auth, firestore} from '../config/Firebase'
//import JobList from '../../components/chat/JobList';

const { width, height } = Dimensions.get('window')






/* const sendNotification = async()=>{


    try{

        if(quantity <= this.state.alert){
            firestore.collection('Users').doc(auth.currentUser.uid).get().then((snapshot) =>{
                snapshot.foreach((childSnapshot) =>{
                    var expotoken = childSnapshot.val().push_token;
                    console.log("expotoken",expotoken)

                    async function sendPushNotification(expoPushToken) {
                        const message = {
                          to: expoPushToken,
                          sound: 'default',
                          title: 'Original Title',
                          body: 'And here is the body!',
                          data: { someData: 'goes here' },
                        };
                      
                        await fetch('https://exp.host/--/api/v2/push/send', {
                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Accept-encoding': 'gzip, deflate',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(message),
                        });
                      }
                      

                    let response = fetch('https://exp.host/--/api/v2/push/send',
                     {
                        method: 'POST',
                        headers: {
                        Accept: 'application/json',
                        'Accept-encoding': 'gzip, deflate',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify
                        ({
                            to: expotoken,
                            sound: 'default',
                            title: 'Kitchen Sense',
                            body: 'This item has been in Low Quantity.'
                        })
                    });
                })
            })
            
        }
    }catch(error){
        console.log(error)
    }
  }
 */

/* const sendNotificationToAllUsers = async () => {
    const users = await firestore.collection('Users').get();
    users.docs.map((user) =>sendNotification(user.data().expoToken));
} */

export default class NotifyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            uid :null,
            date_to_buy: null,
            itemname:null,
            itemDesc: null,
            orderDescription: null, 
            orderManPhoneNum: null,
            orderedEmail: null,
            orderedMan: null,
            orderedid: null,
            userPicture: null, 
            people_inChargeID: null, 
            url: null,
        }
        this.AcceptJob = this.AcceptJob.bind(this);

    }

    componentDidMount() {
        const detailRef = firestore.collection('Notifications_Planner').doc(this.props.navigation.state.params.notifykey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const job = res.data();
                this.setState({
                    key: res.id,
                    date_to_buy:job.date_to_buy,
                    itemname:job.itemname,
                    itemDesc: job.itemDesc,
                    orderDescription: job.orderDescription, 
                    orderManPhoneNum: job.orderManPhoneNum,
                    orderedEmail: job.orderedEmail,
                    orderedMan: job.orderedMan,
                    orderedid: job.orderedid,
                    userPicture: job.userPicture, 
                    people_inChargeID: job.people_inChargeID, 
                    url: job.url,
                });
                console.log("state", this.state)
            } else {
                console.log("Whoops! Document does not exists");
            }
        })


    }


    AcceptJob = async() =>{
        //console.log("text_id", id);
    
        let dbref = firestore.collection('Notifications_Planner').doc(this.state.key).get();
        dbref.then(doc => {
            const job = doc.data();
            this.setState({
                ...this.state,
                key:doc.id,
                date: job.get('date_to_buy'),
                name_item: job.get('itemname'),
                Desc_item: job.get('itemDesc'),
                PersonPhoneNum: job.get('orderManPhoneNum'),
                PersonEmail:job.get('orderedEmail'),
                PersonName: job.get('orderedMan'),
                PersonId:job.get('orderedId'),
                PersonPicture: job.get('userPicture'), 
                people_InCharge: job.get('people_inChargeID'), 
                pic: job.get('url'),
            }, () => {
    
                console.log("state", this.state)
                console.log("auth.currentUser", auth.currentUser)
                console.log("uid", auth.current.uid)
                console.log("date", this.state.date)
                console.log("userpicture", this.state.PersonPicture)
                console.log("people_inchargeID",this.state.people_InCharge)
                console.log("url", this.state.url)
    
                if (this.state.PersonId != null) 
                {
                    this.plannerRef.add({
                        userid:auth.currentUser.uid,
                        date: this.state.date,
                        name_item: this.state.name_item,
                        Desc_item: this.state.Desc_item,
                        PersonPhoneNum: this.state.PersonPhoneNum,
                        PersonEmail: this.state.PersonEmail,
                        PersonName: this.state.PersonName,
                        PersonId: this.state.PersonId,
                        PersonPicture: this.state.PersonPicture, 
                        people_InCharge: this.state.people_InCharge, 
                        orderedMan: this.state.orderedMan,
                        userPicture: this.state.userPicture,
                        pic: this.state.pic
                        //createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    }).then((res) => {
                        console.log("[saveData] Done add to firebase", res);
                            
    /*                         this.setState({
                            itemname,
                            itemDesc,
                            date_to_buy,
                            people_inCharge,
                            url 
                        }) */
                    });
                    //once done add to database, delete from notification planner
        
                    //console.log("timestamp",timestamp)
                     //this.sendNotiToUser   //send noti to user   
                    Alert.alert('Your Job Has Been Posted', 'Please Choose',
                        [
                            {
                                text: "Return To Main Screen",
                                onPress: () => this.props.navigation.navigate('Home')
                            },
                            {
                                text: "View Current Job Posted",
                                onPress: () => this.props.navigation.navigate('Profile')
                            }
                        ], { cancelable: false }
                    ).catch((err) => {
                            console.error("Error found: ", err);
                            // this.setState({
                            //   isLoading: false,
                            // });
                        });
                }else{
                    Alert.alert('Empty Field')
                }
            });
    
        });
    
    }



    deleteUser() {
        const dbRef = firestore.collection('Notifications_Planner').doc(this.state.key)
          dbRef.delete().then((res) => {
              console.log('Item removed from database', res)
              this.props.navigation.navigate('Planning');

          })
          
      } 



    
    setUniqueId = (value) => {
        this.setState({ uniqueId: value });
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }

      updateUser() {
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

      deleteUser() {
        const deleteRef = firestore.collection('IngredientList').doc(this.props.route.params.userkey)
          deleteRef.delete().then((res) => {
              console.log('Item removed from database')
              this.props.navigation.navigate('MyOrderDetail');
          })
      }
    
      openTwoButtonAlert=()=>{
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
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.itemname}</Text>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 300 }}>
                        <Image source={{ uri: this.state.url }} style={{ height: 300 }} />
                    </Card>

                    <Card>

                        <CardItem bordered>
                        <Left>
                            <Thumbnail source={{ uri: this.state.userPicture }} />
                        </Left>
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
                                <Text>{this.state.date_to_buy}</Text>
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
                                <TextInput
                                    placeholder={'Quantity'}
                                    value={this.state.quantity}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'quantity')}
                                />
                            </Body>
                        </CardItem>
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
                                    <Button primary onPress={this.AcceptJob.bind(this)} >
                                        <Text>Accept</Text>
                                    </Button>
                                    <Button danger iconRight onPress={this.openTwoButtonAlert} >
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

