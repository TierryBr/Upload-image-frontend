import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';

import Dropzone, { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto } from '../../reducers/index';

import { DropContainer, UploadMessage } from './styles';

interface TypeProps {
  onUpload: any;
}

export function Upload(onUpload: any) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(addPhoto([]));
  // }, []);

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
    console.log('adicionando foto', uploadedFiles);
    dispatch(addPhoto(uploadedFiles));
  };

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

  // useEffect(() => {
  //   if (!isDragReject) {
  //     return onUpload();
  //   }
  // }, [isDragReject]);

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
    <DropContainer
      {...getRootProps()}
      isDragActive={isDragActive}
      isDragReject={isDragReject}
    >
      <input {...getInputProps()} />

      {renderDragMessage(isDragActive, isDragReject)}
    </DropContainer>
  );
}
