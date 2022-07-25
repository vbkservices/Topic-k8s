var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
fddjs.append('obj', 'node2');
$.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/prg/kube_top.php',
    dataType: "json",
    data: fddjs,
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
        // table
        var total='';
        total=total+'<h3 class="text-center">主機名:<b class="ps-2">'+result.node2.name+'</b><h1>'
        $('.usage ').append(total)
        var cpu_use='';
        cpu_use=cpu_use+'<h3 class="text-center">CPU:<b class="ps-2">'+result.node2.cpu+'</b><h1>'
        cpu_use=cpu_use+'<h3 class="text-center" >CPU使用率:<b class="ps-2">'+result.node2.cpu_usage+'</b><h1>'
        $('#cpu_use').append(cpu_use)
        var memory_use='';
        memory_use=memory_use+'<h3 class="text-center">記憶體:<b class="ps-2">'+result.node2.memory+'</b><h1>'
        memory_use=memory_use+'<h3 class="text-center">記憶體使用率:<b class="ps-2">'+result.node2.memory_usage+'</b><h1>'
        $('#memory_use').append(memory_use)
        //cpu
        var cpu_usage = result.node2.cpu_usage.replace(/%/g, "");
        var cpu_total = 100 - cpu_usage;
        //memory
        var memory_usage = result.node2.memory_usage.replace(/%/g, "");
        var memory_total = 100 - memory_usage;

        const ctx = document.getElementById('cpu');
        const cpu = new Chart(ctx, {
            labels: {
                render: 'label'
            },
            type: 'doughnut',
            data: {
                labels: [
                    cpu_usage + '%',
                    cpu_total + '%'
                ],
                datasets: [{
                    label: 'memory',
                    data: [cpu_usage, cpu_total],
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

        const ctxm = document.getElementById('memory');
        const memory = new Chart(ctxm, {
            labels: {
                render: 'label'
            },
            type: 'doughnut',
            data: {
                labels: [
                    memory_usage + '%',
                    memory_total + '%'
                ],
                datasets: [{
                    label: 'memory',
                    data: [memory_usage, memory_total],
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
    }
});