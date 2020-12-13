import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Database from '../config'

export default class Searchscreen extends React.Component {
    constructor()
    {
      super()
      this.state = {
        transactionsToDisplay: [],
        lastViewedTransactionLabel: null,
        currentSearchingText : ''
      }
    }



    fetchMoreTransactions = async() =>{
      var text = this.state.currentSearchingText.toUpperCase()
      var EnterText = text.split('')

      if (EnterText[0].toUpperCase() == 'B'){
        const query = await Database.collection('transactions').where('bookId', '==', text) .startAfter(this.state.lastViewedTransactionLabel).limit(10).get()
        query.docs.map((doc) =>{
          this.setState({
            transactionsToDisplay: [...this.state.transactionsToDisplay, doc.data()],
            lastViewedTransactionLabel: doc
          })
        })
      }

      else if (EnterText[0].toUpperCase() == 'S'){
        const query = await Database.collection('transactions').where('bookId', '==', text) .startAfter(this.state.lastViewedTransactionLabel).limit(10).get()
        query.docs.map((doc) =>{
          this.setState({
            transactionsToDisplay: [...this.state.transactionsToDisplay, doc.data()],
            lastViewedTransactionLabel: doc
          })
        })
      }
    }


    SearchTransactions = async(thingtosearch) =>{
     var EnterText = thingtosearch.split('')
     var text = thingtosearch.toUpperCase()

     if (EnterText[0].toUpperCase() === 'S'){
       const query = await Database.collection('transactions').where('studentId', '==', text).get()

       query.docs.map((Doc)=>
       {
        this.setState({
          transactionsToDisplay: [...this.state.transactionsToDisplay, Doc.data()],
          lastViewedTransactionLabel: Doc

        })
       })
     }



     else if(EnterText[0].toUpperCase() == 'B'){
      const query = await Database.collection('transactions').where('bookId', '==', text).get()

      query.docs.map((Doc)=>
      {
       this.setState({
         transactionsToDisplay: [...this.state.transactionsToDisplay, Doc.data()],
         lastViewedTransactionLabel: Doc

       })
      })
     }
    }

    componentDidMount = async() =>
    { 
      const query = await Database.collection("transactions").get()

      query.docs.map((doc)=>{
        this.setState({
          transactionsToDisplay:[...this.state.transactionsToDisplay, doc.data()]
        })
      })

    }
    

    render() {
      return (
     
        <View>
           <View>
          <Text>sdkhusdjhjh</Text>
          <TextInput
              placeholder = 'type a studentid or bookid'
            
              onChangeText = {(text) =>{
                this.setState({currentSearchingText: text})
              }}
            >
      
          </TextInput>
          
            <TouchableOpacity
              onPress = {() =>{
                this.SearchTransactions(this.state.currentSearchingText)
              }}
            >
            
            </TouchableOpacity>
        

       </View>

       <FlatList 


          data = {this.state.transactionsToDisplay}
          renderItem = {

          (Value) =>{
            <View>
            <Text>Date: {Value.date.toDate()}</Text>
            <Text>BookID: {Value.bookID}</Text>
            <Text>StudentID: {Value.studentId}</Text>
            <Text>TransactionType: {Value.transactionType}</Text>
          </View>
          }

          }


          keyExtractor = {(Value, index) =>{
          index.toString()  
          }
          }
          onEndReached = {this.fetchMoreTransactions}
          onEndReachedThreshold = {0.7}
          />
        </View>

      



      
     
      );
    }
  }
