import React from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListSubheader from '@material-ui/core/ListSubheader';

import { NavLink } from 'react-router-dom';



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

<ListItem button component={NavLink} to={`${props.url}/CompActivite`}>
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
