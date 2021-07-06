import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import  './Dash.css'
import Divider from '@material-ui/core/Divider';
import DescriptionIcon from '@material-ui/icons/Description';
import { green } from '@material-ui/core/colors';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  return (
    <>
    
    

    
      <Typography color="textSecondary" className='Cardtitle' variant="h6">
           {props.title}
      </Typography>

      <Typography className='subTitle' variant="p" >
        {props.subtitle}
      </Typography>

      <Divider style={{marginTop:75}}/>
     
        <p style={{marginBottom:0 , marginTop:8, }}>lola</p>
  

      <div className='floaty' style={{background: props.color}}>
        <img  src={props.link} className='cardimg' alt='doc' ></img>
     
          
      </div>
    </>
  );
}