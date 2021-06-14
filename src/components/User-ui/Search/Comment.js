import React, { Component, PropTypes } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import appStore from "./store";
import appActions from "./Action";
import { view } from "@risingstack/react-easy-state";


const overlay = {
  position: 'absolute',
  bottom: 30,
  right: 10,
};


const App = view(()  => {
  
 
  return (
    <>
{appStore.comment.map(com => {
            return (
              <div>
                <ListItem button
               
                 
                >
                <ListItemAvatar>
                <Avatar src="http://www.girardatlarge.com/wp-content/uploads/2013/05/gravatar-60-grey.jpg" />
               </ListItemAvatar>
                <ListItemText primary={<MyItem comment={com} />} secondary={com.comment} />
                </ListItem>
                
                <Divider inset={true} />
              </div>
            );
          })}
    </>
    
    
    );})

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      lola : this.props.name ,
     
    };
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  lola=()=>{console.log(this.state.lola);};
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
          <App></App>
        </List>
        {/*
        <div>
          <PopUp state={this.state} close={this.close} />
        </div>*/}
      </div>
    );
  }
}
const MyItem = ( props ) => {
  return (
    <>
        <p  style={{ fontSize: '15px', color: '#2196f3', margin:'0px' }}> {props.comment? (props.comment.userComment? props.comment.userComment.nom +" " +props.comment.userComment.prenom : "" ):''} </p>
        <p  style={{ fontSize: '10px', color: '#2979ff'  , margin:'0px'}}>{ props.comment?  props.comment.dateComment :'' }</p>
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

export default Comment;
