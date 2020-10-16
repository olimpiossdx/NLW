import React from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';
import './styles.css';

interface IProps {
  handleFile: (file: File | undefined) => void;
};

const Dropzone: React.FC<IProps> = (props) => {
  const [selectedFileUrl, setSelectedFileUrl] = React.useState('');

  const onDrop = React.useCallback(acceptedFiles => {
    props.handleFile(acceptedFiles[0]);
    setSelectedFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (<div className='dropzone' {...getRootProps()}>
    <input {...getInputProps()} accept='image/*' alt='Point thumbnail' />
    {selectedFileUrl ?
      (<img src={selectedFileUrl} />) :
      (<p>
        <FiUpload />
          Imagem do estabelecimento
      </p>)}
  </div>);
};

export default Dropzone;