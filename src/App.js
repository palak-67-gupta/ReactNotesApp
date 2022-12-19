// import logo from './logo.svg';
// import './App.css';
import './App.scss';
import { useState, useEffect, useRef } from 'react';
import Header from './Component/Header';
import Notes from './Component/Notes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    
  // const [notes, setNotes] = useState([]);
  // useEffect(() => {
  //   const notes = JSON.parse(localStorage.getItem('notes'));
  //   if (notes) {
  //     setNotes(notes);
  //   }
  // }, []);
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem('notes')) || []
  });
  const [openModal, setopenModal] = useState(false);
  const [inputList, setInputList] = useState("");
  let editList = useRef(false);
  const [editId, setEditId] = useState(null);

    
  //id = new Date().getTime().toString();
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  const inputOnChange =(e) =>{
    setInputList({...inputList,[e.target.name] : e.target.value})
  }
  const onSubmit =(e) =>{
    e.preventDefault();
    if(inputList.title && inputList.textList && editList.current){
      setNotes(
        notes.map((elem, index)=>{
          if (index === editId){
            return ({...elem, title : inputList.title , textList : inputList.textList })
          }
          return elem;
        })
      )
      setEditId("");
      setInputList("");
      editList.current = false;
      if (editList.current === false){
        setopenModal(false);
      }
    }else if (inputList.title && inputList.textList){
      const array = [...notes];
      array.push(inputList);
      setNotes(array);
      window.localStorage.setItem('notes', JSON.stringify(array));
      console.log(array);
      setInputList("");
      setopenModal(false);
      toast.success("Notes Added Successfully", {
        position: "top-center",
        autoClose: 1000
      });
    }else {
      toast.error("Both field ar compulsory", {
        position: "top-center",
        autoClose: 1000
      });
    }
  }

  const openmodal = () => {
    setopenModal(true);
  };
  const closemodal = () => {
    setopenModal(false);
    setInputList("");
    editList.current = false;
  };

  const removeNote = (id) => {
    console.log(id+" id");
    setNotes((oldNotes)=>{
      return oldNotes.filter((arraylist, index)=>{
        return index!==id;
      })
    });
    toast.success("Notes removed", {
      position: "top-center",
      autoClose: 1000
    });
  };
  const editNote = (id) => {
    console.log(id+" id");
    const editItem = notes.find((item,index)=> {
      return index === id;
    });
    setEditId(id);
    setInputList(editItem);
    editList.current = true;
    if (editList.current === true){
      setopenModal(true);
    }
  };
  return (
    <>
      <div className="main">
        <div className='notes__wrapper'>
          <Header inputOnChange = {inputOnChange} onSubmit = {onSubmit} notes = {notes} closemodal = {closemodal} openmodal = {openmodal} openModal={openModal} inputList={inputList} editList={editList} />
          <div className="note_container_wrpr">
            {notes.map((note,index) => {
              return <Notes
                key={index}
                note={note}
                id={index}
                removeNote = {removeNote}
                editNote = {editNote}
              />
            })}
          </div>
          <div className={`no__notes ${(notes.length === 0) ? 'show' : 'hide'}`}>
            <h3>There are no notes saved</h3>
          </div>
        </div>
        
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
