// import styled, { css } from "styled-components";
import styled from "@emotion/styled";
const { Donut } = require("theme-ui");

const Wrapper = styled.div`
  display: grid;
  padding: 10px;
`;
const CenteredText = styled.div`
  margin-left: 40px;
  margin-top: -80px;
`;

const DonutWithValue = (props: { value: number }) => {
  return (
    <>
      <Wrapper>
        <Donut value={props.value} max={100} title="Percentage" />
        <CenteredText>{`${props.value}%`}</CenteredText>
      </Wrapper>
    </>
  );
};
export default DonutWithValue;
