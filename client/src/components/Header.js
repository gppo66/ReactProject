import React from 'react';
import { Col, Row } from 'reactstrap';

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>젤베의 개인적인 블로그</h1>
          <p>하고 싶은거 다 하는 블로그</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
