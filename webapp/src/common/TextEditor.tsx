import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface IEditor {
  label?: string
  initValue: string
  onEditorChange: Function
  name: string
  value?: string
  uploadImageHandler?: Function
}

const TextEditor = ({ label, initValue, name, onEditorChange, value, uploadImageHandler }: IEditor) => {
  const getValue = value || initValue

  const handleEditorChange = (event:any) => {
    const content = event.target.getContent()
    const id = event.target.id

    onEditorChange(content, id)
  }

  const TINYCME_KEY = 'ef1vk6wacevtega2pkfa5tptmnnjrzjn9xwb5l4jz35go85w'

  return (
    <div className="field">
      {label && <label>{label}</label>}
      <Editor
        id={name}
        apiKey={TINYCME_KEY}
        initialValue={initValue}
        init={{
          selector: `textarea#${name}`,
          plugins: "lists advlist autolink link image lists charmap print preview paste",
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
          menubar: false,
          paste_as_text: true,
          images_upload_handler: uploadImageHandler
        }}
        value={getValue}
        onChange={handleEditorChange}
      />
    </div>
  )
 }

 export default TextEditor