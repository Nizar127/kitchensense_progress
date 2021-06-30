import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem, ListItem } from 'native-base';
import {auth, firestore} from '../config/Firebase'
//import JobList from '../../components/chat/JobList';

const { width, height } = Dimensions.get('window')


export default class MyOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
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
    }


    
    setUniqueId = (value) => {
        this.setState({ uniqueId: value });
    }

    updateIngredient() {
        this.setState({
          isLoading: true,
        });
        const updateDBRef = firestore.collection('IngredientList').doc(this.state.key);
        updateDBRef.set({
            ingredientname: this.state.ingredientname,
                ingredientDesc: this.state.ingredientDesc,
                quantity: this.state.quantity,
                date_bought: this.state.date_bought,
                expiry_Date: this.state.expiry_Date,
                ExpiryReceived: this.state.ExpiryReceived,
                alert: this.state.alert, 
                url: this.state.url,

        }).then((docRef) => {
          this.setState({
            key: '',
            ingredientname:'',
                ingredientDesc:'',
                quantity:'',
                date_bought:'',
                expiry_Date:'',
                ExpiryReceived:'',
                alert:'', 
                url:'',

            isLoading: false,
          });
          try{

            if(quantity === this.state.alert){
                firestore.collection('Users').doc(auth.currentUser.uid).get().then((snapshot) =>{
                    snapshot.foreach((childSnapshot) =>{
                        var expotoken = childSnapshot.val().expoToken;
                        let response = fetch('https://exp.host/--/api/v2/push/send',
                         {
                            method: 'POST',
                            headers: {
                            Accept: 'application/json',
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

          this.props.navigation.navigate('MyOrderDetail');

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
              this.props.navigation.navigate('MyOrderDetailn');
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
                       <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.jobname}</Text>

                        </CardItem>
                    </Card>
                    <Card style={{ height: 300 }}>
                        <Image source={{ uri: this.state.url }} style={{ height: 300 }} />
                    </Card>

                    <Card>
                        <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >Employer Email</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobCreatorName}</Text>
                            </Body>
                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>Unique Id</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.uniqueId}</Text>
                            </Body>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobdesc}</Text>
                            </Body>
                        </CardItem>
                    </Card>


                    <Card style={{ height: 400 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Requirement</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                    <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.worktype}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                  <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.qualification}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                    <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.experience}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                     </Card>
                     <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Number of People Required:</Text>

                         </CardItem>
                        <CardItem cardBody style={{ marginTop: 20 }}>
                            
                            <Body>
                                <Text> {this.state.peoplenum}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Salary</Text>
                        </CardItem>
                        <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
                            <Body><Text>$ {this.state.salary}</Text></Body>
                        </CardItem>
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

