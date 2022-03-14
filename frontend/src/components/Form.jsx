import React from 'react'
import styled from 'styled-components';

function Form({inputs}) {
  return (
    <formStyled>
        {
            inputs.map(input => {
                return(
                    <>
                    {input.name && <label for={input.id}>{input.name}</label>}
                    <input name={input.name} type={input.type} id={(input.id !== "undefined") ? input.id : ""} placeholder={input.placeholder}></input>
                    </>
                )
            })
        }
    </formStyled>
  );
}

const formStyled = styled.form`
    display: block;
`


export default Form;