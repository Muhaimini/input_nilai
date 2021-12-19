import React, { useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import Select from './components/Select'
import './App.css'


const listMahasiswa = (count_mhsw) => {
  const list = {}
  for (let i = 1; i <= count_mhsw; i++) {
    const key = `mahasiswa_${i}`
    list[key] = 1
  }
  return list
}

const structValue = (count, count_mhsw) => {
  const list = []
  for (let i = 1; i <= count; i++) {
    const key = `aspek_penilaian_${i}`
    list.push({
      [key] : listMahasiswa(count_mhsw)
    })
  }
  return list
}


const App = () => {

  const columnData = 10
  const tableRows = 4

  const [getData, setData] = useState(structValue(tableRows, columnData))
  const [keyAspek, setKeyAspek] = useState('')
  const [keyMahasiswa, setKeyMahasiswa] = useState('')
  const [getValue, setValue] = useState(0)


  const data = {
    [keyAspek]: {
      [keyMahasiswa]: getValue 
    }
  }

  const filterResult = (value) => {
    const dataKey = Object.keys(data)[0]
    value.forEach(element => {
      const key = Object.keys(element)
      if (key[0] === dataKey) {
        element[dataKey][keyMahasiswa] = parseInt(getValue)
      }
    })
    return value
  }
  
  const handleEvent = async e => {

    const { value } = e.target
    const child = e.target.parentNode
    const key = child.getAttribute('data')
    const mhsw_key = getChildNode(child.parentNode)

    setKeyAspek(key)
    setKeyMahasiswa(mhsw_key)
    setValue(value)


    getData.map(el => {
      const isTrue = el.hasOwnProperty(key)
      if (isTrue) {
        el[key][mhsw_key] = parseInt(value)
      }
      return el
    })

    setData(getData)
  }

  const getChildNode = (node) => {
    const childs = node.getAttribute('data')
    return childs
  }

  const TableHead = (props) => {
    const list = []
    for (let i = 0; i <= props.countHeader; i++ ) {
      if (i === 0) {
        list.push(<th key={i}>{' '}</th>)
      } else {
        list.push(<th key={i}>{`Aspek Penilaian ${i}`}</th>)
      }
    } 
    return <tr>{ list }</tr>
  }

  const btnResult = () => {
    const result = filterResult(getData)
    const toJson = JSON.stringify(result, null, '\t')
    console.log(toJson)
  }


  const loopRows = (length, j) => {
    const list = []
    for (let i = 1; i <= length; i++) {
      if (i === 1) {
        list.push(
          <td key={i}>
              <p>Mahasiswa { ++j }</p>
          </td>
        )
      } else {
        list.push(
          <td key={i} data={`aspek_penilaian_${i-1}`}>
            <Select handleEvent={handleEvent} length={columnData} />
          </td>
        )
      }
    }
    return list
  }

  const loopCols = (length, rows) => {
    const list = []
    for (let i = 0; i < length; i++) {
      list.push(
        <tr key={i} data={`mahasiswa_${i+1}`}>
            {
              loopRows(rows, i)
            }
          </tr>
      )
    }
    return list
  }

  return (
    <Container>
      <br /><br />
      <h1>Input Nilai</h1>
      <br />
      <Table bordered hover >
        <thead>
          <TableHead countHeader={tableRows} />
        </thead>
        <tbody>
          {
            loopCols(columnData, 5)
          }
        </tbody>
      </Table>
      <br />
      <Button onClick={() => btnResult()}>Sumbit Data</Button>
    </Container>
  );
}

export default App
