import React from 'react';
import './device.css';
import D3Chart from './d3Chart';
import { ExportToCsv } from 'export-to-csv';

function getCSV(data) {
    
    const options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Device data',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };
     
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
}


export default function Device(device, graphData) {
    const status = graphData[device['deviceid']]['currentStatusAndTime']['status'];
    const data = graphData[device['deviceid']]['records'];
    return(
        <div className="device-holder" key={device['deviceid']}>
            <b>Device Id:&nbsp;</b> {device['deviceid']}<br />
            <b>Status:&nbsp;</b>
            <span className={status}>
                {status}
            </span>
            <D3Chart data={data}/>
            <br />
            <button type="button" className="form-submit" onClick={ (e) => getCSV(data) }>Dump</button><br />
            <hr />
        </div>
    );
}

