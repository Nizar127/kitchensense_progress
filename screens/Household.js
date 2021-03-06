import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Image, FlatList,
    UIManager, Animated,
    LayoutAnimation, TextInput, Modal, TouchableHighlight, SafeAreaView
} from 'react-native';
import {
    Container,
    Header,
    Content,
    View,
    Card,
    Right,
    auto,
    CardItem,
    Thumbnail,
    Text,
    Item,
    Left,
    Body,
    Icon,
    List,
    ListItem,
    Separator,
    Textarea,
    Button,
} from 'native-base';
import {db, auth, storage, firestore} from '../config/Firebase';
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';

console.disableYellowBox = true;
 export default function(props) {
    const route = useRoute();
  
    return <Household {...props} route={route} />;
  }  
  
 class Household extends Component {

    constructor() {
        super();
        
        this.state = {
            users: [],
            username: '',
            fullname: '',
            email: '',
            key: '',
            //phoneNum:'',
            description: '',
            profileImage: '',
            keyplayer: '',
            uniqueId: '',
            jobdesc: '',
            photo: '',
            url: '',
            peoplenum: '',
            address:'',
            show: true,
            newContact: "",
            mytext: '',
            data: this.initData,
            isModalVisible: false,
            inputText: '',
            editedItem: 0,

        };
        

    }


    componentDidMount() {
        const {route} = this.props;
        this.accountRef = firestore.collection('Users').where('address', '==', route.params.myaddress);
        this.unsubscribe = this.accountRef.onSnapshot(this.getCollection);
        console.log("route",route.params.myaddress);
    }


    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((res) => {
            const {
                userID,
                email,
                fullname,
                address,
                description,
                url,
                //phoneNum,
            } = res.data();
            users.push({
                key: res.id,
                res,
                userID,
                email,
                fullname,
                address,
                description,
                url,
                //phoneNum,
            });
        });
        this.setState({
            users,
            isLoading: false
        })
        console.log("flatlist",this.state.users)
    }

    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setInputText = (text) => {
        this.setState({ inputText: text })
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }
    handleEditItem = (editedItem) => {
        const newData = this.state.data.map(item => {
            if (item.id === editedItem) {
                item.text = this.state.inputText
                return item
            }
            return item
        })
        this.setState({ data: newData })
    }
    //hide card example
    ShowHideComponent = () => {
        if (this.state.show == true) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    };


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

            //if cancel than here
            deleteUser() {
                const dbRef = firestore.collection('Users').doc(this.state.key)
                  dbRef.delete().then((res) => {
                      console.log('Item removed from database', res)
                      this.props.navigation.navigate('Planning');
        
                  })
                  
              } 


    updateText = (value) => {
        this.setState({ myText: value })
    }

    render() {
        const{route} = this.props;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Container>
                        <Content>              
                            <Card>
                            <Content>
                                <View>
                                    <Text style={{ flex: 1, fontSize: 15, textAlign: 'center', margin: 5}}>Manage Your Household</Text>
                                </View>

                                <View style={{margin: 10}}>
                                    <Text style={{ flex: 1, fontSize: 15, textAlign: 'center', margin: 5}}>List of People on This House</Text>
                                    <View style={{flex: 1, flexDirection:'row'}}>
                                       <Left>
                                           <Icon name="md-location"/>
                                       </Left>
                                        <Text style={{ flex: 1, fontSize: 15,  margin: 5}}>{route.params.myaddress}</Text>

                                    </View>
                                    <Text note style={{ flex: 1, fontSize: 15, textAlign: 'center', margin: 5}}>You can add or remove user</Text>
                                </View>
                            </Content>
                            </Card>
                            <Container>
                                <Content>
                           
                                <View style={{ height: 350,backgroundColor: '#242836', margin:5 }}>
                                 
                                  <FlatList
                                        data={this.state.users}
                                        //contentContainerStyle={{ flexGrow: 1 }}
                                        renderItem={({ item, index }) => {
                                            return (
                                                 <SafeAreaView>
                                                    <ScrollView>
                                                        <List style={{backgroundColor: '#fff', marginTop:5}} key={index} onPress={() => {
                                                          this.props.navigation.navigate('AccountDetail', {
                                                                userkey: item.key
                                                          });
                                                        }}>
                                                            <ListItem>
                                                                
                                                            <Left>
                                                                 <Thumbnail large source={{ uri: item.url  }} />

                                                            </Left>
                                                         
                                                                        <Body>
                                                                            <Text>{item.fullname}</Text>
                                                                        </Body>
                                                            </ListItem>
                                                        </List>                                                     
                                                    </ScrollView>
                                               </SafeAreaView>
                                            )
                                        }}
                                    />
                                 
                                </View>
                                <View style={{flex: 1, flexDirection:'row', margin:10, alignItems: 'center', justifyContent:'space-around'}}>
                                    <Button light onPress={() => this.props.navigation.navigate('Profile')}>
                                        <Text>Cancel</Text>
                                    </Button>
                                    <Button danger iconRight onPress={this.openTwoButtonAlert}>
                                        <Text>Delete</Text>
                                        <Icon name="md-trash-outline"/>
                                    </Button>
                                </View>
                                
                                    </Content>
                                    </Container>
                                
                            

                                </Content>

                                </Container>
                                

                            </ScrollView>

                        </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        backgroundColor: 'white',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    keyplayer: {
        padding: 20,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: 35,

    },
    marginLeft: {
        marginLeft: 5,
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    card: {
        flex: 1,
        elevation: 15,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white',
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    startTextBtn: {
        backgroundColor: 'white',
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
})