import BounceLoader from "react-spinners/BounceLoader";
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Loader = ({isLoading}) => {

    const override = css`
    display: flex;
    margin: 0 auto;
    border-color: red;
    height: 100%;
    `

    return(
        <LoaderContainer>
            <BounceLoader color='purple' loading={isLoading} size={150} css={override} /> 
        </LoaderContainer>
    );
}

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 80vh;
`


export default Loader;