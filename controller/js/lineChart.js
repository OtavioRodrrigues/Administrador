const ctxLine = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
        datasets: [{
            label: '',
            data: [50, 75, 150, 200, 250, 300, 400],
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 2,
            fill: false
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
                },
                ticks: {
                    display: true
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
