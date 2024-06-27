import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreateNotes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [loading , setLoading] = useState(false);
  const currentUser = useSelector(state => state.auth.user);
  
  const token = currentUser?.token;


    const handleAddNote = () => {
        if (newNote.trim() !== "") {
          setSelectedNotes([...selectedNotes, newNote]);
          setNewNote("");
        }
      };

      const handleRemoveNote = (index) => {
        const updatedNotes = [...selectedNotes];
        updatedNotes.splice(index, 1);
        setSelectedNotes(updatedNotes);
      };


      const handleCreateNotes = async () => {
        setLoading(true)
        try {
          
          for (const note of selectedNotes) {
            const response = await axios.post("https://dentalgurulab.doaguru.com/api/lab/patienttest-notes", {
              noteTexts: [note],
              testId: id,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
    
           
            console.log("Note stored successfully:", response.data);
          }
          setLoading(false)
          navigate(`/final-oral-testing/${id}`);
          
        } catch (error) {
            setLoading(false)
          console.error("Error storing notes:", error);
        }
      };
    

  return (
   <>
   <div className="container" style={{marginTop:"3rem"}}>
    <h2>Create New Notes</h2>
   
   <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddNote}>
          Add Note
        </button>
      </div>

  
      {selectedNotes.length > 0 && (
        <div className="mb-3">
          <h5>Selected Notes:</h5>
          <ul>
            {selectedNotes.map((note, index) => (
              <li key={index}>
                {note}{" "}
                <button
                  className="btn btn-danger btn-sm mx-2 mt-2"
                  onClick={() => handleRemoveNote(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
         <button className="btn btn-success" onClick={handleCreateNotes} disabled={loading} 
          >
          {loading ? 'Creating Notes ...' : 'Create Notes'}
      
      </button>
   <Link to={`/final-oral-testing/${id}`} className="btn btn-primary mx-4">
      <i className="bi bi-arrow-return-left mx-1"></i>  Back 
      </Link>
      </div>
   </>
  )
}

export default CreateNotes