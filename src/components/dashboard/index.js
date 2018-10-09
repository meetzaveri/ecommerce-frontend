import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Sidebar from '../common/Sidebar';
import Content from './content';

const Dashboard = props => {
  return (
    <div>
      <Row className="show-grid">
        <Col xs={4} sm={2} md={2}>
          <Sidebar {...props} />
        </Col>
        <Col md={10} sm={10}>
          <Content {...props} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
