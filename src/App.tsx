import React, { Component, useCallback, useEffect } from 'react';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';
import Dropzone, { useDropzone } from 'react-dropzone';

import api from './services/api';

import GlobalStyle from './styles/global';
import {
  Container,
  Content,
  ContainerName,
  DropContainer,
  UploadMessage,
} from './styles';

import { Upload } from './components/Upload';
import FileList from './components/FileList';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const { photos } = useSelector((state: any) => state.reducerPhotos);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDropAccepted: (file) => addPhotoInRedux(file),
  });

  // async componentDidMount() {
  //   const response = await api.get('posts');

  //   this.setState({
  //     uploadedFiles: response.data.map((file) => ({
  //       id: file._id,
  //       name: file.name,
  //       readableSize: filesize(file.size),
  //       preview: file.url,
  //       uploaded: true,
  //       url: file.url,
  //     })),
  //   });
  // }

  // // Apagar o cache da aplicação nos preview da imagem
  // componentWillUnmount() {
  //   this.state.uploadedFiles.forEach((file) =>
  //     URL.revokeObjectURL(file.preview)
  //   );
  // }

  const addPhotoInRedux = (file) => {
    const uploadedFiles = file.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedPhotos(uploadedPhotos.concat(uploadedFiles));

    uploadedFiles.forEach(processUpload);
  };

  const updateFile = useCallback((id, data) => {
    setUploadedPhotos((state) =>
      state.map((file) => (file.id === id ? { ...file, ...data } : file))
    );
  }, []);

  const processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api
      .post('/posts', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          updateFile(uploadedFile.id, { progress });
        },
      })
      .then((response) => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  const handleDelete = async (id) => {
    await api.delete(`/posts/${id}`);

    setUploadedPhotos(uploadedPhotos.filter((file) => file.id !== id));
  };

  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  };

  return (
    <Container>
      <ContainerName>
        <h1>Upload de imagens</h1>
        <span style={{ fontSize: 13 }}>(máximo de 15mb)</span>
      </ContainerName>
      <Content>
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />

          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
        {!!uploadedPhotos.length && (
          <FileList files={uploadedPhotos} onDelete={handleDelete} />
        )}
      </Content>
      <GlobalStyle />
    </Container>
  );
}
