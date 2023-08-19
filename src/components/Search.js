// Import the Form component from react-bootstrap
import { Form } from "react-bootstrap";

// Define a functional component named Search that takes onSearch as a prop
const Search = ({ onSearch }) => {
  // Render a text input field for searching
  return (
    <Form.Control
      type="text"
      placeholder="Search By Name, Email or Role" // Placeholder text in the input field
      onChange={onSearch} // Call the onSearch function when the input value changes
    />
  );
};

// Export the Search component as the default export
export default Search;
