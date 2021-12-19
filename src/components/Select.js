import React from 'react'
import { Form } from 'react-bootstrap'


const Select = (props) => {

    const { handleEvent, length } = props

    const list = () => {
        const data = []
        for (let i = 1; i <= length; i++) {
            data.push(<option key={i} value={i}>{i}</option>)
        }
        return data
    }

    return (
        <Form.Select className="me-sm-2" onChange={e => handleEvent(e)}>
            { list() }
        </Form.Select>
    )
}

export default Select