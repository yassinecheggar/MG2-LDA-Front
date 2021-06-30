import React from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText  from '@material-ui/core/ListItemText' ;
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListSubheader from '@material-ui/core/ListSubheader';
import SettingsIcon  from '@material-ui/icons/Settings';
import { NavLink } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  
    nested: {
      paddingLeft: theme.spacing(4),
    },
    icons  :{
      color: 'white',
    }
  }));

function AdminMenu(props) {
    
 
    const [openl, setOpenl] = React.useState(false);
    const classes = useStyles();
    const handleClick = () => {
        setOpenl(!openl);
      };  
    return (
        <>
            <List  component="nav"  style={{overflow: 'auto' ,overflowX:'hidden', maxHeight:'90vh'}}>
            <ListSubheader inset disableSticky style={{color:'whitesmoke'}}>Admin Menu</ListSubheader>

<ListItem button component={NavLink} to={`${props.url}/CompActivite`}>
  <ListItemIcon>
    <SettingsIcon  className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Activité" />
</ListItem>

<ListItem button component={NavLink} to={`${props.url}/Area`}>

  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Area" />
</ListItem>

<ListItem button component={NavLink} to={`${props.url}/Author`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Author" />
</ListItem>


<ListItem button component={NavLink} to={`${props.url}/BestPractice`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="BestPractice" />
</ListItem>


<ListItem button component={NavLink} to={`${props.url}/Comment`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Comment" />
</ListItem>



<ListItem button component={NavLink} to={`${props.url}/Delivrable`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Delivrable" />
</ListItem>

<ListItem button component={NavLink} to={`${props.url}/Direction`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Direction" />
</ListItem>


<ListItem button component={NavLink} to={`${props.url}/Document`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Document" />
</ListItem>



<ListItem button component={NavLink} to={`${props.url}/Type`}> 
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Doc Type" />
</ListItem>


<ListItem button component={NavLink} to={`${props.url}/FeedBack`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Feedback" />
</ListItem>


<ListItem button component={NavLink} to={`${props.url}/Modification`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Modif" />
</ListItem>



<ListItem button component={NavLink} to={`${props.url}/Perimetre`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Perimetre" />
</ListItem>



<ListItem button component={NavLink} to={`${props.url}/Picture`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Picture" />
</ListItem>



<ListItem button  component={NavLink} to={`${props.url}/Pole`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Pole" />
</ListItem>




<ListItem button component={NavLink} to={`${props.url}/Question`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="Question" />
</ListItem>



<ListItem button component={NavLink} to={`${props.url}/user`}>
  <ListItemIcon>
    <SettingsIcon className={classes.icons} />
  </ListItemIcon>
  <ListItemText className={classes.icons} primary="User" />
</ListItem>





      
 

     

    </List>  
        </>
    )
}

export default AdminMenu
