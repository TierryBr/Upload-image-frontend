import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';

import api from './services/api';

import GlobalStyle from './styles/global';
import { Container, Content, ContainerName } from './styles';

import { Upload } from './components/Upload';
import FileList from './components/FileList';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { photos } = useSelector((state: any) => state.reducerPhotos);

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

  // function handleUpload(files) {
  //   console.log('aquiii');
  //   const uploadedFiles = files.map((file) => ({
  //     file,
  //     id: uniqueId(),
  //     name: file.name,
  //     readableSize: filesize(file.size),
  //     preview: URL.createObjectURL(file),
  //     progress: 0,
  //     uploaded: false,
  //     error: false,
  //     url: null,
  //   }));

  //   setUploadedFiles(uploadedFiles.concat(uploadedFiles));

  //   uploadedFiles.forEach(this.processUpload);
  // }

  // const updateFile = (id, data) => {
  //   this.setState({
  //     uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => {
  //       return id === uploadedFile.id
  //         ? { ...uploadedFile, ...data }
  //         : uploadedFile;
  //     }),
  //   });
  // };

  // processUpload = (uploadedFile) => {
  //   const data = new FormData();

  //   data.append('file', uploadedFile.file, uploadedFile.name);

  //   api
  //     .post('/posts', data, {
  //       onUploadProgress: (e) => {
  //         const progress = parseInt(Math.round((e.loaded * 100) / e.total));

  //         this.updateFile(uploadedFile.id, {
  //           progress,
  //         });
  //       },
  //     })
  //     .then((response) => {
  //       this.updateFile(uploadedFile.id, {
  //         uploaded: true,
  //         id: response.data._id,
  //         url: response.data.url,
  //       });
  //     })
  //     .catch(() => {
  //       this.updateFile(uploadedFile.id, {
  //         error: true,
  //       });
  //     });
  // };

  // handleDelete = async (id) => {
  //   await api.delete(`/posts/${id}`);

  //   this.setState({
  //     uploadedFiles: this.state.uploadedFiles.filter((file) => file.id !== id),
  //   });
  // };

  // // Apagar o cache da aplicação nos preview da imagem
  // componentWillUnmount() {
  //   this.state.uploadedFiles.forEach((file) =>
  //     URL.revokeObjectURL(file.preview)
  //   );
  // }

  console.log('photos', photos);

  return (
    <Container>
      <ContainerName>
        <h1>Upload de imagens</h1>
        <span style={{ fontSize: 13 }}>(máximo de 15mb)</span>
      </ContainerName>
      <Content>
        <Upload />
        {!!photos.length && <FileList files={photos} onDelete={() => {}} />}
      </Content>
      <GlobalStyle />
    </Container>
  );
}
