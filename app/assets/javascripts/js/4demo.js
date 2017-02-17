'use strict';
var map;
var markersMap;


(function ($) {
  'use strict';

  function badgesWithScrollAnimationExample() {
    var $badges = $('#demo-badges').find('.badge');

    $badges.waypoint({
      handler: function handler(direction) {
        var $element = $(this.element),
            cssClasses = ['animated', 'bounceInUp'];

        if (direction === 'up') return;

        $element.addClass(cssClasses.join(' '));

        var removeCssClasses = function removeCssClasses() {
          $element.removeClass(cssClasses.join(' '));
        };

        $.support.animation ? $element.one('bsAnimationEnd', removeCssClasses) : removeCssClasses();
      },
      offset: 'bottom-in-view'
    });
  }

  function toastNotificationsExample() {
    var $showToast, $clearToasts;

    $showToast = $('#demo-show-toast');
    $showToast.on('click', function (evt) {
      var options = {},
          messages = ['Toastr is a Javascript library for non-blocking notifications.', 'Progress Bar - Visually indicate how long before a toast expires.', 'Timeouts - Control how toastr interacts with users by setting timeouts appropriately.', 'Animation Method - Use the jQuery show/hide method of your choice.', 'Easings - Optionally override the animation easing to show or hide the toasts.', 'Callbacks - Define a callback for when the toast is shown/hidden', 'Close Button - Optionally enable a close button.'];

      $(':input').each(function (index) {
        var input = $(this),
            key = input.attr('id'),
            val = input.val();

        if (input.is("input[type='checkbox']")) val = input.prop('checked');

        if (key && val) options[key] = val;
      });

      var title = options.title || '',
          message = options.message || messages[Math.floor(Math.random() * messages.length)];

      toastr[options.type](message, title, options);
    });

    $clearToasts = $('#demo-clear-toasts');
    $clearToasts.click(function (evt) {
      toastr.clear();
    });
  }

  function imageCropperBasicExample() {
    var $cropper, $cropperImg;

    $cropper = $('#demo-cropper');
    $cropper.on('change', 'input', function (evt) {
      var $this = $(this),
          name = $this.attr('name'),
          options = {};

      if ($cropperImg.data('cropper')) {
        options[name] = $this.val();

        $cropperImg.cropper('destroy').cropper(options);
      }
    });

    $cropper.on('click', '[data-method]', function (evt) {
      var $this = $(this),
          data = $this.data();

      if ($cropperImg.data('cropper') && data.method) {
        $cropperImg.cropper(data.method, data.option);

        if (data.method === 'scaleX' || data.method === 'scaleY') {
          $this.data('option', -data.option);
        }
      }
    });

    $cropperImg = $('#demo-cropper-img');
    $cropperImg.cropper();
  }

  function formWizardBasicExample() {
    var $formWizard = $('#demo-form-wizard-1');

    $formWizard.bootstrapWizard({
      nextSelector: '.btn-next',
      tabClass: 'steps'
    });
  }

  function formWizardWithValidationExample() {
    var $formWizard = $('#demo-form-wizard-2');

    $formWizard.bootstrapWizard({
      nextSelector: '.btn-next',
      tabClass: 'steps',
      onNext: function onNext(tab, navigation, index) {
        return $formWizard.valid();
      },
      onTabClick: function onTabClick(tab, navigation, index) {
        return $formWizard.valid();
      }
    });
  }

  function inputMaskBasicExample() {
    var $inputmask = $('#demo-inputmask');

    $inputmask.find(':input').each(function (idx, el) {
      $(this).inputmask();
    });
  }

  function datepickerWithLeftButtonTrigger() {
    var $datepicker = $('#demo-datepicker-1'),
        $datepickerBtn = $('#demo-datepicker-1-btn');

    $datepicker.datepicker({
      autoclose: true,
      orientation: 'top',
      showOnFocus: false
    });

    $datepickerBtn.on('click', function (evt) {
      $datepicker.datepicker('show');
    });
  }

  function datepickerWithRightButtonTrigger() {
    var $datepicker = $('#demo-datepicker-2'),
        $datepickerBtn = $('#demo-datepicker-2-btn');

    $datepicker.datepicker({
      autoclose: true,
      orientation: 'top',
      showOnFocus: false
    });

    $datepickerBtn.on('click', function (evt) {
      $datepicker.datepicker('show');
    });
  }

  function timepickerBasicExample() {
    var $timepicker = $('#demo-timepicker-1');
    $timepicker.timepicker();
  }

  function timepickerWithNowButtonTrigger() {
    var $timepicker = $('#demo-timepicker-2'),
        $timepickerBtn = $('#demo-timepicker-2-btn');

    $timepicker.timepicker();

    $timepickerBtn.on('click', function () {
      $timepicker.timepicker('setTime', new Date());
    });
  }

  function timepickerWithDurationFromStartingTime() {
    var $datepair = $('#demo-timepicker-3'),
        $timepicker = $datepair.find('.time');

    $timepicker.timepicker({
      'showDuration': true,
      'timeFormat': 'g:ia'
    });

    $datepair.datepair();
  }

  function timepickerWithDisableTimeRanges() {
    var $timepicker = $('#demo-timepicker-4');
    $timepicker.timepicker({
      'disableTimeRanges': [['12am', '9am'], ['6:01pm', '11:31pm']]
    });
  }

  function timepickerWith24hours(argument) {
    var $timepicker = $('#demo-timepicker-5');
    $timepicker.timepicker({
      'timeFormat': 'H:i:s'
    });
  }

  function timepickerWithDatepicker() {
    var $datepair = $('#demo-timepicker-6'),
        $timepicker = $datepair.find('.time'),
        $datepicker = $datepair.find('.date');

    $timepicker.timepicker({
      'showDuration': true,
      'timeFormat': 'g:ia'
    });

    $datepicker.datepicker({
      'format': 'MM d, yyyy',
      'autoclose': true
    });

    $datepair.datepair();
  }

  function timepickerWithCustomOption(argument) {
    var $timepicker = $('#demo-timepicker-7');
    $timepicker.timepicker({
      'noneOption': [{
        'label': 'Board meeting',
        'className': 'ui-timepicker-pm',
        'value': '6:00pm'
      }]
    });
  }

  function timepickerWithDifferentIntervals() {
    var $timepicker = $('#demo-timepicker-8');
    $timepicker.timepicker({
      'step': 15
    });
  }

  function select2BasicExample() {
    var $timeZone = $('#demo-select2-1');
    $timeZone.select2({ dir: 'ltr' });
  }

  function select2WithMultipleSelectionsExample() {
    var $userRoles = $('#demo-select2-2');
    $userRoles.select2({ dir: 'ltr' });
  }

  function select2WithCommaSeparatedListExample() {
    var $list = $('#demo-select2-3');
    $list.select2({
      tags: true,
      tokenSeparators: [',', ' '],
      dir: 'ltr'
    });
  }

  function select2WithCustomTemplateExample() {
    var $country = $('#demo-select2-4');
    $country.select2({
      templateResult: getCountryFlag,
      templateSelection: getCountryFlag,
      dir: 'ltr'
    });
  }

  function select2WithMobilePhoneExample() {
    var $mobilePhone = $('#demo-select2-5'),
        $mobilePhoneInput = $('#demo-select2-5-input');

    $mobilePhone.select2({
      templateResult: getCountryFlag,
      templateSelection: getCountryFlag,
      dir: 'ltr'
    });

    $mobilePhone.on('change', function (evt) {
      var countryCode = $(this).find(':selected').data('countryCode');
      $mobilePhoneInput.val(countryCode + ' ');
      $mobilePhoneInput.focus();
    });
  }

  function getCountryFlag(country) {
    var countryId, countryName, countryCode, countryFlag;

    if ((countryName = country.text) && !(countryId = country.id)) {
      return countryName;
    }

    countryCode = country.element.value.toLowerCase();
    countryFlag = 'img/flags/4x3/' + countryCode + '.svg';

    var $countryFlag = $('<span/>', {
      'text': countryName
    });

    $('<img>', {
      'class': 'img-flag',
      'src': countryFlag
    }).prependTo($countryFlag);

    return $countryFlag;
  }

  function sliderWithDonationExample() {
    var $donationSlider = $('#demo-slider-1');

    $donationSlider.slider({
      slider: 'danger',
      start: 5,
      step: 5,
      direction: 'ltr',
      tooltips: [wNumb({
        decimals: 2,
        prefix: '$'
      })],
      pips: {
        mode: 'steps',
        filter: function filter(value, type) {
          return value % 10 ? 2 : 1;
        },
        format: wNumb({
          decimals: 2,
          prefix: '$'
        })
      }
    });

    $donationSlider = $donationSlider.slider('instance');
    $donationSlider.on('change', function (evt, values, handle) {
      if ($donationSlider.get() > 5) return;

      $donationSlider.set(5);
      toastr.warning('The minimum amount a donor can make is $5.');
    });
  }

  function sliderWithFashionModelExample() {
    var $fashionModelSlider = $('#demo-slider-2'),
        $fashionModelSliderImg = $('#demo-slider-2-img');

    $fashionModelSlider.slider({
      direction: 'rtl',
      orientation: 'vertical',
      slider: 'danger',
      start: 170,
      tooltips: [wNumb({
        decimals: 0,
        postfix: 'cm'
      })],
      range: {
        'min': 0,
        '20%': 50,
        '40%': 100,
        '60%': 150,
        '80%': 200,
        'max': 250
      },
      pips: {
        mode: 'steps',
        filter: function filter(value, type) {
          return value % 100 ? 2 : 1;
        },
        format: wNumb({
          decimals: 0
        })
      }
    });

    $fashionModelSlider = $fashionModelSlider.slider('instance');
    $fashionModelSlider.on('update', function (evt, values, handle) {
      if ($fashionModelSlider.get() < 170) {
        $fashionModelSlider.set(170);
        toastr.warning('The minimum height in order to become a model in our ' + 'agency is currently 170 cm in height (without heels).');
      }

      $fashionModelSliderImg.height($fashionModelSlider.get() * 1.6);
    });
  }

  function fileUploaderBasicExample() {
    var $uploader = $('#demo-uploader');
    $uploader.fileupload({
      autoUpload: true,
      filesContainer: '.file-list'
    });
  }

  function bootstrapTableSimpleExample() {
    var $demoBootstrapTable = $('#demo-bootstrap-table-1');
    if ($demoBootstrapTable.length) {
      $demoBootstrapTable.bootstrapTable({
        columns: [{
          field: 'name',
          title: 'Name'
        }, {
          field: 'position',
          title: 'Position'
        }, {
          field: 'salary',
          title: 'Salary'
        }],
        height: 265,
        url: '/employees.json'
      });

      $(window).on('resize', function (evt) {
        $demoBootstrapTable.bootstrapTable('resetView');
      });
    }
  }

  function bootstrapTableLayoutFixedExample() {
    var $demoBootstrapTable = $('#demo-bootstrap-table-2');
    if ($demoBootstrapTable.length) {
      $demoBootstrapTable.bootstrapTable({
        columns: [{
          align: 'left',
          field: 'name',
          title: 'Name'
        }, {
          align: 'center',
          field: 'position',
          title: 'Position'
        }, {
          align: 'right',
          field: 'salary',
          title: 'Salary'
        }],
        height: 265,
        url: '/employees.json'
      });

      $(window).on('resize', function (evt) {
        $demoBootstrapTable.bootstrapTable('resetView');
      });
    }
  }

  function bootstrapTableStripedExample() {
    var $demoBootstrapTable = $('#demo-bootstrap-table-3');
    if ($demoBootstrapTable.length) {
      $demoBootstrapTable.bootstrapTable({
        columns: [{
          align: 'left',
          field: 'name',
          title: 'Name'
        }, {
          align: 'left',
          field: 'position',
          title: 'Position'
        }, {
          align: 'right',
          field: 'salary',
          title: 'Salary'
        }],
        height: 265,
        striped: true,
        url: '/employees.json'
      });

      $(window).on('resize', function (evt) {
        $demoBootstrapTable.bootstrapTable('resetView');
      });
    }
  }

  function bootstrapTableRowStyle(row, index) {
    var contextualClasses = ['active', 'success', 'info', 'warning', 'danger'],
        contextualClass = index % 2 === 0 ? contextualClasses[index % 10 / 2] : '';

    return {
      classes: contextualClass
    };
  }

  function bootstrapTableRowStyleExample() {
    var $demoBootstrapTable = $('#demo-bootstrap-table-4');
    if ($demoBootstrapTable.length) {
      $demoBootstrapTable.bootstrapTable({
        columns: [{
          align: 'left',
          field: 'name',
          title: 'Name'
        }, {
          align: 'left',
          field: 'position',
          title: 'Position'
        }, {
          align: 'right',
          field: 'salary',
          title: 'Salary'
        }],
        height: 265,
        rowStyle: bootstrapTableRowStyle,
        url: '/employees.json'
      });

      $(window).on('resize', function (evt) {
        $demoBootstrapTable.bootstrapTable('resetView');
      });
    }
  }

  function bootstrapTableCustomCheckboxFormatter(value, row, index) {
    return '<label class="custom-control custom-control-primary custom-checkbox">' + '<input class="custom-control-input" type="checkbox" name="btSelectItem" data-index="' + index + '">' + '<span class="custom-control-indicator"></span>' + '</label>';
  }

  function bootstrapTableCustomCheckboxFormatterExample() {
    var $demoBootstrapTable = $('#demo-bootstrap-table-5');
    if ($demoBootstrapTable.length) {
      $demoBootstrapTable.bootstrapTable({
        columns: [{
          field: 'state',
          formatter: bootstrapTableCustomCheckboxFormatter
        }, {
          field: 'name',
          title: 'Name'
        }, {
          field: 'position',
          title: 'Position'
        }],
        height: 265,
        url: '/employees.json'
      });

      $(window).on('resize', function (evt) {
        $demoBootstrapTable.bootstrapTable('resetView');
      });
    }
  }

  function bootstrapTableSwitchFormatter(value, row, index) {
    return '<label class="switch switch-primary">' + '<input class="switch-input" type="checkbox" name="btSelectItem" data-index="' + index + '">' + '<span class="switch-track"></span>' + '<span class="switch-thumb"></span>' + '</label>';
  }

  function bootstrapTableSwitchFormatterExample() {
    var $demoBootstrapTable = $('#demo-bootstrap-table-6');
    if ($demoBootstrapTable.length) {
      $demoBootstrapTable.bootstrapTable({
        classes: 'table',
        columns: [{
          field: 'name',
          title: 'Name'
        }, {
          field: 'position',
          title: 'Position'
        }, {
          field: 'state',
          formatter: bootstrapTableSwitchFormatter
        }],
        height: 265,
        url: '/employees.json'
      });

      $(window).on('resize', function (evt) {
        $demoBootstrapTable.bootstrapTable('resetView');
      });
    }
  }

  function bootstrapTableFlagFormatter(value, row) {
    if (row.flag.length) {
      value = '<img class="img-flag" src="' + row.flag + '">' + value;
    }

    return value;
  }

  function bootstrapTableCustomSort(a, b) {
    a = parseInt(a.replace(/[.,%]/g, ''));
    b = parseInt(b.replace(/[.,%]/g, ''));

    if (a < b) return 1;
    if (a > b) return -1;

    return 0;
  }

  function bootstrapTableWithSortableColumnsExample() {
    var $demoBootstrapTable7 = $('#demo-bootstrap-table-7');
    $demoBootstrapTable7.bootstrapTable({
      columns: [{
        align: 'right',
        field: 'rank',
        sortable: false,
        title: 'Rank'
      }, {
        field: 'country',
        formatter: bootstrapTableFlagFormatter,
        sortable: false,
        title: 'Country'
      }, {
        align: 'right',
        field: 'continent',
        sortable: true,
        title: 'Continent'
      }, {
        align: 'right',
        field: 'region',
        sortable: true,
        title: 'Region'
      }, {
        align: 'right',
        field: 'year2016',
        sortable: true,
        sorter: bootstrapTableCustomSort,
        title: '2016'
      }, {
        align: 'right',
        field: 'year2015',
        sortable: true,
        sorter: bootstrapTableCustomSort,
        title: '2015'
      }, {
        align: 'right',
        field: 'change',
        sortable: true,
        sorter: bootstrapTableCustomSort,
        title: 'Change'
      }],
      height: 411,
      striped: true,
      url: '/population.json'
    });

    $(window).on('resize', function (evt) {
      $demoBootstrapTable7.bootstrapTable('resetView');
    });
  }

  function bootstrapTableWithToolbarAndPaginationExample() {
    var $demoBootstrapTable = $('#demo-bootstrap-table-8');
    if ($demoBootstrapTable.length) {
      $demoBootstrapTable.bootstrapTable({
        buttonsClass: 'primary',
        columns: [{
          align: 'right',
          field: 'rank',
          sortable: false,
          title: 'Rank'
        }, {
          field: 'country',
          formatter: bootstrapTableFlagFormatter,
          sortable: false,
          title: 'Country'
        }, {
          align: 'right',
          field: 'continent',
          sortable: true,
          title: 'Continent'
        }, {
          align: 'right',
          field: 'region',
          sortable: true,
          title: 'Region'
        }, {
          align: 'right',
          field: 'year2016',
          sortable: true,
          sorter: bootstrapTableCustomSort,
          title: '2016'
        }, {
          align: 'right',
          field: 'year2015',
          sortable: true,
          sorter: bootstrapTableCustomSort,
          title: '2015'
        }, {
          align: 'right',
          field: 'change',
          sortable: true,
          sorter: bootstrapTableCustomSort,
          title: 'Change'
        }],
        icons: {
          columns: 'icon-list-ul',
          paginationSwitchDown: 'icon-expand',
          paginationSwitchUp: 'icon-compress',
          refresh: 'glyphicon-refresh icon-refresh',
          toggle: 'icon-columns'
        },
        iconsPrefix: 'icon',
        minimumCountColumns: 2,
        pageList: [],
        pagination: true,
        search: true,
        showColumns: true,
        showFooter: false,
        showPaginationSwitch: true,
        showRefresh: true,
        showToggle: true,
        striped: true,
        url: '/population.json'
      });

      $(window).on('resize', function (evt) {
        $demoBootstrapTable.bootstrapTable('resetView');
      });
    }
  }

  function datatablesBasicTableExample() {
    var $datatables = $('#demo-datatables-1');
    $datatables.DataTable({
      dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'table-responsive'tr>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      },
      order: [[5, "desc"]]
    });
  }

  function datatablesComplexHeaderExample() {
    var $datatables = $('#demo-datatables-2');
    $datatables.DataTable({
      dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'table-responsive'tr>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      },
      order: [[2, "desc"]]
    });
  }

  function datatablesIndividualColumnSearchingExample() {
    var $datatables = $('#demo-datatables-3');
    if ($datatables.length) {
      var DataTable = $.fn.dataTable;
      $.extend(true, DataTable.ext.classes, {
        sWrapper: "dataTables_wrapper dt-bootstrap"
      });

      $('#demo-datatables-3 tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input class="form-control input-sm" type="text" placeholder="Search ' + title + '" />');
      });

      // DataTable
      var $datatables = $datatables.DataTable({
        dom: "<'row'<'col-sm-12'i>>" + "<'table-responsive'tr>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
        language: {
          paginate: {
            previous: '&laquo;',
            next: '&raquo;'
          },
          search: "_INPUT_",
          searchPlaceholder: "Search…"
        },
        order: [[2, "desc"]]
      });

      // Apply the search
      $datatables.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this.value) {
            that.search(this.value).draw();
          }
        });
      });
    }
  }

  function datatablesSelect2ColumnSearchingExample() {
    var $datatables = $('#demo-datatables-4');
    if ($datatables.length) {
      var DataTable = $.fn.dataTable;
      $.extend(true, DataTable.ext.classes, {
        sWrapper: "dataTables_wrapper dt-bootstrap"
      });

      $datatables.DataTable({
        dom: "<'row'<'col-sm-12'i>>" + "<'table-responsive'tr>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
        language: {
          paginate: {
            previous: '&laquo;',
            next: '&raquo;'
          }
        },
        initComplete: function initComplete() {
          this.api().columns().every(function () {
            var column = this;
            var header = column.header();
            var select = $('<select class="demo-select2"><option value="">' + $(header).text() + '</option></select>').appendTo($(column.footer()).empty()).on('change', function () {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());

              column.search(val ? '^' + val + '$' : '', true, false).draw();
            });

            column.data().unique().sort().each(function (d, j) {
              select.append('<option value="' + d + '">' + d + '</option>');
            });
          });
        }
      });
      $(".demo-select2").select2();
    }
  }

  function datatablesAlternativePaginationExample() {
    var $datatables = $('#demo-datatables-5');
    $datatables.DataTable({
      dom: "<'row'<'col-sm-6'l><'col-sm-6'f>>" + "<'table-responsive'tr>" + "<'row'<'col-sm-12'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      },
      "pagingType": "full_numbers",
      order: [[2, "desc"]]
    });
  }

  function datatablesButtonsExample() {
    var DataTable = $.fn.dataTable;
    $.extend(true, DataTable.Buttons.defaults, {
      dom: {
        button: {
          className: 'btn btn-primary btn-sm'
        }
      }
    });

    var $datatablesButtons = $('#demo-datatables-buttons-1').DataTable({
      buttons: ['print', 'copy', 'pdf', 'excel', 'colvis'],
      lengthChange: false,
      responsive: true,
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      },
      order: [[6, "desc"]]
    });

    $datatablesButtons.buttons().container().appendTo('#demo-datatables-buttons-1_wrapper .col-sm-6:eq(0)');
  }

  function datatablesButtonsTableBorderedExample() {
    var DataTable = $.fn.dataTable;
    $.extend(true, DataTable.Buttons.defaults, {
      dom: {
        button: {
          className: 'btn btn-outline-primary btn-sm'
        }
      }
    });

    var $datatablesButtons = $('#demo-datatables-buttons-2').DataTable({
      buttons: ['print', 'copy', 'pdf', 'excel', 'colvis'],
      lengthChange: false,
      responsive: true,
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      },
      order: [[6, "desc"]]
    });

    $datatablesButtons.buttons().container().appendTo('#demo-datatables-buttons-2_wrapper .col-sm-6:eq(0)');
  }

  function datatablesColreorderExample() {
    var $datatablesColreorder = $('#demo-datatables-colreorder-1');
    $datatablesColreorder.DataTable({
      colReorder: true,
      responsive: true,
      dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      }
    });
  }

  function datatablesColreorderStateSavingExample() {
    var $datatablesColreorder = $('#demo-datatables-colreorder-2');
    $datatablesColreorder.DataTable({
      colReorder: true,
      responsive: true,
      stateSave: true,
      dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      }
    });
  }

  function datatablesFixedheaderExample() {
    var $datatablesFixedheader = $('#demo-datatables-fixedheader-1');
    if ($datatablesFixedheader.length) {
      $datatablesFixedheader = $datatablesFixedheader.DataTable({
        fixedHeader: true,
        responsive: true,
        dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
        language: {
          paginate: {
            previous: '&laquo;',
            next: '&raquo;'
          },
          search: "_INPUT_",
          searchPlaceholder: "Search…"
        }
      });

      var adjustFixedHeaderTimeoutId;
      var adjustFixedHeader = function adjustFixedHeader() {
        if (adjustFixedHeaderTimeoutId) {
          clearTimeout(adjustFixedHeaderTimeoutId);
        }

        adjustFixedHeaderTimeoutId = setTimeout(function () {
          $datatablesFixedheader.columns.adjust().responsive.recalc().fixedHeader.adjust();
        }, 300);
      };

      $(window).on('resize', adjustFixedHeader);
      $('button.sidenav-toggler').on('click', adjustFixedHeader);

      adjustFixedHeader();
    }
  }

  function datatablesFixedheaderTableBorderedExample() {
    var $datatablesFixedheader = $('#demo-datatables-fixedheader-2');
    if ($datatablesFixedheader.length) {
      $datatablesFixedheader = $datatablesFixedheader.DataTable({
        fixedHeader: true,
        responsive: true,
        dom: "<'row'<'col-sm-6'l><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'i><'col-sm-6'p>>",
        language: {
          paginate: {
            previous: '&laquo;',
            next: '&raquo;'
          },
          search: "_INPUT_",
          searchPlaceholder: "Search…"
        }
      });

      var adjustFixedHeaderTimeoutId;
      var adjustFixedHeader = function adjustFixedHeader() {
        if (adjustFixedHeaderTimeoutId) {
          clearTimeout(adjustFixedHeaderTimeoutId);
        }

        adjustFixedHeaderTimeoutId = setTimeout(function () {
          $datatablesFixedheader.columns.adjust().responsive.recalc().fixedHeader.adjust();
        }, 300);
      };

      $(window).on('resize', adjustFixedHeader);
      $('button.sidenav-toggler').on('click', adjustFixedHeader);

      adjustFixedHeader();
    }
  }

  function datatablesResponsiveExample() {
    var $datatablesResponsive = $('#demo-datatables-responsive-1');
    $datatablesResponsive.DataTable({
      responsive: true,
      dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'><'col-sm-6'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      },
      order: [[6, "desc"]]
    });
  }

  function datatablesResponsiveTableBorderedExample() {
    var $datatablesResponsive = $('#demo-datatables-responsive-2');
    $datatablesResponsive.DataTable({
      responsive: true,
      dom: "<'row'<'col-sm-6 col-sm-push-6'i><'col-sm-6 col-md-pull-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      },
      order: [[6, "desc"]]
    });
  }

  function datatablesRowreorderExample() {
    var $datatablesRowreorder = $('#demo-datatables-rowreorder-1');
    $datatablesRowreorder.DataTable({
      rowReorder: true,
      dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'table-responsive'tr>" + "<'row'<'col-sm-6'><'col-sm-6'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      }
    });
  }

  function datatablesRowreorderTableBorderedExample() {
    var DataTable = $.fn.dataTable;
    $.extend(true, DataTable.Buttons.defaults, {
      dom: {
        button: {
          className: 'btn btn-primary btn-sm'
        }
      }
    });

    var $datatablesRowreorder = $('#demo-datatables-rowreorder-2').DataTable({
      buttons: ['print', 'copy', 'pdf'],
      rowReorder: true,
      dom: "<'row'<'col-sm-6'><'col-sm-6'f>>" + "<'table-responsive'tr>" + "<'row'<'col-sm-6'i><'col-sm-6'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      }
    });

    $datatablesRowreorder.buttons().container().appendTo('#demo-datatables-rowreorder-2_wrapper .col-sm-6:eq(0)');
  }

  function datatablesScrollerExample() {
    var $datatablesFixedheader = $('#demo-datatables-scroller-1');
    if ($datatablesFixedheader.length) {
      $datatablesFixedheader = $datatablesFixedheader.DataTable({
        deferRender: true,
        scrollY: 370,
        scrollCollapse: true,
        scroller: true,
        responsive: true,
        dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
        language: {
          paginate: {
            previous: '&laquo;',
            next: '&raquo;'
          },
          search: "_INPUT_",
          searchPlaceholder: "Search…"
        }
      });

      $(window).on('resize', function (evt) {
        setTimeout(function () {
          $datatablesFixedheader.columns.adjust().responsive.recalc();
        }, 150);
      });
    }
  }

  function datatablesScrollerTableBorderedExample() {
    var $datatablesFixedheader = $('#demo-datatables-scroller-2');
    if ($datatablesFixedheader.length) {
      $datatablesFixedheader = $datatablesFixedheader.DataTable({
        deferRender: true,
        scrollY: 369,
        scrollCollapse: true,
        scroller: true,
        responsive: true,
        dom: "<'row'<'col-sm-6 col-sm-push-6'i><'col-sm-6 col-md-pull-6'f>>" + "<'row'<'col-sm-12'tr>>",
        language: {
          paginate: {
            previous: '&laquo;',
            next: '&raquo;'
          },
          search: "_INPUT_",
          searchPlaceholder: "Search…"
        }
      });

      $(window).on('resize', function (evt) {
        setTimeout(function () {
          $datatablesFixedheader.columns.adjust().responsive.recalc();
        }, 150);
      });
    }
  }

  function googleMapBasicExample() {
    var $basicMap = $('#demo-map-1');
    if ($basicMap.length) {
      new GMaps({
        div: $basicMap[0],
        height: '300px',
        lat: 37.77,
        lng: -122.447,
        zoom: 12
      });
    }
  }
  var googleMapWithMarkersExample;

  map  =function (datos) {


      markersMap.removeMarkers();
      markersMap.setCenter(-33.4558882,-70.5959592);
      markersMap.setZoom(13);


      var dato;
      for (var ixx =0 ; ixx < datos.length ; ixx++){

          dato = datos[ixx]

          var l = dato.ubicacion.replace("POINT(","").replace(")","").split(" ")
          markersMap.addMarker({
              title: dato.nombre_social,
              content: ixx,
              lat: l[1],
              lng: l[0],
              click: function click(evt) {
                  render_localizado(evt);

                  //toastr.info(evt.content, evt.title);
              }
          });

      }


  }




      googleMapWithMarkersExample = function (datos) {
        datos = datos || [];

    var $markersMap = $('#demo-map-2');
    if ($markersMap.length) {
      markersMap = new GMaps({
        div: $markersMap[0],
        height: '500px',
        lat: -33.4558882,
        lng: -70.5959592,
        zoom: 13
      });




    }


    }

  function googleMapWithPolylinesExample() {
    var $polylinesMap = $('#demo-map-3');
    if ($polylinesMap.length) {
      var polylinesMap = new GMaps({
        div: $polylinesMap[0],
        height: '300px',
        lat: 0,
        lng: -180,
        zoom: 2
      });

      var polylinesPaths = [[37.772, -122.214], [21.291, -157.821], [-18.142, 178.431], [-27.467, 153.027]];

      polylinesMap.drawPolyline({
        path: polylinesPaths,
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
    }
  }

  function googleMapWithPolygonsExample() {
    var $polygonsMap = $('#demo-map-4');
    if ($polygonsMap.length) {
      var polygonsMap = new GMaps({
        div: $polygonsMap[0],
        height: '400px',
          lat: -33.4558882,
          lng: -70.5959592,
          zoom: 13
      });

      var polygonsPaths = [["-33.4498668", "-70.6314905"], ["-33.4489229", "-70.6265964"], ["-33.447956", "-70.6219358"], ["-33.4473115", "-70.6187343"], ["-33.4483857", "-70.6184339"], ["-33.4475765", "-70.6137304"], ["-33.4469248", "-70.6138935"], ["-33.4464879", "-70.6111383"], ["-33.4459365", "-70.6092843"], ["-33.4456715", "-70.6079454"], ["-33.4451845", "-70.6041774"], ["-33.4448452", "-70.6011102"], ["-33.4447097", "-70.5991534"], ["-33.4443795", "-70.5991991"], ["-33.4442735", "-70.5981983"], ["-33.4447938", "-70.5981327"], ["-33.4468601", "-70.5945835"], ["-33.4469368", "-70.5944518"], ["-33.4478486", "-70.5927362"], ["-33.4408443", "-70.5880069"], ["-33.4394362", "-70.5870323"], ["-33.4391826", "-70.5868568"], ["-33.4374067", "-70.5853178"], ["-33.4355226", "-70.5836124"], ["-33.4354113", "-70.5835142"], ["-33.4340614", "-70.5824193"], ["-33.4337451", "-70.5822075"], ["-33.4345682", "-70.5808682"], ["-33.4352158", "-70.5796898"], ["-33.4359659", "-70.5782768"], ["-33.4362805", "-70.5774197"], ["-33.436434", "-70.5766619"], ["-33.4367182", "-70.5758825"], ["-33.4368171", "-70.5756245"], ["-33.4374971", "-70.5743235"], ["-33.4379937", "-70.5734414"], ["-33.4389749", "-70.5731754"], ["-33.4400708", "-70.5729865"], ["-33.4414514", "-70.5727249"], ["-33.4416106", "-70.5726947"], ["-33.4433439", "-70.5723943"], ["-33.4456357", "-70.5719823"], ["-33.4475765", "-70.5716648"], ["-33.4497249", "-70.5712785"], ["-33.4510212", "-70.5710639"], ["-33.4525465", "-70.5707979"], ["-33.453055", "-70.5707378"], ["-33.4535133", "-70.5707464"], ["-33.4537353", "-70.5707979"], ["-33.4548954", "-70.571124"], ["-33.4565281", "-70.5715618"], ["-33.4580462", "-70.5719909"], ["-33.4589914", "-70.5722656"], ["-33.4597079", "-70.5725308"], ["-33.4606674", "-70.5729943"], ["-33.4620048", "-70.5736608"], ["-33.462814", "-70.573987"], ["-33.4655134", "-70.5749912"], ["-33.4680337", "-70.5759697"], ["-33.4688301", "-70.5762473"], ["-33.4688873", "-70.5760585"], ["-33.4690786", "-70.5758648"], ["-33.4692003", "-70.5757789"], ["-33.4693407", "-70.5757026"], ["-33.4694796", "-70.5756673"], ["-33.4697874", "-70.5756845"], ["-33.4699521", "-70.5758047"], ["-33.4701239", "-70.5759935"], ["-33.4702313", "-70.5762081"], ["-33.4703336", "-70.5766507"], ["-33.4702525", "-70.5770311"], ["-33.4699326", "-70.5774146"], ["-33.4727035", "-70.5827018"], ["-33.4733693", "-70.5839892"], ["-33.473491", "-70.5845214"], ["-33.4735462", "-70.5851806"], ["-33.473672", "-70.5866818"], ["-33.4741016", "-70.5887932"], ["-33.4741034", "-70.5895766"], ["-33.4738132", "-70.5921689"], ["-33.473627", "-70.5951043"], ["-33.4736127", "-70.5963918"], ["-33.4737774", "-70.598692"], ["-33.4737967", "-70.5989331"], ["-33.4738919", "-70.6012326"], ["-33.4739421", "-70.6028205"], ["-33.4740974", "-70.6063306"], ["-33.4742943", "-70.6098872"], ["-33.4744778", "-70.6134278"], ["-33.4745892", "-70.6157132"], ["-33.4747198", "-70.6184055"], ["-33.4749408", "-70.6228186"], ["-33.4749491", "-70.622984"], ["-33.4729326", "-70.62354"], ["-33.4718085", "-70.6238147"], ["-33.4713073", "-70.6239348"], ["-33.4707847", "-70.6240207"], ["-33.4704768", "-70.6240979"], ["-33.4703265", "-70.6241666"], ["-33.4702262", "-70.6242267"], ["-33.4700401", "-70.624364"], ["-33.4698539", "-70.62457"], ["-33.4695975", "-70.6249962"], ["-33.4692682", "-70.6255627"], ["-33.4690319", "-70.6258288"], ["-33.4688253", "-70.6259548"], ["-33.4685962", "-70.6260664"], ["-33.4682586", "-70.6261635"], ["-33.4672849", "-70.6263952"], ["-33.4653087", "-70.6269789"], ["-33.4623587", "-70.6278544"], ["-33.4595088", "-70.6287041"], ["-33.4573033", "-70.6293135"], ["-33.4536655", "-70.630352"], ["-33.4498668", "-70.6314905"]]

        polygonsMap.drawPolygon({
        fillColor: '#61aeff',
        fillOpacity: 0.35,
        paths: polygonsPaths,
        strokeColor: '#3fb7ff',
        strokeOpacity: 0.8,
        strokeWeight: 2
      });
    }
  }

  function googleMapWithDrawRouteExample() {
    var $drawRoute = $('#demo-map-5');
    if ($drawRoute.length) {
      var drawRoute = new GMaps({
        div: $drawRoute[0],
        height: '300px',
        lat: 37.769040,
        lng: -122.483519,
        zoom: 12
      });

      drawRoute.drawRoute({
        destination: [37.819929, -122.478255],
        origin: [37.769040, -122.483519],
        strokeColor: '#ff0000',
        strokeOpacity: 0.75,
        strokeWeight: 6,
        travelMode: 'driving'
      });
    }
  }

  function googleMapWithDrawRouteStepByStepExample() {
    var $drawRoute = $('#demo-map-6'),
        $drawRouteBtn = $('#demo-map-6-btn');
    if ($drawRoute.length) {
      var drawRoute = new GMaps({
        div: $drawRoute[0],
        height: '300px',
        lat: 37.769040,
        lng: -122.483519,
        zoom: 12
      });

      $drawRouteBtn.on('click', function (evt) {
        drawRoute.cleanRoute();
        drawRoute.travelRoute({
          destination: [37.819929, -122.478255],
          origin: [37.769040, -122.483519],
          travelMode: 'driving',
          step: function step(evt) {
            var delay = evt.step_number * 1000;
            setTimeout(function () {
              toastr.info(evt.instructions);

              drawRoute.setCenter(evt.end_location.lat(), evt.end_location.lng());

              drawRoute.drawPolyline({
                path: evt.path,
                strokeColor: '#ff0000',
                strokeOpacity: 0.6,
                strokeWeight: 6
              });
            }, delay);
          }
        });
        evt.preventDefault();
      });
    }
  }

  function googleMapWithOpenStreetMapExample() {
    var $openStreetMap = $('#demo-map-7');
    if ($openStreetMap.length) {
      var openStreetMap = new GMaps({
        div: $openStreetMap[0],
        height: '300px',
        lat: 37.77,
        lng: -122.447,
        zoom: 12,
        mapTypeControlOptions: {
          mapTypeIds: ['hybrid', 'osm', 'roadmap', 'satellite', 'terrain']
        }
      });

      openStreetMap.addMapType('osm', {
        getTileUrl: function getTileUrl(coord, zoom) {
          return 'https://a.tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
        },
        maxZoom: 18,
        name: 'OpenStreetMap',
        tileSize: new google.maps.Size(256, 256)
      });

      openStreetMap.setMapTypeId('osm');
    }
  }

  var getRandomNum = function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  };

  var getRandomInt = function getRandomInt(min, max) {
    return Math.round(getRandomNum(min, max));
  };

  var getRandomColor = function getRandomColor(opacity) {
    var values = [];
    values.push(getRandomInt(0, 255));
    values.push(getRandomInt(0, 255));
    values.push(getRandomInt(0, 255));
    values.push(opacity || '0.3');
    return 'rgba(' + values.toString() + ')';
  };

  function chartWithBubblesExample() {
    var $bubbleChart, bubbleChart, breakpoint, config, categories, randomSales, randomDifference, randomPercentage;

    $bubbleChart = $('#demo-chart-1');

    if ($bubbleChart.length) {
      categories = ['Cellphones', 'Accessories', 'Cameras', 'Computers', 'Tablets', 'Vehicle Electronics', 'Video Games', 'TV', 'Audio', 'Surveillance'];
      randomSales = function randomSales() {
        return getRandomInt(1000000, 2000000);
      };

      randomDifference = function randomDifference() {
        return getRandomNum(-0.1, 0.1);
      };

      randomPercentage = function randomPercentage() {
        return getRandomNum(5, 25);
      };

      config = {
        type: 'bubble',
        data: {
          datasets: []
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: 'right'
          },
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'The difference with the previous year.'
              },
              ticks: {
                userCallback: function userCallback(tick) {
                  return numeral(tick).format('0 %');
                }
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'This Year Electronic Sales'
              },
              ticks: {
                userCallback: function userCallback(tick) {
                  return numeral(tick).format('$ 0.00 a');
                }
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function label(tooltipItem, data) {
                var datasetLabel = data.datasets[tooltipItem.datasetIndex].label,
                    dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return datasetLabel + ': ' + numeral(dataPoint.y).format('$0,0.00');
              }
            }
          }
        }
      };

      $.each(categories, function (i, category) {
        var data, background;

        data = {};
        background = getRandomColor(1);

        data.label = category;
        data.borderColor = background;
        data.backgroundColor = background;
        data.pointBorderColor = background;
        data.pointBackgroundColor = background;
        data.pointBorderWidth = 1;
        data.data = [{
          x: randomDifference(),
          y: randomSales(),
          r: randomPercentage()
        }];

        config.data.datasets.push(data);
      });

      bubbleChart = new Chart($bubbleChart, config);

      breakpoint = window.matchMedia('(max-width: 992px)');
      breakpoint.addListener(function (mediaQuery) {
        var legendPosition = mediaQuery.matches ? 'bottom' : 'right';
        config.options.legend.position = legendPosition;

        bubbleChart.update();
      });
    }
  }

  function chartIssuesExample() {
    var $issuesChart, config, months, types, randomIssues, randomRankings;

    $issuesChart = $('#demo-chart-2');

    if ($issuesChart.length) {
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      types = ['Questions', 'Incidents', 'Problems', 'Tasks'];

      randomIssues = function randomIssues() {
        return getRandomInt(1000, 2000);
      };

      randomRankings = function randomRankings() {
        return getRandomInt(5, 25);
      };

      config = {
        type: 'line',
        data: {
          labels: months,
          datasets: []
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            position: 'bottom'
          },
          hover: {
            mode: 'label'
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Number of tickets'
              }
            }]
          },
          title: {
            display: true,
            text: 'Monthly Report'
          }
        }
      };

      $.each(types, function (i, type) {
        var issues, rankings, background, data;

        issues = [];
        rankings = [];

        $.each(months, function (i, month) {
          issues.push(randomIssues());
          rankings.push(randomRankings());
        });

        background = getRandomColor(0.5);
        data = {};

        data.backgroundColor = background;
        data.borderColor = background;
        data.data = issues;
        data.fill = false;
        data.label = type;
        data.pointBackgroundColor = background;
        data.pointBorderColor = background;
        data.pointBorderWidth = 1;
        data.pointHoverRadius = rankings;
        data.pointRadius = rankings;

        if (i % 2 == 0) {
          data.borderDash = [5, 5];
        }

        config.data.datasets.push(data);
      });

      new Chart($issuesChart, config);
    }
  }

  function chartCombinationExample() {
    var $combinationChart, randomData, config;

    $combinationChart = $('#demo-chart-3');

    if ($combinationChart.length) {
      randomData = function randomData() {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
      };

      config = {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            data: [randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData()],
            label: 'Dataset 1',
            type: 'bar'
          }, {
            data: [randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData()],
            label: 'Dataset 2',
            type: 'bar'
          }, {
            borderDash: [5, 5],
            data: [randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData()],
            fill: false,
            label: 'Dataset 3',
            type: 'line'
          }]
        },
        options: {
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Bar Line Combination Chart'
          },
          animation: {
            onComplete: function onComplete() {
              var chartInstance = this.chart;
              var ctx = chartInstance.ctx;
              ctx.textAlign = "center";

              Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                Chart.helpers.each(meta.data.forEach(function (bar, index) {
                  ctx.fillText(dataset.data[index], bar._model.x, bar._model.y - 10);
                }), this);
              }), this);
            }
          },
          legend: {
            display: false
          }
        }
      };

      $.each(config.data.datasets, function (i, dataset) {
        var background = getRandomColor(0.5);
        dataset.borderColor = background;
        dataset.backgroundColor = background;
        dataset.pointBorderColor = background;
        dataset.pointBackgroundColor = background;
        dataset.pointBorderWidth = 2;
      });

      new Chart($combinationChart, config);
    }
  }

  function chartCombinationFilledExample() {
    var $combinationChart, randomData, config;

    $combinationChart = $('#demo-chart-4');

    if ($combinationChart.length) {
      randomData = function randomData() {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
      };

      config = {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            backgroundColor: "rgba(151,187,205,0.5)",
            borderColor: 'white',
            borderWidth: 2,
            data: [randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData()],
            label: 'Dataset 1',
            type: 'bar'
          }, {
            backgroundColor: "rgba(151,187,205,0.5)",
            borderColor: 'white',
            borderWidth: 2,
            data: [randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData()],
            label: 'Dataset 2',
            type: 'line'
          }, {
            backgroundColor: "rgba(220,220,220,0.5)",
            data: [randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData()],
            label: 'Dataset 3',
            type: 'bar'
          }]
        },
        options: {
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Bar Line Combination Chart'
          },
          animation: {
            onComplete: function onComplete() {
              var chartInstance = this.chart;
              var ctx = chartInstance.ctx;
              ctx.textAlign = "center";

              Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                Chart.helpers.each(meta.data.forEach(function (bar, index) {
                  ctx.fillText(dataset.data[index], bar._model.x, bar._model.y - 10);
                }), this);
              }), this);
            }
          },
          legend: {
            display: false
          }
        }
      };

      new Chart($combinationChart, config);
    }
  }

  function peityChartUpdatingExample() {
    var $demoPeityChart = $('#demo-peity-chart');
    if ($demoPeityChart.length) {
      $demoPeityChart.peity("line", {
        width: 64
      });

      setInterval(function () {
        var random = Math.round(Math.random() * 10);
        var values = $demoPeityChart.text().split(",");
        values.shift();
        values.push(random);

        $demoPeityChart.text(values.join(",")).change();
      }, 1000);
    }
  }

  // Share message
  function showShareMessage() {
    var title, message;

    if (!!Cookies.get('shareMessage')) return;

    message = 'If you like Elephant, please share it with your friends ' + 'and followers, this way you will help the elephant grow.';

    toastr.info(message, title, {
      progressBar: true,
      timeOut: 15000,
      extendedTimeOut: 5000
    });

    Cookies.set('shareMessage', true, 1);
  }

  // Badges
  badgesWithScrollAnimationExample();

  // Toast
  toastNotificationsExample();

  // Image cropper
  imageCropperBasicExample();

  // Form wizards
  formWizardBasicExample();
  formWizardWithValidationExample();

  // Input masks
  inputMaskBasicExample();

  // Datepicker
  datepickerWithLeftButtonTrigger();
  datepickerWithRightButtonTrigger();

  // Timepicker
  timepickerBasicExample();
  timepickerWithNowButtonTrigger();
  timepickerWithDurationFromStartingTime();
  timepickerWithDisableTimeRanges();
  timepickerWith24hours();
  timepickerWithDatepicker();
  timepickerWithCustomOption();
  timepickerWithDifferentIntervals();

  // Select2
  select2BasicExample();
  select2WithMultipleSelectionsExample();
  select2WithCommaSeparatedListExample();
  select2WithCustomTemplateExample();
  select2WithMobilePhoneExample();

  // Slider
  sliderWithDonationExample();
  sliderWithFashionModelExample();

  // File uploader
  fileUploaderBasicExample();

  // Bootstrap Table
  bootstrapTableSimpleExample();
  bootstrapTableLayoutFixedExample();
  bootstrapTableStripedExample();
  bootstrapTableRowStyleExample();
  bootstrapTableCustomCheckboxFormatterExample();
  bootstrapTableSwitchFormatterExample();
  bootstrapTableWithSortableColumnsExample();
  bootstrapTableWithToolbarAndPaginationExample();

  // DataTables
  datatablesBasicTableExample();
  datatablesComplexHeaderExample();
  datatablesIndividualColumnSearchingExample();
  datatablesSelect2ColumnSearchingExample();
  datatablesAlternativePaginationExample();
  datatablesButtonsExample();
  datatablesButtonsTableBorderedExample();
  datatablesColreorderExample();
  datatablesColreorderStateSavingExample();
  datatablesFixedheaderExample();
  datatablesFixedheaderTableBorderedExample();
  datatablesResponsiveExample();
  datatablesResponsiveTableBorderedExample();
  datatablesRowreorderExample();
  datatablesRowreorderTableBorderedExample();
  datatablesScrollerExample();
  datatablesScrollerTableBorderedExample();

  // Google Maps
  // googleMapBasicExample();
  // googleMapWithMarkersExample();
  // googleMapWithPolylinesExample();
  // googleMapWithPolygonsExample();
  // googleMapWithDrawRouteExample();
  // googleMapWithDrawRouteStepByStepExample();
  // googleMapWithOpenStreetMapExample();

  // Charts
  chartWithBubblesExample();
  chartIssuesExample();
  chartCombinationExample();
  chartCombinationFilledExample();

  // Peity
  peityChartUpdatingExample();

  // Share message
  $('button.theme-panel-toggler').one('click', showShareMessage);
})(jQuery);
