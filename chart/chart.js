const ctx = document.getElementById('lineChart');

new Chart(ctx, {
type: 'bar',
data: {
    labels: ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
    datasets: [{
    label: '2022',
    data: [4017,6135,7091,5841,5036,4547,3467,3970,6313,3595,9207,5945],
    backgroundColor: [
        'rgba(166, 227, 233, 1)',
    ],
    borderColor: [
        ''
    ],
    borderWidth: 1
    },
    {
        label: '2023',
    data: [2416,4136,7935,8004,9505,5026,6108,6343,9404,9280,9287,8689],
    backgroundColor: [
        'rgba(255, 182, 185, 1)',
    ],
    borderColor: [
        ''
    ],
    borderWidth: 1
    }
]
},
options: {
    responsive:true
}
});
const ctx1 = document.getElementById('doughnut');

new Chart(ctx1, {
type: 'doughnut',
data: {
    labels: ['Junior', 'Senior', 'Master', 'Next Level of Master'],
    datasets: [{
    label: 'Employees',
    data: [601,400,90,9],
    backgroundColor: [
        'rgba(185, 251, 192, 1)',
        'rgba(195, 174, 214, 1)',
        'rgba(166, 227, 233, 1)',
        'rgba(255, 211, 182, 1)'
    ],
    borderColor: [
        ''
    ],
    borderWidth: 1
    }]
},
options: {
    responsive:true
}
});

