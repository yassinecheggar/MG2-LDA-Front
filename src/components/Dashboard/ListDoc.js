import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
   
    backgroundColor: theme.palette.background.paper,
  },
}));



export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root} >
      {props.data.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)} style={{overflow:'hidden'}}>
            <ListItemIcon >

            {(() => {
                        
                        switch (props.icon) {
                            case 'del':
                                return (
                                     <DeleteSweepIcon style={{marginTop:10,  marginBottom:10, color:'#ff9b21'}} />
                                )
                            case 'add':
                                return (
                                    <LibraryAddIcon style={{marginTop:10,  marginBottom:10, color:'#ff9b21'}} />
                                )
                                case 'edit':
                                return (
                                    <EditIcon style={{marginTop:10,  marginBottom:10, color:'#ff9b21'}} />
                                )
                            default:
                                return (
                                <>.</>
                                )
                        }

                        })()}
               
            
            </ListItemIcon>
            <ListItemText id={labelId} ><p  style={{ width:'95%',  textOverflow:'ellipsis',  overflow:'hidden', margin:0}}>{value.nom}</p><p style={{margin:0,color:'grey'}}>{value.ref}</p></ListItemText>

            <ListItemText id={labelId} ><p  style={{ width:'95%',    textOverflow:'ellipsis',  overflow:'hidden'}}>{ value.pubDate}</p></ListItemText>
            <ListItemText id={labelId}  ><p  style={{ width:'95%',   textOverflow:'ellipsis',  overflow:'hidden'}}>{value.docummentauthor.nom+" " +value.docummentauthor.prenom }</p></ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
               <img src={props.img} alt='doc'></img>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
