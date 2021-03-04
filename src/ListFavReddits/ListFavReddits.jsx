import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './ListFavReddits.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


class ListFavReddits extends Component {
  useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  constructor(props) {
    super(props);

    this.state = {
      mySelectedData: [],
      myCleanData: [],
    };
    this.selectData = this.selectData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  selectData(e, data) {
    if (e.target.checked) {
      if (data) {
        let filteredArray = this.state.myCleanData.filter(
          (item) => JSON.parse(item).title !== JSON.parse(data).title
        );
        this.setState(
          {
            myCleanData: filteredArray,
          },
          () => {}
        );
      }
    } else {
      this.setState(
        { myCleanData: [...this.state.myCleanData, data] },
        () => {}
      );
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
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
          this.setState(
            {
              myCleanData: [...this.state.myCleanData, JSON.stringify(item)],
            },
            () => {}
          );
        });
      }
    }, 0);
  }

  handleSubmit(event) {
    localStorage.setItem("myValueInLocalStorage", this.state.myCleanData);
    console.log(this.state.myCleanData);
    this.setState(
      {
        mySelectedData: this.state.myCleanData,
      },
      () => {}
    );
  }

  render() {
    const myData = this.state.mySelectedData;
    return (
      <div className="favReddits__container">
        <Link to="/">List all reddits</Link>
        {
          <form >
             <List dense className={ListFavReddits.root}>
              {myData.length !== null && myData.map((item, index) => {
                const labelId = `checkbox-list-secondary-label-${index}`;
                return (
                  <ListItem key={index} button>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${JSON.parse(item).title + 1}`}
                        src={JSON.parse(item).thumbnail}
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={JSON.parse(item).title} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={(e) => this.selectData(e, item)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
            <Button onClick={(e) => this.handleSubmit(e)} variant="contained" color="primary" disableElevation>
                Delete favorite post(s)
            </Button>
          </form>
        }
      </div>
    );
  }
}

export default ListFavReddits;
