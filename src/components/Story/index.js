import { Stories, Wrapper } from "./storyStyles";

import { Container, Row, Col } from "../../Styles/ElementsStyles";

import CreateStory from "./CreateStory";

import SingleStory from "./SingleStory";

const Story = () => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col w="100">
            <Stories>
              <CreateStory />
              <SingleStory />
            </Stories>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Story;
