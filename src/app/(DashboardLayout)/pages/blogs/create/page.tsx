'use client'
import { Container } from '@mui/material'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
}
const formats = [
  'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'header', 'blockquote', 'code-block',
  'indent', 'list',
  'direction', 'align',
  'link', 'image', 'video', 'formula',
]
const BlogCreate = () => {

  return (<>
    <Container >
      <ReactQuill modules={modules} formats={formats} />
    </Container>
  </>)
}
export default BlogCreate;