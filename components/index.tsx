import styled from "styled-components";

const FormTitle = styled.h3`
    font-size: 1.75em;
    color: #4CAF50;
    margin-bottom: 0em;
`

const FormInput = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 5px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
`

const MyButton = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    margin: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;

    &:hover {
        color: #4CAF50;
        background-color: white;
        border: 1px solid #4CAF50;
    }
`

const Title = styled.h1`
    font-size: 3em;
    text-align: center;
    color: #4CAF50;
    margin-bottom: 0em;
`

const Content = styled.div`
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;    
`

export { MyButton, Title, Content, FormTitle, FormInput };