import React, { useCallback, useEffect } from 'react';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';
import { useDropzone } from 'react-dropzone';

import api from './services/api';

import './styles/main.css';

import { DropContainer, UploadMessage } from './styles';

import FileList from './components/FileList';
import { useState } from 'react';

export default function App() {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

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
    onDropAccepted: (file) => addPhotoInArray(file),
  });

  useEffect(() => {
    async function loadPhotos() {
      const response = await api.get('posts');

      setUploadedPhotos(
        response.data.map((file) => ({
          id: file._id,
          name: file.name,
          readableSize: filesize(file.size),
          preview: file.url,
          uploaded: true,
          url: file.url,
        }))
      );
    }
    loadPhotos();

    return () => {
      uploadedPhotos.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedPhotos]);

  const addPhotoInArray = (file) => {
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
      favorite: false,
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
          const progress = parseInt(
            Math.round((e.loaded * 100) / e.total) as any
          );

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
    <div className="flex justify-center flex-col items-center">
      <div className="text-white font-medium text-3xl	text-center p-10">
        <h1>Upload de imagens</h1>
        <span style={{ fontSize: 13 }}>(máximo de 15mb)</span>
      </div>
      <div className="w-1/3 h-auto bg-white rounded-lg p-2">
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
      </div>
    </div>
  );
}
