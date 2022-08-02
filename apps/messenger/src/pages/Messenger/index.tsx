import {FC, lazy, useEffect} from "react";
import { Row, Col } from "antd";
import Toolbar from "./Toolbar";
import Members from "./Members";
import ChatContent from "./ChatContent";
import "./style.scss";

interface IPropType {}

const Messenger: FC<IPropType> = () => {

  return (
    <Row className="messenger">
      {/** Toolbar */}
      <Col span={2} className="app-toolbar">
        <Toolbar />
      </Col>

      {/** Members */}
      <Col span={5} className="app-members">
        <Members />
      </Col>

      {/** Content */}
      <Col span={17} className="app-content">
        <ChatContent />
      </Col>
    </Row>
  );
};

export default Messenger;
