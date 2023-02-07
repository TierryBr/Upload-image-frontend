import styled, {css} from 'styled-components';

export const Container = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 30px;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
`;

export const ContainerName = styled.div`
    font-size: 17px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px
`;

const dragActive = css`
    border-color: #78e5d5;
`;

const dragReject = css`
    border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;

    transition: height 0.2s ease; 

    ${props => props.isDragActive && dragActive}
    ${props => props.isDragReject && dragReject}
`;

const messageColors = {
    default: '#999',
    error: '#e57878',
    success: '#78e5d5',
}

export const UploadMessage = styled.p`
    display: flex;
    color: ${props => messageColors[props.type || 'default']};
    justify-content: center;
    align-items: center;
    padding: 15px 0;
`;
