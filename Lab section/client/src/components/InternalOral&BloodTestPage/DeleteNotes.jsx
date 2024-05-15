import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

function DeleteNotes() {
    const {id} = useParams();
    const [notes,setNotes] = useState([]);
     
  const currentUser = useSelector(state => state.auth.user);
  
  const token = currentUser?.token;


    useEffect(()=>{
        const fetchNotes = async () => {
            try {
              const response = await axios.get(`https://dentalgurulab.doaguru.com/api/lab/getpatienttest-notes/${id}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }});
        
              if (response.status === 200) {
                setNotes(response.data);
              }
            } catch (error) {
              console.error('Error fetching notes:', error);
            }
          };
fetchNotes()
    },[id]);

    const handleDeleteNote = async (noteId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Notes?");
       if(isConfirmed){ try {
          const response = await axios.delete(`https://dentalgurulab.doaguru.com/api/lab/delete-patienttest-notes/${noteId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }});
    
          if (response.status === 200) {
            console.log('Note deleted successfully');
            // Refresh notes after deletion
            window.location.reload()
            
          }
        } catch (error) {
          console.error('Error deleting note:', error);
        } 
      }
      };
    

  return (
   
    <>
        <div className="container mt-4" style={{marginTop:"3rem"}}>
      <h1>Delete Notes </h1>
      <ul className="list-group">
        {notes.map((note) => (
          <li key={note.id} className='list-group-item'>
            {note.note_text}
          
            <button className="btn btn-danger mx-3 float-end" onClick={() => handleDeleteNote(note.id)}>
              Delete Note
            </button>
          </li>
        ))}
      </ul>
      <br />
      <Link to={`/final-oral-testing/${id}`} className="btn btn-primary">
        Back
      </Link>
    </div>
    
    </>
  )
}

export default DeleteNotes