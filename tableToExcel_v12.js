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
  addDownloadButtonListener: function () {
    const downloadButton = this._container.appendChild(document.createElement('button'));
    downloadButton.innerHTML = 'Download as Excel';
    downloadButton.className = 'download-button';    
    downloadButton.addEventListener('click', (event) => {
      var uri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
       // , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
         , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        //, base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
          }
        //, format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };
          ,format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
              return c[p];
            })
          }
      var toExcel = document.querySelector('table').innerHTML;
      var ctx = {
        worksheet: name || '',
        table: toExcel
      };
      var link = document.createElement("a");
      link.download = "export.xlsx";
      link.href = uri + base64(format(template, ctx));
      window.open(link.href);
      link.click();
      
      const { Storage } = require('@google-cloud/storage');
      const path = require('path');

      // Create a new instance of the storage client
      const storage = new Storage({
        projectId: 'acn-gcp-fsi',
        keyFilename: 'https://storage.cloud.google.com/acn-gcp-fsi/env/download.xls'
      });

      // Set the name of the bucket you want to upload to
      const bucketName = 'acn-gcp-fsi';

      // Set the path of the Excel file you want to upload
      const filePath = 'data:application/vnd.ms-excel;base64,PGh0bWwgeG1sbnM6bz0idXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTpvZmZpY2U6b2ZmaWNlIiB4bWxuczp4PSJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOm9mZmljZTpleGNlbCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1JFQy1odG1sNDAiPjxoZWFkPjwhLS1baWYgZ3RlIG1zbyA5XT48eG1sPjx4OkV4Y2VsV29ya2Jvb2s+PHg6RXhjZWxXb3Jrc2hlZXRzPjx4OkV4Y2VsV29ya3NoZWV0Pjx4Ok5hbWU+PC94Ok5hbWU+PHg6V29ya3NoZWV0T3B0aW9ucz48eDpEaXNwbGF5R3JpZGxpbmVzLz48L3g6V29ya3NoZWV0T3B0aW9ucz48L3g6RXhjZWxXb3Jrc2hlZXQ+PC94OkV4Y2VsV29ya3NoZWV0cz48L3g6RXhjZWxXb3JrYm9vaz48L3htbD48IVtlbmRpZl0tLT48L2hlYWQ+PGJvZHk+PHRhYmxlPjx0Ym9keT48dHIgY2xhc3M9InRhYmxlLWhlYWRlciI+PHRoIGNsYXNzPSJ0YWJsZS1oZWFkZXIiIHJvd3NwYW49IjIiIGNvbHNwYW49IjIiPiA8L3RoPjx0aCBjbGFzcz0idGFibGUtaGVhZGVyIiByb3dzcGFuPSIxIiBjb2xzcGFuPSIxIiBzdHlsZT0iaGVpZ2h0OiA0MHB4OyI+PGI+QXBwbGljYWJsZTxicj5saW1pdDxicj48L2I+PC90aD48L3RyPjx0ciBjbGFzcz0idGFibGUtaGVhZGVyIj48dGggY2xhc3M9InRhYmxlLWhlYWRlciB0ZXh0LWNlbGwiIGNvbHNwYW49IjEiIHN0eWxlPSJmb250LXNpemU6IDEwcHg7Ij4gMDEwIDwvdGg+PC90cj48dHI+PHRoIGNsYXNzPSJ0YWJsZS1oZWFkZXIiPjAxMDwvdGg+PHRoIGNsYXNzPSJ0YWJsZS1oZWFkZXIiIHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0OyBwYWRkaW5nOiA1cHg7d2lkdGg6MjgwcHgiPk5vbiBpbnN0aXR1dGlvbnM8L3RoPjx0ZCBjbGFzcz0idGFibGUtY2VsbCI+PHNwYW4gY2xhc3M9ImRyaWxsYWJsZS1pdGVtIiBkYXRhLWxpbmtzPSIiIGRhdGEtY29udGV4dD0iIiBkYXRhLWFkZC1maWx0ZXItanNvbj0iIj48c3BhbiBjbGFzcz0iZHJpbGxhYmxlLWl0ZW0tY29udGVudCI+NjAwLDAwMCwwMDA8L3NwYW4+PC9zcGFuPjwvdGQ+PC90cj48dHI+PHRoIGNsYXNzPSJ0YWJsZS1oZWFkZXIiPjAyMDwvdGg+PHRoIGNsYXNzPSJ0YWJsZS1oZWFkZXIiIHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0OyBwYWRkaW5nOiA1cHg7d2lkdGg6MjgwcHgiPkluc3RpdHV0aW9uczwvdGg+PHRkIGNsYXNzPSJ0YWJsZS1jZWxsIj48c3BhbiBjbGFzcz0iZHJpbGxhYmxlLWl0ZW0iIGRhdGEtbGlua3M9IiIgZGF0YS1jb250ZXh0PSIiIGRhdGEtYWRkLWZpbHRlci1qc29uPSIiPjxzcGFuIGNsYXNzPSJkcmlsbGFibGUtaXRlbS1jb250ZW50Ij42MDAsMDAwLDAwMDwvc3Bhbj48L3NwYW4+PC90ZD48L3RyPjx0cj48dGggY2xhc3M9InRhYmxlLWhlYWRlciI+MDMwPC90aD48dGggY2xhc3M9InRhYmxlLWhlYWRlciIgc3R5bGU9InRleHQtYWxpZ246IGxlZnQ7IHBhZGRpbmc6IDVweDt3aWR0aDoyODBweCI+SW5zdGl0dXRpb25zIGluICU8L3RoPjx0ZCBjbGFzcz0idGFibGUtY2VsbCI+PHNwYW4gY2xhc3M9ImRyaWxsYWJsZS1pdGVtIiBkYXRhLWxpbmtzPSIiIGRhdGEtY29udGV4dD0iIiBkYXRhLWFkZC1maWx0ZXItanNvbj0iIj48c3BhbiBjbGFzcz0iZHJpbGxhYmxlLWl0ZW0tY29udGVudCI+MjUlPC9zcGFuPjwvc3Bhbj48L3RkPjwvdHI+PHRyPjx0aCBjbGFzcz0idGFibGUtaGVhZGVyIj4wNDA8L3RoPjx0aCBjbGFzcz0idGFibGUtaGVhZGVyIiBzdHlsZT0idGV4dC1hbGlnbjogbGVmdDsgcGFkZGluZzogNXB4O3dpZHRoOjI4MHB4Ij5HbG9iYWxseSBTeXN0ZW1pYyBJbXBvcnRhbnQgSW5zdGl0dXRpb25zIChHLVNJSXMpPC90aD48dGQgY2xhc3M9InRhYmxlLWNlbGwiPjxzcGFuIGNsYXNzPSJkcmlsbGFibGUtaXRlbSIgZGF0YS1saW5rcz0iIiBkYXRhLWNvbnRleHQ9IiIgZGF0YS1hZGQtZmlsdGVyLWpzb249IiI+PHNwYW4gY2xhc3M9ImRyaWxsYWJsZS1pdGVtLWNvbnRlbnQiPjM2MCwwMDAsMDAwPC9zcGFuPjwvc3Bhbj48L3RkPjwvdHI+PC90Ym9keT48L3RhYmxlPjwvYm9keT48L2h0bWw+';

      // Upload the file to the specified bucket
      async function uploadFile() {
        const bucket = storage.bucket(bucketName);
        const fileName = path.basename(filePath);
        const file = bucket.file(fileName);

        await file.save(filePath);

        console.log(`File ${fileName} uploaded to ${bucketName}.`);
      }

      uploadFile();

      /*var table = document.querySelector('table');
      table.style.border = '1px solid black';
      table.style.fontSize = '11px';
      var rows = table.rows;
      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;
        for (var j = 0; j < cells.length; j++) {
          var cell = cells[j];
          var backgroundColor = window.getComputedStyle(cell).backgroundColor;
          var fontWeight = window.getComputedStyle(cell).fontWeight;
          var fontFamily = window.getComputedStyle(cell).fontFamily;
          var fontSize = window.getComputedStyle(cell).fontSize;
          var style = 'background-color:' + backgroundColor + ';' +
            'border: 1px solid black;' +
            'font-weight:' + fontWeight + ';' +
            'font-size: 11pt;' +
            'font-family:' + fontFamily + ';' +
            'mso-number-format: "\ \@";' ;
          cell.setAttribute('style', style);
        }
      }
      const scr = document.createElement('script');
      scr.src = 'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js';
      //scr.src = "https://unpkg.com/xlsx@0.15.1/dist/xlsx.full.min.js";
      document.head.appendChild(scr);
      var ctx = { Worksheet: '26', table: table.innerHTML }
      var xl = format(template, ctx);
      const downloadUrl = uri + base64(xl);
      console.log(downloadUrl); // Prints the download URL to the console
      window.open(downloadUrl);
      //sleep(1000);
      //window.open(downloadUrl);
      //window.open(downloadUrl, "_blank");
       //var link = document.createElement("a");
       //link.download = 'sheet.xls';
       //link.href = downloadUrl;
       //document.body.appendChild(link);
       //link.click();
       //document.body.removeChild(link);
       //delete link;*/
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
    generatedHTML += `<table class='table'>`;
    generatedHTML += "<tr class='table-header'>";
    generatedHTML += `<th class='table-header' rowspan='2' colspan='2' > </th>`;
    generatedHTML += `<th class='table-header' rowspan='1' colspan='${k}' style='height: 40px;'><b>Applicable<br>limit</br></b></th>`;
    generatedHTML += "</tr>";

    generatedHTML += "<tr class='table-header'>";
    generatedHTML += `<th class='table-header text-cell' colspan='${k}' style='font-size: 10px;'> 010 </th>`;
    generatedHTML += "</tr>";

    const header = ['Non institutions', 'Institutions', 'Institutions in %', 'Globally Systemic Important Institutions (G-SIIs)'];

    // Loop through the different types of column types looker exposes
    let i = 0;
    const header1 = ['010', '020', '030', '040'];
    for (column_type of ["dimension_like", "measure_like", "table_calculations"]) {

      // Look through each field (i.e. row of data)
      for (field of queryResponse.fields[column_type]) {
        // First column is the label
        generatedHTML += `<tr><th class='table-header'>${header1[i]}</th>`;
        generatedHTML += `<th class='table-header' style='text-align: left; padding: 5px;width:280px'>${header[i]}</th>`;
        // Next columns are the data
        for (row of data) {
          generatedHTML += `<td class='table-cell'>${LookerCharts.Utils.htmlForCell(row[field.name])}</td>`
        }
        generatedHTML += '</tr>';
        i++;
      }
    }
    generatedHTML += "</table>";
    this._container.innerHTML = generatedHTML;
    this.addDownloadButtonListener();

    done();
  }

});
