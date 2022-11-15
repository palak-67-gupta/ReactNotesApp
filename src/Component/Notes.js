import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEditNote } from"react-icons/md";

function Notes(prop) {
  return (
    <>
      <div className= "note_container" data-id={prop.id}>
        <div className="note_body">
            <div className="notes__subject">
              {prop.note.title}
            </div>
            <div className="notes__content">
              <p>{prop.note.textList}</p>
            </div>
        </div>
        <div className="note_footer" >
          <span className="edit-btn" title="Edit" onClick={() =>prop.editNote(prop.id)}><MdOutlineEditNote /></span>
          <span title="Delete" onClick={() =>prop.removeNote(prop.id)}><FaTrashAlt /></span>  
        </div>
      </div>
    </>
  );
}
  export default Notes;