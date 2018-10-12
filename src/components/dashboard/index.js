import React from 'react';
import { Row, Col, Navbar } from 'react-bootstrap';
import Sidebar from '../common/Sidebar';
import Content from './content';

const Dashboard = props => {
  return (
    <React.Fragment>
      <div className="wrapper">
        <Row className="show-grid" style={{ marginRight: 'auto' }}>
          <Col xs={4} sm={2} md={2}>
            <Sidebar {...props} />
          </Col>
          <Col md={10} sm={10}>
            <Content {...props} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
