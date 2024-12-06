import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Summary = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('https://seahorse-app-dtw2q.ondigitalocean.app/api/chart1');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data for Summary chart:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-container">
      <h2>Summary of Recent Innovations in Generative AI</h2>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
      <p>This chart shows the monthly growth in generative AI applications over the past six months, highlighting an increasing trend in adoption and innovation within this field.</p>
      <p>Source: <a href="https://example.com" target="_blank" rel="noopener noreferrer">Generative AI Research Report, example.com</a></p>
    </div>
  );
};

export default Summary;
