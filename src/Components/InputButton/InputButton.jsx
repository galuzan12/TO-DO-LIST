import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './InputButton.css';

function InbTRow(props) {
    return (
        <Row className="row_inbt d-flex justify-content-center align-items-center">
            <Col className="col_inbt" md={3}>
                <input placeholder="Enter Note" className="inputbtn form-control" value={props.inputAdd} onChange={e => props.setInputAdd(e.target.value)} />
            </Col>
            <Col className="col_inbt" md={3}>
                <button className="inputbtn btn btn-block btn-primary">Add</button>
            </Col>
        </Row>
    );
}

export default InbTRow;
