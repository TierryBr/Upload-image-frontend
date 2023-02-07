import styled from "styled-components";

export const Container = styled.ul`
    margin-top: 20px;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #444;

        /* aplicar margin-top apartir da segunda li, não da primeira */
        & + li {
            margin-top: 15px;
        }
    }
`;

export const Preview = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 10px;
`;