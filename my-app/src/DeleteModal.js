import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";

import './css/Modals.css';

function DeleteModal(props) {

  function deleteCertificate(){

    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };

    axios
        .delete("certificate/" + props.id, config)        
        .catch((error) => {
          if(error.response.data.errorMessage != null)
            props.onMessageChange(error.response.data.errorMessage);
          else{
            if(error.response.data.error.includes('JWT expired')) {
              axios
                .post("refresh", config)
                .then(response => {
                  (async () => {
                    await localStorage.setItem('token', response.data.token);
                    deleteCertificate(); 
                  })();
                })
                .catch((error) => {
                  if(error.response.data.errorMessage != null)
                    console.log(error.response.data.errorMessage);
                  else
                    console.log(error.response.data.error);
                });       
            }
            else props.onMessageChange(error.response.data.error);
          }  
        });

    props.onDeleteCertificate(false, 0);
  }

    return (
      <Modal {...props} centered>
        <Modal.Header className="modal-title">
          <Modal.Title id="delete-modal">
            Delete confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p class="inner-text">
            Do you really want to delete certificate with id = {props.id}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="submit-button" onClick={() => deleteCertificate()}>Yes</Button>
          <Button className="cancel-button" onClick={() => props.onDeleteCertificate(false, 0)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default DeleteModal;