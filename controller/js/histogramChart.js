const ctxHistogram = document.getElementById('histogramChart').getContext('2d');
const histogramChart = new Chart(ctxHistogram, {
    type: 'bar',
    data: {
        labels: ['0-10', '11-20', '21-30', '31-40', '41-50'],
        datasets: [{
            label: '', 
            data: [5, 15, 25, 10, 2],
            backgroundColor: 'rgba(0, 0, 255, 0.6)', 
            borderColor: 'rgba(0, 0, 255, 1)', 
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: false 
                }
            },
            y: {
                title: {
                    display: false
                }
            }
        }
    }
});
