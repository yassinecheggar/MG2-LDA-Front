import React, { Component, PropTypes } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


const overlay = {
  position: 'absolute',
  bottom: 30,
  right: 10,
};

class MUITester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      topics: [
        {
          title: 'This is the Title',
          content: 'This is the content of the application',
         date: '2020-02-25',
        },
        {
          title: 'This is the 2nd Title',
          content: 'This is the 2nd content of the application',
          date: '2020-02-25',
        },
        {
          title: 'This is the 3rd Title',
          content: 'This is the 3rd content of the application',
          date: '2020-02-25',
        },
        {
          title: 'This is the 4th Title',
          content:
            'This is the 4th content of the application, this is a long content that needs to be show partially',
            date: '2020-02-25',
        },
        {
            title: 'This is the 4th Title',
            content:
              'This is the 4th content of the application, this is a long content that needs to be show partially',
              date: '2020-02-25',
          },
          {
            title: 'This is the 4th Title',
            content:
              'This is the 4th content of the application, this is a long content that needs to be show partially',
              date: '2020-02-25',
          },
          {
            title: 'This is the 4th Title',
            content:
              'This is the 4th content of the application, this is a long content that needs to be show partiallyntent that needs to be show partiallyntent that needs to be show partiallyntent that needs to be show partiallyntent that needs to be show partiallyntent that needs to be show partially',
              date: '2020-02-25',
          },
      ],
    };
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  render() {
    return (
      <div >
          {/** 
        <div style={overlay}>
            <Fab mini={true}
            onClick={e => {
              e.stopPropagation();
              alert('Clicked Button');
            }}>
          <EditIcon />
          </Fab>
        </div>*/}
        <List>
          {this.state.topics.map(topic => {
            return (
              <div>
                <ListItem button
               
                  onClick={this.open}
                >
                <ListItemAvatar>
                <Avatar src="http://www.girardatlarge.com/wp-content/uploads/2013/05/gravatar-60-grey.jpg" />
               </ListItemAvatar>
                <ListItemText primary={<MyItem {...topic} />} secondary={topic.content} />
                </ListItem>
                
                <Divider inset={true} />
              </div>
            );
          })}
        </List>
        {/*
        <div>
          <PopUp state={this.state} close={this.close} />
        </div>*/}
      </div>
    );
  }
}
const MyItem = ({ title , date }) => {
  return (
    <>
        <p  style={{ fontSize: '15px', color: '#2196f3', margin:'0px' }}> {title} </p>
        <p  style={{ fontSize: '10px', color: '#2979ff'  , margin:'0px'}}>{` ${date} `}</p>
    </>
  );
};
/*
const PopUp = ({ state, close }) => {
  return (
    <div>
      {state.open
        ? <TransitionGroup
            transitionName="pop"
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={300}
          >
            <div
              style={{
                width: window.innerWidth,
                height: window.innerHeight,
                position: 'fixed',
                left: 0,
                top: 0,
                overflowX: 'hidden',
                backgroundColor: 'white',
                zIndex: '999',
              }}
            >
              <span>I am a popup</span>
              <Button label="Close" onClick={close} />
            </div>
          </TransitionGroup>
        : null}
    </div>
  );
};*/

export default MUITester;
