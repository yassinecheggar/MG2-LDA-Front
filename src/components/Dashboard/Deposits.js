import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import  './Dash.css'
import Divider from '@material-ui/core/Divider';
import DescriptionIcon from '@material-ui/icons/Description';
import { green } from '@material-ui/core/colors';
import UpdateIcon from '@material-ui/icons/Update';
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

      <Divider style={{marginTop:82}}/>
      <div style={{display:'flex'}}>
        <UpdateIcon style={{marginBottom:0 , marginTop:9, fontSize:'18px'  , color:'grey'}}/>
        <p style={{marginBottom:0 , marginTop:8, marginLeft:8 ,color:'grey'}}>Just Updated</p>
        </div>

      <div className='floaty' style={{background: props.color}}>
        <img  src={props.link} className='cardimg' alt='doc' ></img>
     
          
      </div>
    </>
  );
}