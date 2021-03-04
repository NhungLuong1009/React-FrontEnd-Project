import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from '../Header/Header';
import './GetReddits.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class GetReddits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySelectedData: [],
      myFetchData: [],
      myCleanFetchData: [],
      myCleanData:[],
      sortKeyword: "hot",
      subKeyword: "All",
      isChecked: false,
    };
    this.selectData = this.selectData.bind(this);
    this.insertData = this.insertData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchInitalData = this.fetchInitalData.bind(this)
    this.fetchDataWithNewSortKeyword = this.fetchDataWithNewSortKeyword.bind(this)
    this.getLastSearchKeyWord = this.getLastSearchKeyWord.bind(this)
  }

  selectData(e,data) {
    if(e.target.checked){
      if (data) {
        this.setState(
          {
            mySelectedData: [...this.state.mySelectedData, data],
          },
          () => {
            // console.log(this.state.mySelectedData);

          }
        );
      }
    }
    else{
      this.state.mySelectedData.map((item,index)=>{
        if(item == data){
          item.isChecked = false;
        }
      })
      let filteredArray = this.state.mySelectedData.filter(item => JSON.parse(item).title !== JSON.parse(data).title)
      this.setState(
        {
          mySelectedData: filteredArray,
        },
        () => {
          console.log(this.state.mySelectedData)

        }
      );

    }

  }


  insertData(data) {
    if (data) {
      this.setState(
        {
          myCleanFetchData: [
            ...this.state.myCleanFetchData,
            {
              title: data.data.title,
              thumbnail: data.data.thumbnail,
              isChecked: false,
            },
          ],
        },
        () => {
        }
      );
    }
  }

  fetchInitalData(){
     console.log(this.state.subKeyword)
    axios
    .get(
      `https://www.reddit.com/r/${this.state.subKeyword}/${this.state.sortKeyword}.json?limit=10`
    )
    .then((res) => {
      this.setState({
        myFetchData: res.data.data.children,
      });
    })
    .then(() => {
      this.state.myFetchData.map((item, index) => {
        this.insertData(item);
      });

      // Check selected from storage
      let storedData = JSON.parse(
        "[" + localStorage.getItem("myValueInLocalStorage") + "]"
      );
      if (this.state.mySelectedData.length == 0 && storedData[0] !== null) {
        storedData.map((item, index) => {
          this.setState(
            {
              mySelectedData: [
                ...this.state.mySelectedData,
                JSON.stringify(item),
              ],
            },
            () => {}
          );
        });
      }
    });
  }

  fetchDataWithNewSortKeyword(){
    axios
    .get(
      `https://www.reddit.com/r/${this.state.subKeyword}/${this.state.sortKeyword}.json?limit=10`
    )
    .then((res) => {
      this.setState({
        myFetchData: res.data.data.children,
      }, ()=>{

        this.setState({
          myCleanFetchData:[]
        },()=>{
          setTimeout(() => {
            this.state.myFetchData.map((data,index)=>{
              this.setState({
                myCleanFetchData: [
                  ...this.state.myCleanFetchData,
                  {
                    title: data.data.title,
                    thumbnail: data.data.thumbnail,
                    isChecked: false,
                  },
                ],
              })
            })          
          }, 0);
          
        })

      });
    })
  }

  getLastSearchKeyWord(){
    this.setState({
      subKeyword: localStorage.getItem("lastSearchKeyWord")
    },()=>{
        console.log(this.state.subKeyword)
    })
  }
  componentDidMount() {
    this.getLastSearchKeyWord()
    setTimeout(() => {
      this.fetchInitalData()
    })
  }
  componentDidUpdate() {
  }


  handleSubmit(event) {
    localStorage.setItem(
      "myValueInLocalStorage",
      this.state.mySelectedData
    );
  }



  render() {
    const myData = this.state.myCleanFetchData;
    console.log(myData)
    const lastSearchKeyword = localStorage.getItem("lastSearchKeyWord")
    return (
      <div>
        <Header searchDefault={lastSearchKeyword} update={(newSub) => this.setState({subKeyword:newSub},()=>{
          this.fetchDataWithNewSortKeyword()
          localStorage.setItem(
            "lastSearchKeyWord",
            this.state.subKeyword
          );
        })}/> 

        <form onSubmit={this.handleSubmit}>
          <ul>
            {myData.length !== null &&
              myData.map((item, index) => {
                if (
                  this.state.mySelectedData.filter(
                    (child) => JSON.parse(child).title == item.title
                  ).length > 0
                ) {
                  item.isChecked = true;
                }
                else{
                  item.isChecked = false;
                }
                return (
                  <li key={index}>
                    <img src={item.thumbnail}></img>
                    <input
                      type="checkbox"
                      value={JSON.stringify(item)}
                      checked={item.isChecked}
                      onChange={(e) =>
                        this.selectData(e,
                          JSON.stringify({
                            title: item.title,
                            thumbnail: item.thumbnail,
                            isChecked: item.isChecked,
                          })
                        )
                      }
                    /><span className="GetReddits__title">{item.title}</span>
                     <br />
                  </li>
                );
              })}
          </ul>
          <input type="submit" value="Add to Favorite"/>
        </form>
        <Link to="/favReddits">Favorite reddits</Link>
      </div>
    );
  }
}

export default GetReddits;
