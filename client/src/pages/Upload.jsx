import React, { useCallback, useMemo } from 'react';
import {useDropzone} from 'react-dropzone';
import axios from '../config/axios'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { postLog } from '../store/action'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function Upload() {
  const dispatch = useDispatch()
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0]
      const filename = file.name
      let obj = {Log: `import ${filename}`}
      dispatch(postLog(obj))
      let data = new FormData()
      data.append('file', file)
      data.append('filename', filename)
      axios({
        method: 'POST',
        url: '/json',
        data: data,
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
    } else {
      console.log('no data')
    }
  }, [])
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: (
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/docx',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ),
    maxFiles: 1,
    onDrop
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div>
      <Navbar />
      <section className="container" style={{marginTop: 5}}>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </section>
    </div>
  );
}