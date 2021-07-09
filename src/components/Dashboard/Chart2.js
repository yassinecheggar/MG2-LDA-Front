import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Typography from "@material-ui/core/Typography";
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page Gddddddddd',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  
];
function  Formatdata(docDownloaded , docTypecount ){
  var data=[];
    for (let i = 0; i < docTypecount.length; i++) {
      data.push({name:docTypecount[i][0],Documents:docTypecount[i][1],Downloads: search(docDownloaded ,docTypecount[i][0])})
      
    }
   return data;
}

function search(docDownloaded ,type) {
  for (let i = 0; i < docDownloaded.length; i++) {

    if(docDownloaded[i][0]===type)return docDownloaded[i][1];
  }
}
export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';
  
  render() {
    Formatdata(this.props.data1 , this.props.data2)
    return (
      <ResponsiveContainer width="97%" height="85%">
          
        <BarChart
          width={500}
          height={300}
          data={Formatdata(this.props.data1 , this.props.data2)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"  tick={false}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Documents" fill="#FFA900" />
          <Bar dataKey="Downloads" fill="#CD113B" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
