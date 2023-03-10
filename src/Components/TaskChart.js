import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const TaskChart = ({ tasks }) => {
  const [chart, setChart] = useState(null);
// convert each number of seconds to rounded minutes
  const timeData = tasks.map((task) => Math.round(task.elapsedTime / 60))

  // create the chart
  useEffect(() => {
    if (tasks.length > 0 && !chart ) {
      const data = {
        labels: tasks.map((task) => task.description),
        datasets: [
          {
            label: 'Task Duration (in minutes)',
            data: timeData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
      const ctx = document.getElementById('chart');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      
      setChart(newChart);
    } else if (chart) {
      chart.data.labels = tasks.map((task) => task.description);
      chart.data.datasets[0].data = timeData
      chart.update();
    }
  }, [tasks, chart]);
  
  return (
    <div>
      <canvas id="chart"></canvas>
    </div>
  );
};

export default TaskChart;