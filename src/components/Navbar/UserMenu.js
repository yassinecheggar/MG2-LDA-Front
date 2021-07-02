import React from 'react'


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { mainListItems, secondaryListItems } from './listItems';
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FeedbackIcon from '@material-ui/icons/Feedback';
import NavigationIcon from '@material-ui/icons/Navigation';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
      color: 'white',
    },
    icons  :{
      color: 'white',
    }
  }));

function UserMenu(props) {

    const [openl, setOpenl] = React.useState(false);
    const classes = useStyles();
    const handleClick = () => {
        setOpenl(!openl);
      };  
    return (
        <>


      <List  component="nav"  >

    <ListItem button  component={NavLink} to={`${props.url}/Dashboard`}>
      <ListItemIcon >
        <DashboardIcon className={classes.icons} />
      </ListItemIcon >
      <ListItemText primary="Dashboard" className={classes.icons} />
    </ListItem>

    <ListItem button component={NavLink} to={`${props.url}/Search`}>
      <ListItemIcon>
        <SearchIcon  className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="Search"  className={classes.icons}/>
    </ListItem>

    <ListItem button  component={NavLink} to={`${props.url}/Navigation`}>
      <ListItemIcon>
        <NavigationIcon className={classes.icons} />
      </ListItemIcon>
      <ListItemText primary="Navigation" className={classes.icons} />
    </ListItem>

    <ListItem button component={NavLink} to={`${props.url}/Trainning`}>
      <ListItemIcon>
        <CastForEducationIcon  className={classes.icons} />
      </ListItemIcon>
      <ListItemText primary="Training" className={classes.icons} />
    </ListItem>
    <ListItem button onClick={handleClick}>

      <ListItemIcon>
        <GroupWorkIcon  className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="Feedback"  className={classes.icons}/>
      {openl ? <ExpandLess  className={classes.icons}/> : <ExpandMore className={classes.icons} />}
    </ListItem>



    <Collapse in={openl} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={NavLink} to={`${props.url}/Question`}>
            <ListItemIcon>
              <ContactSupportIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Question" />
          </ListItem>


          <ListItem button className={classes.nested} component={NavLink} to={`${props.url}/FeedBack`}>
            <ListItemIcon>
              <QuestionAnswerIcon  className={classes.icons}/>
            </ListItemIcon>
            <ListItemText primary="FeedBack" />
          </ListItem>



          <ListItem button className={classes.nested} component={NavLink} to={`${props.url}/BestPractice`}>
            <ListItemIcon>
              <WbIncandescentIcon  className={classes.icons}/>
            </ListItemIcon>
            <ListItemText primary="Best Practice" />
          </ListItem>

        </List>
      </Collapse>

      
 

     

    </List>


        </>
    )
}

export default UserMenu
