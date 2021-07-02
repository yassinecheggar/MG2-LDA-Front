import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import  './Dash.css'
import DescriptionIcon from '@material-ui/icons/Description';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <>
    
    <div > 
      <Title>Document</Title>
      <Typography component="p" variant="h4">
        
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
         
        </Link>
      </div>

      <div style={{position:"absolute" , width:"90px" ,height:"90px" , background:"orange", top:-20, borderRadius:"5%"}}></div>
        
      </div>
    </>
  );
}