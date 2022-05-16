import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadSimple, Trash } from "phosphor-react";

interface PropsFile {
  onFileUploaded: (file: File) => void;
  onFileUrlUploaded: (fileURL: string) => void;
}

export function UploadFile({ onFileUploaded, onFileUrlUploaded }: PropsFile) {
  const [selectedFileURL, setSelectedFileURL] = useState("")

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0]
    const fileURL = URL.createObjectURL(file)
    setSelectedFileURL(fileURL)

    onFileUploaded(file)
    onFileUrlUploaded(fileURL)
  }, [onFileUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
      {selectedFileURL &&
        <div className="grid justify-items-end">
          <button
            className="mt-4 mb-4 gap-2 min-w-[304px] min-h-[10px] flex-1 flex justify-center items-center text-sm font-semibold"
            onClick={() => setSelectedFileURL("")}
          >
            <Trash size={20} /> Deseja apagar esta foto 
          </button>
        </div>
      }
    </>
  )
}