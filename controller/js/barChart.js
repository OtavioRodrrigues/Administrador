const ctxBar = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Conta A', 'Conta B', 'Conta C', 'Conta D', 'Conta E'],
        datasets: [{
            label: '', 
            data: [20, 35, 50, 75, 100],
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
