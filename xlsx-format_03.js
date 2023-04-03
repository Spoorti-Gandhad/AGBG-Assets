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
              font-family: 'verdana';
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
              font-family: 'verdana';
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
      // const meta = document.createElement('meta');
      // meta.httpEquiv = 'Content-Security-Policy';
      // meta.content = 'sandbox allow-downloads';
      // document.head.appendChild(meta);
    },
  
    addDownloadButtonListener: function (k) {
      const cssBoot = document.createElement('link');
      cssBoot.rel = "stylesheet";
      cssBoot.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css";
      // cssBoot.integrity = "sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD";
      cssBoot.crossorigin = "anonymous";
      document.head.appendChild(cssBoot);
      
      const sheeetjs = document.createElement('script');
      sheeetjs.lang = "javascript";
      // sheeetjs.src = "https://cdn.sheetjs.com/xlsx-0.19.2/package/dist/xlsx.full.min.js";
      sheeetjs.src = "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js";
      document.head.appendChild(sheeetjs);
  
      // const fileSaver = document.createElement('script');
      // fileSaver.src = "https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js";
      // document.head.appendChild(fileSaver);
  
      const xlsxstyle = document.createElement('script');
      xlsxstyle.src = "https://cdn.jsdelivr.net/npm/xlsx-style@0.8.13/dist/xlsx.full.min.js";
      document.head.appendChild(xlsxstyle);
  
      const xlsxjsstyle = document.createElement('script');
      // xlsxjsstyle.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.min.js";
      xlsxjsstyle.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
      document.head.appendChild(xlsxjsstyle);
  
      // const requirelink = document.createElement('script');
      // requirelink.src = "https://requirejs.org/docs/release/2.3.5/minified/require.js";
      // document.head.appendChild(requirelink);
      // const XLSX = require('sheetjs-style');
  
  
      const downloadButton = document.createElement('img');
      downloadButton.src = "https://cdn.jsdelivr.net/gh/Spoorti-Gandhad/AGBG-Assets@main/downloadAsExcel.jfif";
      downloadButton.setAttribute('height', '25px');
      downloadButton.setAttribute('width', '25px');
      downloadButton.setAttribute('title', 'Download As Excel'); 
      downloadButton.style.marginLeft='90%';
      // downloadButton.type = "button";
      // downloadButton.id = "download_button";
      // downloadButton.title = "Export as Excel";
      this._container.prepend(downloadButton);
      downloadButton.addEventListener('click', () => { 
  
        var htmlTable = document.querySelector('table');
          
        // htmlTable.style.border = '1px solid black';
        // htmlTable.style.fontSize = '11px';
        var rows = htmlTable.rows;
        // rows[0].innerHTML =  "<tr class='table-header'><th class='table-header' rowspan='1' colspan='"+(k+2)+"' style='align-items: left;text-align: left; height: 40px;border: 1px solid black;background-color: #eee;font-family: verdana;'><b>C 26.00 - Large Exposures limits (LE Limits)</b></th></tr>";
        // rows[1].innerHTML =  "<tr class='table-header'><th class='table-header' rowspan='1' colspan='3' style='background-color:none !important;font-family:verdana;font-size:10px;align-items: center;text-align: left;padding: 5px;color:grey;font-weight:normal;'>* All values reported are in millions </th></tr>";
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].cells;
            // var r = i;
            for (var j = 0; j < cells.length; j++) {
                var cell = cells[j];
                // if(r == 0){
                //   cell[r].style.fontFamily = "Verdana";
                //   cell[r].style.fontSize = 11;
                //   cell[r].style.fontWeight = "bold";
                // }
                // else{
                //   cell[r].style.fontFamily = "Verdana";
                //   cell[r].style.fontSize = 11;
                // }
            }
        }
  
        //   var htmlTable = document.querySelectorAll("table").forEach(table => {
        //     let tr = table.getElementsByTagName("tr")[0];
        //   let tds = tr.getElementsByTagName("td");
        //   let selectorStr ="tbody tr:nth-child(1)"
        
        //   let maxRowspan = 1;
        
        //   for (let i = 0; i < tds.length; i++) {
        //     if(maxRowspan < tds[i].rowSpan)
        //     {
        //         maxRowspan = tds[i].rowSpan
        //       selectorStr += " , tbody tr:nth-child(" + maxRowspan + ")"
        //     }
        //   }
        
        //   var nodes = table.querySelectorAll(selectorStr)
        
        //   for (let i = 0; i < nodes.length; i++) {
        //     nodes[i].style.background = "#1DA600";
        //   }
        // });
  
          var type = "xlsx";
          // var ctx = { Worksheet: 'C26', table: htmlTable.in };
          // var ctx = { Worksheet: 'C26', table: "<tr class='table-header'><th class='table-header' rowspan='1' colspan='100' style='align-items: left;text-align: left; height: 40px;border: 1px solid black;background-color: #eee;font-family: Verdana;'><b>C 29.00 - Detail of the exposures to individual clients within groups of connected clients (LE 3)</b></th></tr><tr class='table-header'><th class='table-header' rowspan='1' colspan='3' style='background-color:none !important;font-family:Verdana;font-size:10px;align-items: center;text-align: right;padding: 5px;color:grey;font-weight:normal;'>* All values reported are in millions </th></tr>" + htmlTable.innerHTML };
          var tableData =  "<tr class='table-header'>
                        <th class='table-header' rowspan='1' colspan='"+(k+2)+"' style='align-items: left;text-align: left; height: 40px;border: 1px solid black;background-color: #eee;font-family: verdana;'>
                            <b>C 26.00 - Large Exposures limits (LE Limits)</b></th></tr>
                        <tr class='table-header'><th class='table-header' rowspan='1' colspan='3' style='background-color:none !important;font-family:verdana;font-size:10px;align-items: center;text-align: left;padding: 5px;color:grey;font-weight:normal;'>* All values reported are in millions </th>
                        </tr>"+htmlTable;
          // var telement = document.createElement('div');
          // telement.innerHTML = htmlTable;
          // document.body.appendChild(telement);
          // var header = document.createElement('span');
          // header.style.fontWeight = "bold";
          // header.style.fontFamily = "verdana";
          // header.style.fontSize = "14pt";
          // document.getElementsByName(header).innerHTML += "C 26.00 - Large Exposures limits (LE Limits)";
          // header = [["C 26.00 - Large Exposures limits (LE Limits)"]];
          // header[0].style.font = "bold 14pt verdana";
          // document.write("<span style='font-family:verdana; text-align: left; font-weight:bold; font-size:14px; align-items:left; border:1px solid black; background-color: #eee;'>"+header+"</span>");
          // var note = document.createElement('span');
          // note.style.fontWeight = "bold";
          // note.style.fontFamily = "Verdana", "Geneva", "sans-serif";
          // note.style.fontSize = "14pt";
          // document.getElementsByName(note).innerHTML += "* All values reported are in millions";
          // note = [["* All values reported are in millions"]];
          // var note = [["* All values reported are in millions"]];
          // document.write("<span style='font-family:serif; text-align: left; font-weight:normal; font-size:10px; align-items:left; border:1px solid black; background-color: #eee;'>"+note+"</span>");
          // note[0].style.font = "10pt serif";
          const header = [
            {v: "C 26.00 - Large Exposures limits (LE Limits)", t: "s", s: {font: {name: "Calibri", sz: 16, bold: true}, fill: {bgColor: {rgb: "a9aaab"}}, border: {bottom: {style: "medium"}}}}
          ];
          const note = [
            {v: "* All values reported are in millions", t: "s", s: {font: {name: "Calibri", sz: 10}}}
          ];
          // var tabledata = [
          //   {v: data, t: "s", s: {font: {name: "Verdana", sz: 11}}}
          // ];
          var wsheet = XLSX.utils.table_to_sheet(tableData, {origin: 'A4'});
          wsheet["!merges"] = [{s:{c:0, r:0}, e:{c:10, r:0}}, {s:{c:0, r:1}, e:{c:10, r:1}}, {s:{c:0, r:3}, e:{c:1, r:4}}, {s:{c:2, r:3}, e:{c:(k+1), r:3}}, {s:{c:2, r:4}, e:{c:(k+1), r:4}}];
          // var wsheet = XLSX.utils.aoa_to_sheet([tabledata], {origin: 'A3'});
          // const max_width = data.reduce((w, r) => Math.max(w, r.name.length), 10);
        //   XLSX.utils.aoa_to_sheet(wsheet, [header], {origin: 'A1'});
          //-------XLSX.utils.sheet_add_aoa(wsheet, [header], { origin: 'A1' });
          //-------XLSX.utils.sheet_add_aoa(wsheet, [note], { origin: 'A2' });
          // XLSX.utils.sheet_add_dom(wsheet, data, {origin: 'A4'});
          // document.body.removeChild(telement);
          var wbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wbook, wsheet, "C26");
          var wbexport = XLSX.write(wbook, {
              bookType: type,
              bookSST: true,
              type: 'binary',
              cellStyles: true
          }); 
  
          // var uri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
          // var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{Worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>';
          // var base64 = function (s) { return window.btoa(s) };
          // var format = function (s, c) {
          //   const regex = /style="([^"]*)"/g;
          //   return s.replace(/{(\w+)}/g, function (m, p) {
          //     const cellHtml = c[p];
          //     const cellHtmlWithStyle = cellHtml.replace(regex, function (m, p1) {
          //       return 'style="' + p1 + '"';
          //     });
          //     return cellHtmlWithStyle;
          //   });
          // };
  
          // const excelx = document.createElement('a');
          // // excelx.src = 'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js';
          // document.head.appendChild(excelx);
          // var ctx = { Worksheet: '28', table: wbexport.in };
          // var ctx = { Worksheet: '28', table: "<tr class='table-header'><th class='table-header' rowspan='1' colspan='100' style='align-items: left;text-align: left; height: 40px;border: 1px solid black;background-color: #eee;font-family: Verdana;'><b>C 29.00 - Detail of the exposures to individual clients within groups of connected clients (LE 3)</b></th></tr><tr class='table-header'><th class='table-header' rowspan='1' colspan='3' style='background-color:none !important;font-family:Verdana;font-size:10px;align-items: center;text-align: right;padding: 5px;color:grey;font-weight:normal;'>* All values reported are in millions </th></tr>" + wbexport.innerHTML };
           
          // var xl = format(template, ctx);
          // excelx.href = uri + btoa(xl);
          // // console.log(downloadUrl);
          // window.open(excelx, '_blank');
  
          var link = document.createElement("a"); 
          link.download = "target26.xlsx";
          link.href = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + btoa(wbexport);
          // link.click();
          window.open(link, '_blank');
        
      });
  },
  
    // addDownloadButtonListener: function (k) {
    //   console.log('xyz' + k);
    //   const downloadButton = document.createElement('img');
    //   downloadButton.src = "https://cdn.jsdelivr.net/gh/Spoorti-Gandhad/AGBG-Assets@main/downloadAsExcel.jfif";
    //   downloadButton.setAttribute('height', '25px');
    //   downloadButton.setAttribute('width', '25px');
    //   downloadButton.setAttribute('title', 'Download As Excel');
    //   downloadButton.style.marginLeft='90%';
    //   //downloadButton.className = 'download-button';   
    //   this._container.prepend(downloadButton);
    //   downloadButton.addEventListener('click', (event) => {
    //         var uri = 'data:application/vnd.ms-excel;base64,'
    //           , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{Worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
    //           , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    //           , format = function (s, c) {
    //             const regex = /style="([^"]*)"/g;
    //             return s.replace(/{(\w+)}/g, function (m, p) {
    //               const cellHtml = c[p];
    //               const cellHtmlWithStyle = cellHtml.replace(regex, function (m, p1) {
    //                 return 'style="' + p1 + '"';
    //               });
    //               return cellHtmlWithStyle;
    //             });
    //           };
    //        // Create a new style element and set the default styles
    //       var table = document.querySelector('table');  
    //         table.style.border = '1px solid black';
    //         table.style.fontSize = '11px';
    //       var rows = table.rows;
    //       for (var i = 0; i < rows.length; i++) {
    //       var cells = rows[i].cells;
    //       for (var j = 0; j < cells.length; j++) {
    //         var cell = cells[j];
                
    //        }
    //       }
  
          
    //         const XLSX = document.createElement('script');
    //         XLSX.src = 'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js';
    //         document.head.appendChild(XLSX);
    //         //table.prepend("<tr class='table-header'><th class='table-header' rowspan='1' colspan='3' style='background-color:none !important;font-family:verdana;font-size:10px;align-items: center;text-align: left;padding: 5px;'>* All values reported are in millions </th></tr>");
    //         //var ctx = { Worksheet: '26', table: table.innerHTML }
    //         var ctx = { Worksheet: '26', table: "<tr class='table-header'><th class='table-header' rowspan='1' colspan='"+(k+2)+"' style='align-items: left;text-align: left; height: 40px;border: 1px solid black;background-color: #eee;font-family: verdana;'><b>C 26.00 - Large Exposures limits (LE Limits)</b></th></tr><tr class='table-header'><th class='table-header' rowspan='1' colspan='3' style='background-color:none !important;font-family:verdana;font-size:10px;align-items: center;text-align: left;padding: 5px;color:grey;font-weight:normal;'>* All values reported are in millions </th></tr>"+table.innerHTML }
    //         var xl = format(template, ctx);
    //         const downloadUrl = uri + base64(xl);
    //         console.log(table.innerHTML); // Prints the download URL to the console
    //         //sleep(1000);
    //         //window.open(downloadUrl);
    //         window.open(downloadUrl, "_blank");
    //         //setTimeout(window.open(downloadUrl, 'Download'),1000);
    //       });
    //     },
  
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
            font-family: 'verdana';
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
            font-family: 'verdana';
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
        generatedHTML += "<p style='font-family:verdana;align: center;text-align: left;margin-right: auto;margin-left: auto; width:500px;font-weight:bold;font-size:14px;align-items:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 26.00 - Large Exposures limits (LE Limits)</p>";
        generatedHTML += "<p style='font-family:verdana;font-size:10px;align-items: center;margin-left: 55%;text-align: left;padding: 5px;'>* All values reported are in millions </p>";
        }
        else if(k==2){ 
        generatedHTML += "<p style='font-family:verdana;align: center;text-align: left;margin-right: auto;margin-left: auto; width:600px;font-weight:bold;font-size:14px;align-items:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 26.00 - Large Exposures limits (LE Limits)</p>";
        generatedHTML += "<p style='font-family:verdana;font-size:10px;align-items: center;margin-left:60%;text-align: left;padding: 5px;'>* All values reported are in millions </p>";
        }
        else if(k==3){
        generatedHTML += "<p style='font-family:verdana;align: center;text-align: left;margin-right: auto;margin-left: auto; width:700px;font-weight:bold;font-size:14px;align-items:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 26.00 - Large Exposures limits (LE Limits)</p>";
        generatedHTML += "<p style='font-family:verdana;font-size:10px;align-items: center;margin-left: 65%;text-align: left;padding: 5px;'>* All values reported are in millions </p>";
        }
        else{ 
        generatedHTML += "<p style='font-family:verdana;align: center;text-align: left;margin:auto;font-weight:bold;font-size:14px;align-items:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 26.00 - Large Exposures limits (LE Limits)</p>";
        generatedHTML += "<p style='font-family:verdana;font-size:10px;align-items: center;margin-right: 2%;text-align: right;padding: 5px;'>* All values reported are in millions </p>";
        }
      generatedHTML += `<table class='table'>`;
      generatedHTML += "<tr class='table-header'>";
      generatedHTML += `<th class='table-header' rowspan='2' colspan='2' style='border: 1px solid black;background-color: #eee;color: #eee'></th>`;
      generatedHTML += `<th class='table-header' rowspan='1' colspan='${k}' style='height: 40px;border: 1px solid black;background-color: #eee;font-family: verdana;'><b>Applicable<br>limit</br></b></th>`;
      generatedHTML += "</tr>";
  
      generatedHTML += "<tr class='table-header'>";
      generatedHTML += `<th class='table-header text-cell' colspan='${k}' style='border: 1px solid black;background-color: #eee;font-family: verdana;font-weight: normal;mso-number-format: "\ \@";'> 010 </th>`;
      generatedHTML += "</tr>";
  
      const header = ['Non institutions', 'Institutions', 'Institutions in %', 'Globally Systemic Important Institutionssss (G-SIIs)'];
  
      // Loop through the different types of column types looker exposes
      let i = 0;
      const header1 = ['010', '020', '030', '040'];
      for (column_type of ["dimension_like", "measure_like", "table_calculations"]) {
  
        // Look through each field (i.e. row of data)
        for (field of queryResponse.fields[column_type]) {
          // First column is the label
          generatedHTML += `<tr><th class='table-header' style='border: 1px solid black;width:60px;background-color: #eee; padding: 5px;font-family: verdana;font-weight: normal;mso-number-format: "\ \@";'>${header1[i]}</th>`;
          generatedHTML += `<th class='table-header' style='text-align: left; padding: 5px;width:350px;border: 1px solid black;background-color: #eee;font-family: verdana;font-weight: normal;'>${header[i]}</th>`;
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
