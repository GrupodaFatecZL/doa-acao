import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadSimple, Trash } from "phosphor-react";

interface PropsFile {
  onFileUrlUploaded: (fileURL: string) => void;
  onFileBase64: (base64: string | ArrayBuffer | null) => void;
}

export function UploadFile({ onFileUrlUploaded, onFileBase64 }: PropsFile) {
  const [selectedFileURL, setSelectedFileURL] = useState("")
  const [selectedFile, setSelectedFile] = useState<File>()

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0]
    const fileURL = URL.createObjectURL(file)

    setSelectedFile(file)
    setSelectedFileURL(fileURL)
    
    onFileUrlUploaded(fileURL)
  }, [onFileUrlUploaded])


  useEffect(() => {
    async function generateBase64() {
      const base64 = await getBase64(selectedFile);
      onFileBase64(base64)
    }

    generateBase64()
  }, [selectedFile])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleImageDeletion = () => {
    setSelectedFileURL("")
    onFileUrlUploaded("")
  }
  

  async function getBase64 (file: File | undefined): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if(file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          return resolve(reader.result)
        };
        return reader.onerror = error => reject(error);
      }
    });
  }

  return (
    <>
      <div
        className="h-[300px] bg-zinc-200 border-4 rounded-md grid grid-cols-1 gap-4 place-content-center justify-center hover:bg-zinc-400 focus:outline-none"
        {...getRootProps()}
      >
        <input {...getInputProps()} accept='image/*'/>
        { selectedFileURL ?
        <div className="grid place-items-center gap-2 align-center">
          <img src={selectedFileURL} alt="imagem-do-produto" className="h-[300px]"/>
        </div>
          :
          <div className="grid place-items-center gap-2 align-center">
            <UploadSimple size={32} />
            <p className="text-center text-sm">
              Arraste e solte alguns arquivos aqui ou clique para selecionar os arquivos
            </p>
          </div>
        }
      </div>
      { selectedFileURL &&
        <div className="grid justify-items-end">
          <button
            className="mt-4 mb-4 gap-2 min-w-[304px] min-h-[10px] flex-1 flex justify-center items-center text-sm font-semibold"
            onClick={() =>  handleImageDeletion()}
          >
            <Trash size={20} /> Deseja apagar esta foto 
          </button>
        </div>
      }
    </>
  )
}