import React from 'react'
import { useTable, useSortBy } from 'react-table'
import { useExportData } from 'react-table-plugins'
import Papa from 'papaparse'
import XLSX from 'xlsx'
import JsPDF from "jspdf";
import "jspdf-autotable";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { postLog } from '../store/action'

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

const defaultColumn = {
  Filter: DefaultColumnFilter,
};

function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === 'csv') {
    const headerNames = columns.map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  } else if (fileType === "xlsx") { 
    const header = columns.map((c) => c.exportValue);
    const compatibleData = data.map((row) => {
      const obj = {};
      header.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });
    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      header,
    });
    XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);

    // Returning false as downloading of file is already taken care of
    return false;
  }
  
  if (fileType === "pdf") {
    const headerNames = columns.map((column) => column.exportValue);
    const doc = new JsPDF();
    doc.autoTable({
      head: [headerNames],
      body: data,
      margin: { top: 20 },
      styles: {
        minCellHeight: 9,
        halign: "left",
        valign: "center",
        fontSize: 11,
      },
    });
    doc.save(`${fileName}.pdf`);

    return false;
  }
}

export default function TableComponents ({columns, data}) {
  const history = useHistory()
  const dispatch = useDispatch()
  const periode = useSelector(state => state.periode)

  function inputLog(fileType) {
    let obj = {}
    if (history.location.pathname === '/data') {
      obj = {Log: `export Processed periode ${periode}.${fileType}`}
    } else {
      obj = {Log: `export Log.${fileType}`}
    }
    dispatch(postLog(obj))
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    exportData
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      getExportFileBlob,
    },
    useSortBy,
    useExportData
  )
  return (
      <div>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 5, marginBottom: 5}}>
          <button className="btn btn-outline-primary"
            onClick={() => {
              exportData("csv", true);
              inputLog("csv")
            }}
          >Export All as CSV
          </button>
          <button className="btn btn-outline-primary" style={{marginLeft: 5}}
            onClick={() => {
              exportData("xlsx", true);
              inputLog("xlsx")
            }}
          >Export All as xlsx
          </button>
          <button className="btn btn-outline-primary" style={{marginLeft: 5}}
            onClick={() => {
              exportData("pdf", true);
              inputLog("pdf")
            }}
          >
            Export All as PDF
          </button>
        </div>

      <table {...getTableProps()} className='table text-center tabler-bordered'>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className='table table-dark table-bordered text-center'>
            {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                 {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
    </div>
  )
}