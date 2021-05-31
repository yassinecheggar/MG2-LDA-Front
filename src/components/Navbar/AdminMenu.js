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
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListSubheader from '@material-ui/core/ListSubheader';

import { BrowserRouter, Route, Switch, useRouteMatch,useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

function AdminMenu(props) {
    
 
    const [openl, setOpenl] = React.useState(false);
    const classes = useStyles();
    const handleClick = () => {
        setOpenl(!openl);
      };  
    return (
        <>


            <List  component="nav" >
            <ListSubheader inset>Admin Menu</ListSubheader>

<ListItem button component={NavLink} to={`${props.url}/SignIn`}>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Activité" />
</ListItem>

<ListItem button component={NavLink} to={`${props.url}/Dashboard`}>

  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Area" />
</ListItem>

<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Author" />
</ListItem>


<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="BestPractice" />
</ListItem>


<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Comment" />
</ListItem>



<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Delivrable" />
</ListItem>


<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Document" />
</ListItem>



<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Doc Type" />
</ListItem>


<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Feedback" />
</ListItem>


<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Modif" />
</ListItem>



<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Perimetre" />
</ListItem>



<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Picture" />
</ListItem>



<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Pole" />
</ListItem>




<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Question" />
</ListItem>



<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="User" />
</ListItem>



<ListItem button>
  <ListItemIcon>
    <AssignmentIcon />
  </ListItemIcon>
  <ListItemText primary="Zone" />
</ListItem>


      
 

     

    </List>  
        </>
    )
}

export default AdminMenu
