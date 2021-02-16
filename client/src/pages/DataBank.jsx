import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import TableComponents from '../components/TableComponents'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDataBank, setPeriode } from '../store/action'

function DataBank(){
  const dispatch =  useDispatch()
  const error = useSelector(state => state.error)
  const loading = useSelector(state => state.loading)
  const data = useSelector(state => state.dataBank)
  const filterData = useSelector(state => state.filterPeriode)
  const periode = useSelector(state => state.periode)

  useEffect(_ => {
    dispatch(fetchDataBank())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(error) return <h2>{error}</h2>
  if(loading) return <img src='https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg' alt='loadingImg' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>

  function filterChange(e) {
    dispatch(setPeriode(e.target.value))
  }

  let filterTable = data.filter(dataTable => {
    return dataTable.ProcessedDatum.BankDatum.periode == periode
  })

  const columns = [
    {
      Header: 'Sandi Kredit',
      accessor: 'ProcessedDatum.BankDatum.sandiBank'
    },
    {
      Header: 'Kredit',
      columns: [
        {
          Header: 'NPL',
          accessor: 'ProcessedDatum.NPL',
          Cell: (percentage) => {
            return <p>{percentage.cell.value}%</p>
          }
        }
      ]
    },
    {
      Header: 'Profitabilitas',
      columns: [
        {
          Header: 'ROE',
          accessor: 'ProcessedDatum.ROE',
          Cell: (percentage) => {
            return <p>{percentage.cell.value}%</p>
          }
        },
        {
          Header: 'ROA',
          accessor: 'ProcessedDatum.ROA',
          Cell: (percentage) => {
            return <p>{percentage.cell.value}%</p>
          }
        }
      ]
    },
    {
      Header: 'Likuiditas',
      columns: [
        {
          Header: 'LDR',
          accessor: 'ProcessedDatum.LDR',
          Cell: (percentage) => {
            return <p>{percentage.cell.value}%</p>
          }
        }
      ]
    },
    {
      Header: 'Effisiensi',
      columns: [
        {
          Header: 'BOPO',
          accessor: 'ProcessedDatum.BOPO',
          Cell: (percentage) => {
            return <p>{percentage.cell.value}%</p>
          }
        }
      ]
    },
    {
      Header: 'Resiliensi',
      columns: [
        {
          Header: 'CAR',
          accessor: 'ProcessedDatum.CAR',
          Cell: (percentage) => {
            return <p>{percentage.cell.value}%</p>
          }
        }
      ]
    },
    {
      Header: 'Rekap Komposit',
      columns: [
        {
          Header: 'Kr',
          accessor: 'Rk',
          Cell: (color) => {
            return <div style={{backgroundColor: color.cell.value, height: 30, width: 'auto', display: 'flex'}}></div>
          }
        },
        {
          Header: 'Pr',
          accessor: 'Pr',
          Cell: (color) => {
            return <div style={{backgroundColor: color.cell.value, height: 30, width: 'auto', display: 'flex'}}></div>
          }
        },
        {
          Header: 'Lk',
          accessor: 'Lk',
          Cell: (color) => {
            return <div style={{backgroundColor: color.cell.value, height: 30, width: 'auto', display: 'flex'}}></div>
          }
        },
        {
          Header: 'Ef',
          accessor: 'Ef',
          Cell: (color) => {
            return <div style={{backgroundColor: color.cell.value, height: 30, width: 'auto', display: 'flex'}}></div>
          }
        },
        {
          Header: 'Re',
          accessor: 'Re',
          Cell: (color) => {
            return <div style={{backgroundColor: color.cell.value, height: 30, width: 'auto', display: 'flex'}}></div>
          }
        },
        {
          Header: 'Komposit',
          accessor: 'Komposit',
          Cell: (color) => {
            return <div style={{backgroundColor: color.cell.value, height: 30, width: 'auto', display: 'flex'}}></div>
          }
        }
      ]
    }
  ]
  
  return(
    <div>
      <Navbar />
      <div className="container">
        <select className="form-select" style={{marginTop: 20}} value={periode} onChange={(e) => filterChange(e)}>
          {filterData.map(periode => {return <option key={periode} value={periode}>{periode}</option>})}
        </select>
        <TableComponents columns={columns} data={filterTable} />
      </div>
    </div>
  )
}

export default DataBank