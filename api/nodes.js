var x = 4022328 - 2779724
var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
$.ajax({ //kubectll get pods
    url: 'http://120.114.142.17/sys/prg/kube_nodes.php',
    type: "post",
    dataType: "json",
    data: fddjs,
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
        var obj = JSON.parse(result);
        const ctx = document.getElementById('mymaster');
        const mymaster = new Chart(ctx, {
            labels: {
                render: 'label'
            },
            type: 'doughnut',
            data: {
                labels: [
                    'Red',
                    'Blue'
                ],
                datasets: [{
                    label: 'memory',
                    data: ['16076908', x],
                    options: {
                        plugins: {
                            legend: {
                                labels: {
                                    // This more specific font property overrides the global property
                                    font: {
                                        size: 53
                                    }
                                }
                            },
                        },
                        animation: false
                    },
                    backgroundColor: [
                        'rgb(255, 205, 86)',
                        'rgb(128, 128, 128)'
                    ],
                    hoverOffset: 4
                }]
            },
            title: {
                display: true,
                text: 'Custom Chart Title'
            },
            options: {
                interaction: {
                    // Overrides the global setting
                    mode: 'index'
                }
            }
        });

        const ctx1 = document.getElementById('mymaster1');
        const mymaster1 = new Chart(ctx1, {
            labels: {
                render: 'label'
            },
            type: 'doughnut',
            data: {
                labels: [
                    'Red',
                    'Blue'
                ],
                datasets: [{
                    label: 'memory',
                    data: ['2779724', x],
                    backgroundColor: [
                        'rgb(255, 205, 86)',
                        'rgb(128, 128, 128)'
                    ],
                    hoverOffset: 4
                }]
            },
            title: {
                display: true,
                text: 'Custom Chart Title'
            },
            options: {
                interaction: {
                    // Overrides the global setting
                    mode: 'index'
                }
            }
        });
        const ctx2 = document.getElementById('mymaster2');
        const mymaster2 = new Chart(ctx2, {
            labels: {
                render: 'label'
            },
            type: 'doughnut',
            data: {
                labels: [
                    'Red',
                    'Blue'
                ],
                datasets: [{
                    label: 'memory',
                    data: ['2779724', x],
                    backgroundColor: [
                        'rgb(255, 205, 86)',
                        'rgb(128, 128, 128)'
                    ],
                    hoverOffset: 4
                }]
            },
            title: {
                display: true,
                text: 'Custom Chart Title'
            },
            options: {
                interaction: {
                    // Overrides the global setting
                    mode: 'index'
                }
            }
        });
    }
});