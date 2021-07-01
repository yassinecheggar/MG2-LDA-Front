

const AppConfig = {
    
    API: 'http://localhost:8080/',
    loged : false,
    config : window.localStorage.getItem("ldat")!=="" ? JSON.parse( window.localStorage.getItem("ldat")):"",
    
  };

  


  export default AppConfig;