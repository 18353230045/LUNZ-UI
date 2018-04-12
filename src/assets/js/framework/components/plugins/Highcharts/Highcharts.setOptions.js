Highcharts.setOptions({
  lang: {
    contextButtonTitle: "图表导出菜单",
    decimalPoint: ".",
    downloadJPEG: "下载JPEG图片",
    downloadPDF: "下载PDF文件",
    downloadPNG: "下载PNG文件",
    downloadSVG: "下载SVG文件",
    downloadCSV: "下载CSV文件",
    downloadXLS: "下载XLS文件",
    viewData: '查看表格数据',
    drillUpText: "返回 {series.name}",
    loading: "加载中",
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    noData: "没有数据",
    numericSymbols: ["千", "兆", "G", "T", "P", "E"],
    printChart: "打印图表",
    resetZoom: "恢复缩放",
    resetZoomTitle: "恢复图表",
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    thousandsSep: ",",
    weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
  },
  credits: {
    enabled: false
  }
});

Highcharts.theme_avocado = {
  colors: ["#F3E796", "#95C471", "#35729E", "#251735"],
  colorAxis: {
    maxColor: "#05426E",
    minColor: "#F3E796"
  },
  plotOptions: {
    map: {
      nullColor: "#fcfefe"
    }
  },
  navigator: {
    maskFill: "rgba(170, 205, 170, 0.5)",
    series: {
      color: "#95C471",
      lineColor: "#35729E"
    }
  }
};

Highcharts.theme_dark_blue = {
  colors: "#DDDF0D #55BF3B #DF5353 #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(" "),
  chart: {
    backgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 1
      },
      stops: [
        [0, "rgb(48, 48, 96)"],
        [1, "rgb(0, 0, 0)"]
      ]
    },
    borderColor: "#000000",
    borderWidth: 2,
    className: "dark-container",
    plotBackgroundColor: "rgba(255, 255, 255, .1)",
    plotBorderColor: "#CCCCCC",
    plotBorderWidth: 1
  },
  title: {
    style: {
      color: "#C0C0C0",
      font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
    }
  },
  subtitle: {
    style: {
      color: "#666666",
      font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
    }
  },
  xAxis: {
    gridLineColor: "#333333",
    gridLineWidth: 1,
    labels: {
      style: {
        color: "#A0A0A0"
      }
    },
    lineColor: "#A0A0A0",
    tickColor: "#A0A0A0",
    title: {
      style: {
        color: "#CCC",
        fontWeight: "bold",
        fontSize: "12px",
        fontFamily: "Trebuchet MS, Verdana, sans-serif"
      }
    }
  },
  yAxis: {
    gridLineColor: "#333333",
    labels: {
      style: {
        color: "#A0A0A0"
      }
    },
    lineColor: "#A0A0A0",
    minorTickInterval: null,
    tickColor: "#A0A0A0",
    tickWidth: 1,
    title: {
      style: {
        color: "#CCC",
        fontWeight: "bold",
        fontSize: "12px",
        fontFamily: "Trebuchet MS, Verdana, sans-serif"
      }
    }
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    style: {
      color: "#F0F0F0"
    }
  },
  toolbar: {
    itemStyle: {
      color: "silver"
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        color: "#CCC"
      },
      marker: {
        lineColor: "#333"
      }
    },
    spline: {
      marker: {
        lineColor: "#333"
      }
    },
    scatter: {
      marker: {
        lineColor: "#333"
      }
    },
    candlestick: {
      lineColor: "white"
    }
  },
  legend: {
    itemStyle: {
      font: "9pt Trebuchet MS, Verdana, sans-serif",
      color: "#A0A0A0"
    },
    itemHoverStyle: {
      color: "#FFF"
    },
    itemHiddenStyle: {
      color: "#444"
    }
  },
  credits: {
    style: {
      color: "#666"
    }
  },
  labels: {
    style: {
      color: "#CCC"
    }
  },
  navigation: {
    buttonOptions: {
      symbolStroke: "#DDDDDD",
      hoverSymbolStroke: "#FFFFFF",
      theme: {
        fill: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [.4, "#606060"],
            [.6, "#333333"]
          ]
        },
        stroke: "#000000"
      }
    }
  },
  rangeSelector: {
    buttonTheme: {
      fill: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [.4, "#888"],
          [.6, "#555"]
        ]
      },
      stroke: "#000000",
      style: {
        color: "#CCC",
        fontWeight: "bold"
      },
      states: {
        hover: {
          fill: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [.4,
                "#BBB"
              ],
              [.6, "#888"]
            ]
          },
          stroke: "#000000",
          style: {
            color: "white"
          }
        },
        select: {
          fill: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [.1, "#000"],
              [.3, "#333"]
            ]
          },
          stroke: "#000000",
          style: {
            color: "yellow"
          }
        }
      }
    },
    inputStyle: {
      backgroundColor: "#333",
      color: "silver"
    },
    labelStyle: {
      color: "silver"
    }
  },
  navigator: {
    handles: {
      backgroundColor: "#666",
      borderColor: "#AAA"
    },
    outlineColor: "#CCC",
    maskFill: "rgba(16, 16, 16, 0.5)",
    series: {
      color: "#7798BF",
      lineColor: "#A6C7ED"
    }
  },
  scrollbar: {
    barBackgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [.4,
          "#888"
        ],
        [.6, "#555"]
      ]
    },
    barBorderColor: "#CCC",
    buttonArrowColor: "#CCC",
    buttonBackgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [.4, "#888"],
        [.6, "#555"]
      ]
    },
    buttonBorderColor: "#CCC",
    rifleColor: "#FFF",
    trackBackgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [0, "#000"],
        [1, "#333"]
      ]
    },
    trackBorderColor: "#666"
  },
  legendBackgroundColor: "rgba(0, 0, 0, 0.5)",
  background2: "rgb(35, 35, 70)",
  dataLabelsColor: "#444",
  textColor: "#C0C0C0",
  maskColor: "rgba(255,255,255,0.3)"
};

Highcharts.theme_gray = {
  colors: "#DDDF0D #7798BF #55BF3B #DF5353 #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(" "),
  chart: {
    backgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [0, "rgb(96, 96, 96)"],
        [1, "rgb(16, 16, 16)"]
      ]
    },
    borderWidth: 0,
    borderRadius: 0,
    plotBackgroundColor: null,
    plotShadow: !1,
    plotBorderWidth: 0
  },
  title: {
    style: {
      color: "#FFF",
      font: "16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif"
    }
  },
  subtitle: {
    style: {
      color: "#DDD",
      font: "12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif"
    }
  },
  xAxis: {
    gridLineWidth: 0,
    lineColor: "#999",
    tickColor: "#999",
    labels: {
      style: {
        color: "#999",
        fontWeight: "bold"
      }
    },
    title: {
      style: {
        color: "#AAA",
        font: "bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif"
      }
    }
  },
  yAxis: {
    alternateGridColor: null,
    minorTickInterval: null,
    gridLineColor: "rgba(255, 255, 255, .1)",
    minorGridLineColor: "rgba(255,255,255,0.07)",
    lineWidth: 0,
    tickWidth: 0,
    labels: {
      style: {
        color: "#999",
        fontWeight: "bold"
      }
    },
    title: {
      style: {
        color: "#AAA",
        font: "bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif"
      }
    }
  },
  legend: {
    itemStyle: {
      color: "#CCC"
    },
    itemHoverStyle: {
      color: "#FFF"
    },
    itemHiddenStyle: {
      color: "#333"
    }
  },
  labels: {
    style: {
      color: "#CCC"
    }
  },
  tooltip: {
    backgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [0, "rgba(96, 96, 96, .8)"],
        [1, "rgba(16, 16, 16, .8)"]
      ]
    },
    borderWidth: 0,
    style: {
      color: "#FFF"
    }
  },
  plotOptions: {
    series: {
      nullColor: "#444444"
    },
    line: {
      dataLabels: {
        color: "#CCC"
      },
      marker: {
        lineColor: "#333"
      }
    },
    spline: {
      marker: {
        lineColor: "#333"
      }
    },
    scatter: {
      marker: {
        lineColor: "#333"
      }
    },
    candlestick: {
      lineColor: "white"
    }
  },
  toolbar: {
    itemStyle: {
      color: "#CCC"
    }
  },
  navigation: {
    buttonOptions: {
      symbolStroke: "#DDDDDD",
      hoverSymbolStroke: "#FFFFFF",
      theme: {
        fill: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [.4, "#606060"],
            [.6, "#333333"]
          ]
        },
        stroke: "#000000"
      }
    }
  },
  rangeSelector: {
    buttonTheme: {
      fill: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [.4, "#888"],
          [.6, "#555"]
        ]
      },
      stroke: "#000000",
      style: {
        color: "#CCC",
        fontWeight: "bold"
      },
      states: {
        hover: {
          fill: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [.4, "#BBB"],
              [.6, "#888"]
            ]
          },
          stroke: "#000000",
          style: {
            color: "white"
          }
        },
        select: {
          fill: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [.1, "#000"],
              [.3, "#333"]
            ]
          },
          stroke: "#000000",
          style: {
            color: "yellow"
          }
        }
      }
    },
    inputStyle: {
      backgroundColor: "#333",
      color: "silver"
    },
    labelStyle: {
      color: "silver"
    }
  },
  navigator: {
    handles: {
      backgroundColor: "#666",
      borderColor: "#AAA"
    },
    outlineColor: "#CCC",
    maskFill: "rgba(16, 16, 16, 0.5)",
    series: {
      color: "#7798BF",
      lineColor: "#A6C7ED"
    }
  },
  scrollbar: {
    barBackgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [.4, "#888"],
        [.6, "#555"]
      ]
    },
    barBorderColor: "#CCC",
    buttonArrowColor: "#CCC",
    buttonBackgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [.4, "#888"],
        [.6, "#555"]
      ]
    },
    buttonBorderColor: "#CCC",
    rifleColor: "#FFF",
    trackBackgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1
      },
      stops: [
        [0, "#000"],
        [1, "#333"]
      ]
    },
    trackBorderColor: "#666"
  },
  legendBackgroundColor: "rgba(48, 48, 48, 0.8)",
  background2: "rgb(70, 70, 70)",
  dataLabelsColor: "#444",
  textColor: "#E0E0E0",
  maskColor: "rgba(255,255,255,0.3)"
};
