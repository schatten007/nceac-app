import { PieChart, Pie, Cell } from 'recharts';
import styled from '@emotion/styled'


const convertData = (data) => {
    let convertedData = [];

    // for (const [key, value] of Object.entries(data)){
    //     convertedData.push({name: key, value: value});
    // }

    convertedData.push({
      name: 'Current',
      value: data.current
    })

    convertedData.push({
      name: 'Remaining',
      value: data.total 
    })
    
    convertedData[1].value = convertedData[1].value - convertedData[0].value;

    return convertedData;
} 

const Donut = ({data}) => {
    const chartData = convertData(data);

    const COLORS = ['#82ca9d', '#bc544b']

    return(
        <Container>
        <PieChart width={400} height={150}>
            <Pie data={chartData} dataKey="value" nameKey="name" cx='50%' cy='50%' innerRadius={30} outerRadius={45} fill="#82ca9d" 
            label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index
              }) => {
                const RADIAN = Math.PI / 180;
                // eslint-disable-next-line
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                // eslint-disable-next-line
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                // eslint-disable-next-line
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#8884d8"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {chartData[index].name} ({value})
                  </text>
                );
              }}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie> 
        </PieChart>
        </Container>
    );
}

const Container = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
`

export default Donut;