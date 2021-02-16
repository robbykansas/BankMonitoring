import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import TableComponents from '../components/TableComponents'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLog } from '../store/action'

export default function Log(){
  const dispatch = useDispatch()
  const log = useSelector(state => state.log)
  const error = useSelector(state => state.error)
  const loading = useSelector(state => state.loading)

  useEffect(_ => {
    dispatch(fetchLog())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(error) return <h2>{error}</h2>
  if(loading) return <img src='https://ak6.picdn.net/shutterstock/videos/28831216/thumb/1.jpg' alt='loadingImg' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>

  const columns = [
    {
      Header: 'Log',
      accessor: 'Log'
    },
    {
      Header: 'Date',
      accessor: 'createdAt',
      Cell: (date) => {
        return <p>{ new Date(date.cell.value).toDateString()}</p>
      }
    }
  ]

  return (
    <div>
      <Navbar />
      <div className="container">
        <TableComponents columns={columns} data={log} />
      </div>
    </div>
  )
}