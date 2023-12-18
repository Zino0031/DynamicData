import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { setDBConfig } from '@/redux/dbConfigSlice';

const QueryPage = () => {
  const [queryResult, setQueryResult] = useState(null);
  const [query1, setQuery] = useState('');
  const [error, setError] = useState(null);
  
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const dispatch = useDispatch();
  const dbConfig = useSelector((state) => state.dbConfig);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    const query = `${query1}`;

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hostname: dbConfig.hostname,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          query: query,
        }),
      });

      const data = await response.json();
      setQueryResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (queryResult) {
      renderChart();
    }
  }, [queryResult]);

  

  const renderChart = () => {
    const ctx = document.getElementById('myChart');
    
    if (ctx) {
      const chartInstance = Chart.getChart(ctx);
      if (chartInstance) {
        chartInstance.destroy(); 
      }
    }
  
    const labels = queryResult.map((entry) => entry.thermometer_id);
    const temperatures = queryResult.map((entry) => entry.temperature);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature',
          data: temperatures,
          backgroundColor: 'rgba(54, 162, 235, 0.6)', 
          borderColor: 'rgba(54, 162, 235, 1)', 
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div>
      <div className='absolute -mt-3 bg-white left-[39%]'>
        MySQL Query
      </div>
      <div className='max-w-xl mx-auto p-4 border border-black mt-5'>
        <form className='flex flex-col' onSubmit={handleQuerySubmit}>
          <label>
            <textarea
              value={query1}
              onChange={handleQueryChange}
              className='border items-center border-black px-2 py-1 rounded'
              rows={20}
              cols={69}
              required
            />
          </label>
          <br />
          <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded mx-40' type="submit">Search</button>
        </form>
      </div>

      <div className='m-10'>
        {queryResult && (
          <canvas id="myChart" width="400" height="400"></canvas>
          )}
          </div>
    </div>
  );
};

export default QueryPage;
