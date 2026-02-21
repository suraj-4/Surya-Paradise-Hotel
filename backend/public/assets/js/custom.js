$(document).ready(function () {
  // Theme Mode
  $(".toggle").click(function () {
    $(".toggle").toggleClass("bluest");
    $("body").toggleClass("bluest");
  });
  // Sidebar Menu
  const fstBtn = document.querySelectorAll(".nav-item");
  fstBtn.forEach((button) => {
    button.addEventListener("click", function () {
      fstBtn.forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
  // Close Side
  $(".CloseBtn").click(function () {
    $(".sidebar").toggleClass("minimize");
  });

  // ApexCharts
  var options = {
    series: [
      {
        name: "Total Rooms",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Total Earnings",
        data: [15, 35, 45, 63, 34, 56, 41],
      },
      {
        name: "Total Bookings",
        data: [21, 52, 45, 32, 44, 34, 95],
      },
      {
        name: "Total Staff",
        data: [11, 32, 41, 52, 11, 52, 85],
      },
    ],
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  var chart = new ApexCharts(document.querySelector("#curverChart"), options);
  chart.render();

  // data table js
  function eventFired(type) {
    let n = document.querySelectorAll('.customerLists');
    n.innerHTML +=
        '<div>' + type + ' event - ' + new Date().getTime() + '</div>';
    n.scrollTop = n.scrollHeight;
  }
 
  new DataTable('.customerList')
    .on('order.dt', () => eventFired('Order'))
    .on('search.dt', () => eventFired('Search'))
    .on('page.dt', () => eventFired('Page'));


  // Booking Calender
  $(function() {

    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });
  
    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
  
    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
  
  });

});
