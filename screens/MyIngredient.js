import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { StyleSheet, Alert, FlatList, View, ActivityIndicator } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Left, Right, Header, Body } from 'native-base';
import {auth, firestore, storage,db} from '../config/Firebase';



export default class MyIngredient extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            jobs: []
        }
    }




    componentDidMount() {
        //check data belong to you only
        this.applicationRef = firestore.collection('IngredientList').where('uid', '==', auth.currentUser.uid);
        this.unsubscribe = this.applicationRef.onSnapshot(this.getCollection);

    }


    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((res) => {
            const {            
                uid,     
                ingredientname,
                ingredientDesc,
                quantity,
                date_bought,
                expiry_Date,
                ExpiryReceived,
                alert, 
                url} = res.data();
            jobs.push({
                key: res.id,
                res,
                uid,
                ingredientname,
                ingredientDesc,
                quantity,
                date_bought,
                expiry_Date,
                ExpiryReceived,
                alert, 
                url
            });
        });
        this.setState({
            jobs,
            isLoading: false
        })
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (

            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>

                </Header>

                <Content padder>
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Ingredient List</Text>
                    <FlatList
                        data={this.state.jobs}
                        style={{padding:10}}
                        renderItem={({ item, index }) => {
                            return (
                                <ListItem key={index}
                                    // onLongPress={(jobname) => { this.deleteConfirmation(jobname) }}
                                    onPress={() => {
                                        this.props.navigation.navigate('MyIngredientDetail', {
                                            userkey: item.key
                                        });
                                    }}>
                                    <Left>
                                        <Text>{item.ingredientname}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            )
                        }}
                    />
 
                </Content>



                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => { this.props.navigation.navigate('PostFood') }}>
                            <Icon name="md-briefcase" />
                            <Text>New Ingredient</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
