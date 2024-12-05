import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/chart2');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data for Reports chart:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-container">
      <h2>Reports on Generative AI Applications</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
  dataKey="application"
  // label={{
  //   value: 'Fields',
  //   position: 'insideBottom',
  //   offset: -5, // Adjust position
  //   fontSize: 20,
  // }}
  interval={0}
  tick={{ fontSize: 12 }}
/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
      <p>This chart illustrates the popularity of generative AI applications across various fields, such as computer vision, natural language processing, and gaming, indicating the diverse impact of this technology.</p>
      <p>Source: <a href="https://example.com" target="_blank" rel="noopener noreferrer">Generative AI Applications Overview, example.com</a></p>
    </div>
  );
};

export default Reports;
