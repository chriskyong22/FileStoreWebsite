import React, { useState } from 'react';
import { FormPopup } from './Components/FormPopup';
import { List } from "./Components/List"
import './Stylesheets/App.css';
import { FilesModel } from "./Models/FileModel"

function App() {

  const [files, setFiles] = useState<FilesModel>([])

  return (
    <div className="App">
      <List
        setFiles={setFiles}
        files={files}
      />
      <FormPopup 
        setFiles={setFiles}
      />
    </div>
  );
}

export default App;
