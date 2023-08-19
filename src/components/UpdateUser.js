// Import necessary modules and components
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { BiPencilSquare, BiTrash } from "react-icons/bi";

// Define a functional component named UpdateUser that takes several props
const UpdateUser = ({ users, setUsers, userId, setModalShow, ...props }) => {
  // Find the user to be updated based on their ID
  const userToUpdate = users.find((user) => user.id === userId);

  // Initialize state for the form input values
  const [formValue, setFormValue] = useState({
    name: userToUpdate.name,
    email: userToUpdate.email,
    role: userToUpdate.role,
  });

  // Handle changes in the form input fields
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };
  const { name, email, role } = formValue;

  // Handle the submission of the form
  const submitHandler = () => {
    // Update the user's information in the list of users
    const updatedList = users.map((item) => {
      if (item.id === userId) {
        return { ...item, ...formValue };
      }
      return item;
    });
    setUsers(updatedList);
    setModalShow(false); // Close the modal
  };

  // Render a modal dialog for updating user information
  return (
    <Modal {...props} size="sm" centered>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="name"
              placeholder="Name"
              onChange={handleChange}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              id="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={email}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="role"
              placeholder="Role"
              onChange={handleChange}
              value={role}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Button to close the modal */}
        <Button variant="light" onClick={() => setModalShow(false)}>
          Close
        </Button>
        {/* Button to submit the form and update user information */}
        <Button variant="primary" onClick={submitHandler}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Export the UpdateUser component as the default export
export default UpdateUser;
