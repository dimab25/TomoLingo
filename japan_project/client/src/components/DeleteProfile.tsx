
import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';
import DelayedLink from './DelayedLink';

type DeleteMessage = {
  message: string;
  info: {
    acknowledged: boolean;
    deletedCount: number;
  };
};

type DeleteProfileProps = {
  refresh: () => void; 
};
function DeleteProfile({refresh}:DeleteProfileProps ) {
     const { user } = useContext(AuthContext);
  
const [deleteMessage, setDeleteMessage] = useState<DeleteMessage|null>(null)

       const handleDeleteProfile = async() => {
       
        if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            return; // Stop execution if the user cancels
          }
try {
    
    const requestOptions: RequestInit  = {
        method: "DELETE",
        redirect: "follow"
      };
    
      const response= await fetch(`http://localhost:4000/api/users/delete/user/${user?._id}`, requestOptions);
      const result= await response.json();
      setDeleteMessage(result)   ;
      refresh();   
      } catch (error) {
    console.log(error);
}
       }
console.log('deleteMessage :>> ', deleteMessage);
// useEffect(() => {
   
// }, [user?.name])

  return (
 <>
 <Button variant='outline-danger' onClick={handleDeleteProfile}>Delete Profile</Button>
 {deleteMessage&& deleteMessage.message==="Userprofile succesfull deleted" ? <div>Userprofile succesfull deleted!</div>:null} 
 {!user && <DelayedLink />}
 </>
  )
}

export default DeleteProfile