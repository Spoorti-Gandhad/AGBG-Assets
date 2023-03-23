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
		//console.log(config);
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
			}
			.table-cell {
			  padding: 5px;
			  border-bottom: 1px solid #ccc;
			  border: 1px solid black;
			  border-collapse: collapse;
			  font-family: 'Verdana';
			  font-size: 11px;
			  align-items: center;
			  text-align: center;
			  margin: auto;
			  width: 90px;
			}
		  </style>
		`;
		// Create a container element to let us center the text.
		this._container = element.appendChild(document.createElement("div"));

	  },
	  // Render in response to the data or settings changing
	  updateAsync: function (data, element, config, queryResponse, details, done) {
		//console.log(config);
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
		  }
		  .table-cell {
			padding: 5px;
			border-bottom: 1px solid #ccc;
			border: 1px solid black;
			border-collapse: collapse;
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
	</style>
	`;

		generatedHTML += "<p style='font-family:Verdana;align: center;text-align: left;margin:auto;font-weight:bold;font-size:14px;align-items:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 26.00 - Large Exposures limits (LE Limits)</p>";
		generatedHTML += "<p style='font-family:Verdana;font-size:10px;align-items: center;margin-right: 2%;text-align: right;padding: 5px;'>* All values reported are in millions </p>";
		generatedHTML += "<table class='table'>";
		generatedHTML += "<tr class='table-header'>";
		generatedHTML += `<th class='table-header' rowspan='2' colspan='2' > </th>`;
		generatedHTML += `<th class='table-header' rowspan='1' colspan='9' style='height: 40px;'><b>Applicable<br>limit</br></b></th>`;
		generatedHTML += "</tr>";

		generatedHTML += "<tr class='table-header'>";
		generatedHTML += `<th class='table-header' colspan='9' style='font-size: 10px;'> 010 </th>`;
		generatedHTML += "</tr>";

		const header = ['Non institutions', 'Institutions', 'Institutions in %', 'Globally Systemic Important Institutions (G-SIIs)'];

		// Loop through the different types of column types looker exposes
		let i = 0,k=0;
		const header1=['010','020','030','040'];
		var data26 = [];
		var data27 = [];
		for (column_type of ["dimension_like", "measure_like", "table_calculations"]) {
			
		  // Look through each field (i.e. row of data)
		  for(subdata of data){
			for(let key in subdata){
				var keyValue = key.split(".")[1];
				for(let i in subdata[key]){	
					
					if(keyValue != null && subdata[key][i] != -1){
						if(keyValue==="r010" || keyValue==="r020" || keyValue==="r030" || keyValue==="r040_26"){
							data26.push(subdata);
							console.log("subdata[key]---26------- : "+subdata[key][i]);
							break;
						}else if(keyValue==="r011" || keyValue==="r015" || keyValue==="r021" || keyValue==="r035" || keyValue==="r040" || keyValue==="r050" || keyValue==="r060" || keyValue==="r070"){
							data27.push(subdata);
							console.log("subdata[key]-----27----- : "+subdata[key][i]);
							break;
						}
					}
					break;
				}
				break;
			}
		  }
		  
		  for (field of queryResponse.fields[column_type]) {
			// First column is the label
			generatedHTML += `<tr><th class='table-header'>${header1[i]}</th>`;
			generatedHTML += `<th class='table-header' style='text-align: left; padding: 5px;width:280px'>${header[i]}</th>`;
			
			// Next columns are the data
			for (row of data26) {
			  console.log("row : -----26----- "+row[field.name]);
			  if(row[field.name]!== null ){
				  generatedHTML += `<td class='table-cell'>${LookerCharts.Utils.htmlForCell(row[field.name])}</td>`
			  }
			}
			generatedHTML += '</tr>';
			i++;
			if(i===4){
			break;
			}
		  }
		}
		generatedHTML += "</table>";

		 var generatedHTML27 = `
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
		  }
		  .table-cell {
			padding: 5px;
			border-bottom: 1px solid #ccc;
			border: 1px solid black;
			border-collapse: collapse;
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
	</style>
	`;
		generatedHTML27 += "<p></p>";
		generatedHTML27 += "<p></p>";
		generatedHTML27 += "<p></p>";
		generatedHTML27 += "<p></p>";
		generatedHTML27 += "<p style='font-family:Verdana;margin:auto;font-weight:bold;font-size:14px;align-items:center;text-align:left;border:1px solid black;padding: 5px;background-color: #eee;'>C 27.00 - Identification of the counterparty (LE 1)</p>";
		generatedHTML27 += "<p style='font-family:Verdana;font-size:10px;align-items: center;text-align: right;padding: 5px;'>* All values reported are in millions </p>";
		generatedHTML27 += "<table class='table'>";
		generatedHTML27 += "<thead class='thead'>";
		generatedHTML27 += "<tr class='table-header'>";
		generatedHTML27 += "<th class='table-header' colspan='8' style='font-weight: bold;height:19px;border: 1px solid black;background-color: #eee;font-family: Verdana;width: -webkit-fill-available; position: absolute;'>COUNTERPARTY IDENTIFICATION</th>";
		generatedHTML27 += "</tr>";
		generatedHTML27 += "<tr class='table-header'>";
		generatedHTML27 += "<th class='table-header' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;height:100px;'>Code</th>";
		generatedHTML27 += "<th class='table-header' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;height:100px;'>Type of Code</th>";
		generatedHTML27 += "<th class='table-header' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;height:100px;'>Name</th>";
		generatedHTML27 += "<th class='table-header' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;height:100px;'>National Code</th>";
		generatedHTML27 += "<th class='table-header' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;height:100px;'>Residence of the Counterparty</th>";
		generatedHTML27 += "<th class='table-header' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;height:100px;'>Sector of the Counterparty</th>";
		generatedHTML27 += "<th class='table-header' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;height:100px;'>NACE Code</th>";
		generatedHTML27 += "<th class='table-header' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;height:100px;'>Type of Counterparty</th>";
		generatedHTML27 += "</tr>";
		const header3=['011','015','021','035','040','050','060','070'];
		// First row is the header
		generatedHTML27 += "<tr class='table-header'>";
		
		let j=0,l=4;
		for (let j=0;j<8;j++) {
		  generatedHTML27 += `<th class='table-header' style='border: 1px solid black;background-color: #eee;font-family: Verdana;font-weight: normal;mso-number-format: "\ \@";'>${header3[j]}</th>`;
		}
		generatedHTML27 += "</tr>";
		generatedHTML27 += "</thead>";

	   
		
		for (row of data27) {
		  console.log("row : ----27------ "+row[field.name]);
		  generatedHTML27 += "<tr class='table-row'>";
		  for (field of queryResponse.fields.dimensions.concat(queryResponse.fields.measures)) {
			generatedHTML27 += `<td class='table-cell' style='border: 1px solid black;'>${LookerCharts.Utils.htmlForCell(row[field.name])}</td>`;
		  }
		  generatedHTML27 += "</tr>";
		} 
	 
		 
		generatedHTML27 += "</table>"; 
		this._container.innerHTML = generatedHTML+generatedHTML27;
		done();
	  }
	});
