looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "looker_table",
  label: "Table",
  options: {
    font_size: {
      type: "number",
      label: "Font Size (px)",
      default: 11
    }
  },
  // Set up the initial state of the visualization
  create: function (element, config) {
    console.log(config);
    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
        <style>
          .table {
            font-size: ${config.font_size}px;
            border: 1px solid black;
            border-collapse: collapse;
            margin:auto;
          }
          .table-header {
            background-color: #eee;
            border: 1px solid black;
            border-collapse: collapse;
            font-weight: normal;
            font-family: 'Verdana';
            font-size: 11px;
            align-items: center;
            text-align: center;
            margin: auto;
            width: 90px;
            background-clip: padding-box;
          }
          .table-cell {
            padding: 5px;
            border-bottom: 1px solid #ccc;
            border: 1px solid black;
            border-collapse: collapse;
            font-weight: normal;
            font-family: 'Verdana';
            font-size: 11px;
            align-items: center;
            text-align: center;
            margin: auto;
            width: 90px;
          }
          .text-cell {
            mso-number-format: \@;
          }
        </style>
      `;
    // Create a container element to let us center the text.
    this._container = element.appendChild(document.createElement("div"));
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = 'sandbox allow-downloads';
    document.head.appendChild(meta);
  },

  addDownloadButtonListener: function (k) {
    console.log('xyz' + k);
    const downloadButton = document.createElement('img');
    downloadButton.src = "https://cdn.jsdelivr.net/gh/Spoorti-Gandhad/AGBG-Assets@main/downloadAsExcel.jfif";
    downloadButton.setAttribute('height', '25px');
    downloadButton.setAttribute('width', '25px');
    downloadButton.setAttribute('title', 'Download As Excel');
    downloadButton.style.marginLeft='90%';
    //downloadButton.className = 'download-button';   
    this._container.prepend(downloadButton);
    downloadButton.addEventListener('click', (event) => {
          var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{Worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) {
              const regex = /style="([^"]*)"/g;
              return s.replace(/{(\w+)}/g, function (m, p) {
                const cellHtml = c[p];
                const cellHtmlWithStyle = cellHtml.replace(regex, function (m, p1) {
                  return 'style="' + p1 + '"';
                });
                return cellHtmlWithStyle;
              });
            };
         // Create a new style element and set the default styles
        var table = document.querySelector('table');  
          table.style.border = '1px solid black';
          table.style.fontSize = '11px';
        var rows = table.rows;
        for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;
        for (var j = 0; j < cells.length; j++) {
          var cell = cells[j];
              
         }
        }

        
          const XLSX = document.createElement('script');
          XLSX.src = 'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js';
          document.head.appendChild(XLSX);
          //table.prepend("<tr class='table-header'><th class='table-header' rowspan='1' colspan='3' style='background-color:none !important;font-family:Verdana;font-size:10px;align-items: center;text-align: left;padding: 5px;'>* All values reported are in millions </th></tr>");
          //var ctx = { Worksheet: '26', table: table.innerHTML }
          var ctx = { Worksheet: '26', table: "<tr class='table-header'><th class='table-header' rowspan='1' colspan='"+(k+2)+"' style='align-items: left;text-align: left; height: 40px;border: 1px solid black;background-color: #eee;font-family: Verdana;'><b>C 26.00 - Large Exposures limits (LE Limits)</b></th></tr><tr class='table-header'><th class='table-header' rowspan='1' colspan='3' style='background-color:none !important;font-family:Verdana;font-size:10px;align-items: center;text-align: left;padding: 5px;color:grey;font-weight:normal;'>* All values reported are in millions </th></tr><div style='font-family:verdana;font-size:11pt !important'>"+table.innerHTML+"</div>"}
          var xl = format(template, ctx);
          const downloadUrl = uri + base64(xl);
          console.log(table.innerHTML); // Prints the download URL to the console
          //sleep(1000);
          //window.open(downloadUrl);
          window.open(downloadUrl, "_blank");
          //setTimeout(window.open(downloadUrl, 'Download'),1000);
        });
      },

  // Render in response to the data or settings changing
  updateAsync: function (data, element, config, queryResponse, details, done) {
    console.log(config);
    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({ title: "No Dimensions", message: "This chart requires dimensions." });
      return;
    }

    /* Code to generate table
     * In keeping with the spirit of this little visualization plugin,
     * it's done in a quick and dirty way: piece together HTML strings.
     */
    var generatedHTML = `
      <style>
        .table {
          font-size: ${config.font_size}px;
          border: 1px solid black;
          border-collapse: collapse;
          margin:auto;
        }
        .table-header {
          background-color: #eee;
          border: 1px solid black;
          border-collapse: collapse;
          font-weight: normal;
          font-family: 'Verdana';
          font-size: 11px;
          align-items: center;
          text-align: center;
          margin: auto;
          width: 90px;
          background-clip: padding-box;
        }
        .table-cell {
          padding: 5px;
          border-bottom: 1px solid #ccc;
          border: 1px solid black;
          border-collapse: collapse;
          font-weight: normal;
          font-family: 'Verdana';
          font-size: 11px;
          align-items: center;
          text-align: center;
          margin: auto;
          width: 90px;
        }
        .table-row {
          border: 1px solid black;
          border-collapse: collapse;
        }
        .text-cell {
            mso-number-format: \@;
          }
  </style>
  `;
    var k = 0;
    for (column_type of ["dimension_like", "measure_like", "table_calculations"]) {
      for (field of queryResponse.fields[column_type]) {
        for (row of data) {
          k++;
        }
        break
      }
    }
    
    console.log('hello.' + k);
      if(k==1){
      generatedHTML += "<p style='font-family:Verdana;align: center;text-align: left;margin-right: auto;margin-left: auto; width:500px;font-weight:bold;font-size:14px;align-items:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 26.00 - Large Exposures limits (LE Limits)</p>";
      generatedHTML += "<p style='font-family:Verdana;font-size:10px;align-items: center;margin-left: 55%;text-align: left;padding: 5px;'>* All values reported are in millions </p>";
      }
      else if(k==2){ 
      generatedHTML += "<p style='font-family:Verdana;align: center;text-align: left;margin-right: auto;margin-left: auto; width:600px;font-weight:bold;font-size:14px;align-items:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 26.00 - Large Exposures limits (LE Limits)</p>";
      generatedHTML += "<p style='font-family:Verdana;font-size:10px;align-items: center;margin-left:60%;text-align: left;padding: 5px;'>* All values reported are in millions </p>";
      }
      else if(k==3){
      generatedHTML += "<p style='font-family:Verdana;align: center;text-align: left;margin-right: auto;margin-left: auto; width:700px;font-weight:bold;font-size:14px;align-items:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 26.00 - Large Exposures limits (LE Limits)</p>";
      generatedHTML += "<p style='font-family:Verdana;font-size:10px;align-items: center;margin-left: 65%;text-align: left;padding: 5px;'>* All values reported are in millions </p>";
      }
      else{ 
      generatedHTML += "<p style='font-family:Verdana;align: center;text-align: left;margin:auto;font-weight:bold;font-size:14px;align-items:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 26.00 - Large Exposures limits (LE Limits)</p>";
      generatedHTML += "<p style='font-family:Verdana;font-size:10px;align-items: center;margin-right: 2%;text-align: right;padding: 5px;'>* All values reported are in millions </p>";
      }
    generatedHTML += `<table class='table'>`;
    generatedHTML += "<tr class='table-header'>";
    generatedHTML += `<th class='table-header' rowspan='2' colspan='2' style='border: 1px solid black;background-color: #eee;color: #eee'></th>`;
    generatedHTML += `<th class='table-header' rowspan='1' colspan='${k}' style='height: 40px;border: 1px solid black;background-color: #eee;font-family: Verdana;'><b>Applicable<br>limit</br></b></th>`;
    generatedHTML += "</tr>";

    generatedHTML += "<tr class='table-header'>";
    generatedHTML += `<th class='table-header text-cell' colspan='${k}' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;mso-number-format: "\ \@";'> 010 </th>`;
    generatedHTML += "</tr>";

    const header = ['Non institutions', 'Institutions', 'Institutions in %', 'Globally Systemic Important Institutions (G-SIIs)'];

    // Loop through the different types of column types looker exposes
    let i = 0;
    const header1 = ['010', '020', '030', '040'];
    for (column_type of ["dimension_like", "measure_like", "table_calculations"]) {

      // Look through each field (i.e. row of data)
      for (field of queryResponse.fields[column_type]) {
        // First column is the label
        generatedHTML += `<tr><th class='table-header' style='border: 1px solid black;width:60px;background-color: #eee; padding: 5px;font-family: Verdana;font-weight: normal;mso-number-format: "\ \@";'>${header1[i]}</th>`;
        generatedHTML += `<th class='table-header' style='text-align: left; padding: 5px;width:350px;border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;'>${header[i]}</th>`;
        // Next columns are the data
        for (row of data) {
          generatedHTML += `<td class='table-cell' style='border: 1px solid black;'>${LookerCharts.Utils.htmlForCell(row[field.name])}</td>`
        }
        generatedHTML += '</tr>';
        i++;
      }
    }
    generatedHTML += "</table>";
    this._container.innerHTML = generatedHTML;
    console.log('abc' + k);
    this.addDownloadButtonListener(k);

    done();
  }

});
