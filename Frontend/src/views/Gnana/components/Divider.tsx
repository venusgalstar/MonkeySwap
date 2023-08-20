import styled from "@emotion/styled";
import { Flex } from "components/uikit";

export default styled(Flex)`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 1px;
  margin: 32px auto 32px;
  width: 100%;
  max-width: 1098px;
`
