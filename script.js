fetch('https://data.irozhlas.cz/covid-uzis/hosp_ocko.json').then((resp) => {
  resp.json().then((d) => {
    console.log(d);
    Highcharts.chart('cvd-hosp-ock', {
      chart: {
        type: 'bar',
      },
      title: {
        text: `${d.jip_celkem} pacientů na JIP`,
      },
      subtitle: {
        text: 'bylo za poslední týden hospitalizováno s COVID-19',
      },
      credits: {
        text: `Aktualizováno ${parseInt(d.datum.split('-')[2], 10)}. ${parseInt(d.datum.split('-')[1], 10)}., data ÚZIS`,
        href: 'https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19',
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'hospitalizovaní na JIP za týden',
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          animation: false,
          enableMouseTracking: false,
          dataLabels: {
            enabled: true,
            style: {
              color: 'white',
              fontSize: '15px',
              textOutline: null,
            },
            formatter() {
              return this.series.name;
            },
          },
        },
      },
      series: [{
        color: '#de2d26',
        name: `neočkovaní - průměrný věk ${Math.round(d.jip_neocko_vek)} let`,
        data: [d.jip_neocko],
      }, {
        name: `očkovaní - průměrný věk ${Math.round(d.jip_ocko_vek)} let`,
        color: '#2b8cbe',
        data: [d.jip_celkem - d.jip_neocko],
      }],
    });
  });
});
