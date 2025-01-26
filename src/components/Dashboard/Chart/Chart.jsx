
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
 
} from 'recharts';

const Chart = ({chartData}) => {
  console.log(chartData)
 const chartD= [
    {
        price: 150,
        quantity: 6,
        order: 1,
        date: "2025-01-08"
    },
    {
        price: 75,
        quantity: 5,
        order: 1,
        date: "2025-01-12"
    },
   
]

  // const{date,qunantity,price,order}=chartData || {}

  const myData=[
    {
      date: '25/02/12',
            quantity: 20,
            price: 1500,
            order: 5,
      
    }
  ]
    // const data = [
    //     {
    //       name: 'Page A',
    //       uv: 4000,
    //       pv: 2400,
    //       amt: 2400,
    //     },
    //     {
    //       name: 'Page B',
    //       uv: 3000,
    //       pv: 1398,
    //       amt: 2210,
    //     },
    //     {
    //       name: 'Page C',
    //       uv: 2000,
    //       pv: 9800,
    //       amt: 2290,
    //     },
    //     {
    //       name: 'Page D',
    //       uv: 2780,
    //       pv: 3908,
    //       amt: 2000,
    //     },
    //     {
    //       name: 'Page E',
    //       uv: 1890,
    //       pv: 4800,
    //       amt: 2181,
    //     },
    //     {
    //       name: 'Page F',
    //       uv: 2390,
    //       pv: 3800,
    //       amt: 2500,
    //     },
    //     {
    //       name: 'Page G',
    //       uv: 3490,
    //       pv: 4300,
    //       amt: 2100,
    //     },
    //   ];
    return (
        <div>
              <ComposedChart
          width={1000}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" label={{ value: 'Pages', position: 'insideBottomRight', offset: 0 }}/>
          <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="order" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="price" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="quantity" stroke="#ff7300" />
        </ComposedChart> 
        </div>
    //     <ComposedChart width={730} height={250} data={chartData}>
    //   <XAxis dataKey='date' />
    //   <YAxis />
    //   <Tooltip />
    //   <Legend />
    //   <CartesianGrid stroke='#f5f5f5' />
    //   <Area type='monotone' dataKey='order' fill='#8884d8' stroke='#8884d8' />
    //   <Bar dataKey='price' barSize={20} fill='#413ea0' />
    //   <Line type='monotone' dataKey='quantity' stroke='#ff7300' />
    // </ComposedChart>
    );
};

export default Chart;