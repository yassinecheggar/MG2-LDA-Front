import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Typography from "@material-ui/core/Typography";


function  Formatdata( visited ){
  var data=[];
    for (let i = 0; i < visited.length; i++) {
      data.push({name:visited[i][0],visits:visited[i][1]})
      
    }
   return data;
}

function search(docDownloaded ,type) {
  for (let i = 0; i < docDownloaded.length; i++) {

    if(docDownloaded[i][0]===type)return docDownloaded[i][1];
  }
}
export  class Example extends PureComponent {

  
  render() {
   
    return (
      <ResponsiveContainer width="97%" height="85%">
          
        <BarChart
          width={500}
          height={300}
          data={Formatdata(this.props.data)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"   />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" fill="#1597BB" barSize={30}/>
         
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
