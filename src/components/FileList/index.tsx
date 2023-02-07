import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { Container, Preview } from './styles';

const FileList = ({ files, onDelete }) => {
  return (
    <Container>
      {files &&
        files.map((uploadedFile) => (
          <li key={uploadedFile.id}>
            <div className="flex items-center">
              <Preview src={uploadedFile.preview} />
              <div className="flex flex-col">
                <strong>{uploadedFile.name.substr(-35)}</strong>
                <span className="text-sm text-gray-500">
                  {uploadedFile.readableSize}{' '}
                  {!!uploadedFile.url && (
                    <button
                      className="text-sm text-red-500 mx-3"
                      onClick={() => onDelete(uploadedFile.id)}
                    >
                      Excluir
                    </button>
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-row">
              {!uploadedFile.uploaded && !uploadedFile.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: '#7159c1' },
                  }}
                  strokeWidth={10}
                  value={uploadedFile.progress}
                />
              )}

              {uploadedFile.url && (
                <a
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>
              )}

              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        ))}
    </Container>
  );
};

export default FileList;
