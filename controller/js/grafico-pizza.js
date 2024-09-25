var ctx = document.getElementById('userDistributionChart').getContext('2d');
var userDistributionChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Usuários Ativos', 'Usuários Inativos'],
        datasets: [{
            data: [50, 30],
            backgroundColor: ['#FF5800', '#374957'],
            borderColor: '#EEEEEE',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    padding: 25,
                    boxWidth: 20,
                    boxHeight: 20,
                    font: {
                        size: 14
                    },
                },
            }
        }
    }
});
