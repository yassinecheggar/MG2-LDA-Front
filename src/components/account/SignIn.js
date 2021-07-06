import React ,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink,useHistory } from 'react-router-dom';
import axios from 'axios';
import AppConfig from '../Global';
import Alert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function  postVisited(iduser){
  var  date = format(new Date(), "yyyy-MM-dd")
  var  obj = {"id":null ,"date":date,"visited":"app","userVisit":{"id":iduser}};
  axios.post(AppConfig.API+'View/Add',obj,{ headers: JSON.parse( window.localStorage.getItem("ldat"))})
}


export default function SignIn() {
  const classes = useStyles();
  const [user, setuser] = useState();
  const [pwd, setpwd] = useState();
  const [msg, setmsg] = useState(false);
  const history = useHistory();

  function Post(){
    let to ='/';
    axios.post(AppConfig.API+`authenticate`,{"username":user ,"password":pwd}).then(res  =>{
      
      if(res.status===200){
          
        const Token =  { Authorization: "Bearer " + res.data.token } ;
        console.log(res.data.token)
        window.localStorage.setItem("ldat",JSON.stringify(Token));

        axios.post(AppConfig.API+`User/GetUsersByName`,{"username":user},{ headers: JSON.parse( window.localStorage.getItem("ldat"))}).then(res  =>{
          if(res.data.roles[0].name ==="admin"){
              to="/Home2";
          }else if(res.data.roles[0].name ==="user"){
              to="/Home/Dashboard";
          }
          postVisited(res.data.id);
          window.sessionStorage.setItem("user",res.data.id)
          history.push(to);
          console.log(res.data)
          //setlink("/Home")
         // history.push('/Home');
        }, error => {
          if (error.response.status === 401) {
            console.log(error)
            setmsg(true);
            setTimeout(() => {setmsg(false) }, 3000);
          }
          
        });


        console.log(AppConfig.Token);
      }
       
    })
    
   
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5"
        >
          Sign in
        </Typography>

        <Grow   in={msg} style={{ transformOrigin: '0 0 0' }} {...(msg ? { timeout: 1000 } : {})} >


           <Alert severity="warning">  wrong username or password — check them out!</Alert>
           
           </Grow> 
        

        <form className={classes.form} noValidate>
          <TextField
            value={user}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={event => setuser(event.target.value)}
            autoFocus
          />
          <TextField
            value={pwd}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={event => setpwd(event.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          
          
           onClick={()=>Post()}
           
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link  variant="body2"component={NavLink} to="/Home2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}