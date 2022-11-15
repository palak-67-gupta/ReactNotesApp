import { FaPlusCircle, FaPlus } from "react-icons/fa";
import { useEffect } from 'react';

function Header(prop) { 
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(prop.notes));
      }, [prop.notes]); 
      let val = ""; 
      prop.editList.current ?
        val="Edit" : 
        val="Save";
    return (
        <>
            <div className="header">
                <h1 className="notes_title">Notes <span id="addNotes" onClick={prop.openmodal}><FaPlusCircle /> </span></h1>
            </div>
            <div className={`modal ${prop.openModal ? 'show' : 'hide'}`}>
                <div className="modal-container">
                    <div className="modal-header">
                        <h3>Create Notes<span className="close" onClick={prop.closemodal}><FaPlus /></span></h3>
                    </div>
                    <div className="modal-body">
                        <form>
                            <input className="form-control" type="text" name="title" value={prop.inputList.title || ""} onChange = { prop.inputOnChange } placeholder="Notes Title" />
                            <textarea className="form-control" name="textList" value={prop.inputList.textList || ""} onChange = { prop.inputOnChange } placeholder="Notes Content"  ></textarea>
                            <input type="submit" value={val} onClick={ prop.onSubmit } />
                        </form> 
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;