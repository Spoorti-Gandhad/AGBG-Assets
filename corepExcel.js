<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>HTML table Export</title>  
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="../lib/js-xlsx/xlsx.core.min.js"></script>
    <script type="text/javascript" src="../lib/FileSaver/FileSaver.min.js"></script> 
    <script type="text/javascript" src="../lib/html2canvas/html2canvas.min.js"></script>
    <script type="text/javascript" src="../tableExport.js"></script>
    <script type="text/javaScript">         
        var sFileName = 'ngophi';
        function ExportXLSX(){
            $('#Event').tableExport({fileName: sFileName,
                        type: 'xlsx'
                       });
        }
    </script>
 <style type="text/css">
     body {
        font-size: 12pt;
        font-family: Calibri;
        padding : 10px;
    }
    table {
        border: 1px solid black;
    }
    th {
        border: 1px solid black;
        padding: 5px;
        background-color:grey;
        color: white;
    }
    td {
        border: 1px solid black;
        padding: 5px;
    }
    input {
        font-size: 12pt;
        font-family: Calibri;
    }
 </style>
</head>
<body>  
<a href="#" onClick="ExportXLSX();">DownloadXLSX</a> 
<br/>
<br/>
<div id="Event">
    <table>
        <tr>
            <th>Column One</th>
            <th>Column Two</th>
            <th>Column Three</th>
        </tr>
        <tr>
            <td>row1 Col1</td>
            <td>row1 Col2</td>
            <td>row1 Col3</td>
        </tr>
        <tr>
            <td>row2 Col1</td>
            <td>row2 Col2</td>
            <td>row2 Col3</td>
        </tr>
        <tr>
            <td>row3 Col1</td>
            <td>row3 Col2</td>
            <td><a href="http://www.jquery2dotnet.com/">http://www.jquery2dotnet.com/</a>
            </td>
        </tr>
    </table>
</div>
</body>
</html>
