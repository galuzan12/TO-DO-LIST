import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Row.css';

function TDRow(props) {
    return (
        <Row className="row_td d-flex justify-content-center align-items-center">
            <Col onClick={props.onClick} className="col_td" md={6}>
                {props.text}
            </Col>
        </Row>
    );
}

export default TDRow;
