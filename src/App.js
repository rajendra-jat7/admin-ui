import {
  Container,
  Row,
  Col,
  Form,
  Stack,
  Table,
  Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Paginate from "./components/Paginate";
import UpdateUser from "./components/UpdateUser";
import "./App.css";

function App() {
  // State variables using useState hook
  const [users, setUsers] = useState([]); // Store the list of users
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users
  const [searchKey, setSearchKey] = useState(""); // Store the search keyword
  const [selectedUsersId, setCheckedUsersId] = useState([]); // Store selected user IDs
  const [isAllChecked, setIsAllChecked] = useState(false); // Indicate if all users are selected
  const [modalShow, setModalShow] = useState(false); // Control modal visibility
  const [updateUserId, setUpdateUserId] = useState(null); // Store the ID of the user being updated
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const POST_PER_PAGE = 10; // Number of users to display per page
  const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"; // API URL to fetch user data

  // Open the modal for updating a user
  const updateUser = (userId) => {
    setUpdateUserId(userId);
    setModalShow(true);
  };

  // Select or deselect all users
  const onSelectAll = (event) => {
    let updatedList = [...selectedUsersId];
    if (event.target.checked) {
      setIsAllChecked(true);
      updatedList = currentUsers.map((user) => user.id);
    } else {
      setIsAllChecked(false);
      updatedList = [];
    }
    setCheckedUsersId(updatedList);
  };

  // Delete selected users
  const deleteSelected = () => {
    const updatedList = users.filter(
      (user) => !selectedUsersId.includes(user.id)
    );
    setUsers(updatedList);
    setIsAllChecked(false);
  };

  // Select or deselect a user
  const onSelect = (event) => {
    const userId = event.target.value;
    let updatedList = [...selectedUsersId];

    if (event.target.checked) {
      updatedList = [...selectedUsersId, userId];
    } else {
      setIsAllChecked(false);
      updatedList.splice(selectedUsersId.indexOf(userId), 1);
    }
    setCheckedUsersId(updatedList);
  };

  // Delete a user by ID
  const onDelete = (userId) => {
    const updatedList = users.filter((user) => user.id !== userId);
    setUsers(updatedList);
  };

  // Handle search input
  const onSearch = (event) => {
    setSearchKey(event.target.value);
  };

  // Filter the users based on the search keyword
  const filter = () => {
    if (searchKey !== "") {
      const result = users.filter((obj) =>
        Object.keys(obj).some((key) => obj[key].includes(searchKey))
      );
      setFilteredUsers(result);
    } else {
      setFilteredUsers(users);
    }
  };

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.log("Error in getting users", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Update the filtered users when the user list or search key changes
  useEffect(() => {
    filter();
  }, [users, searchKey]);

  /* Pagination */
  const indexOfLastUser = currentPage * POST_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - POST_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / POST_PER_PAGE);

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-4">
      {/* Search input */}
      <Row>
        <Col>
          <Search onSearch={onSearch} />
        </Col>
      </Row>

      {/* User table */}
      <Row>
        <Col className="mt-2">
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>
                  {/* Checkbox for selecting all users */}
                  <Form.Check
                    type="checkbox"
                    onChange={onSelectAll}
                    checked={isAllChecked}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render user rows */}
              {currentUsers.length ? (
                currentUsers.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className={
                        selectedUsersId.includes(user.id) ? "bg-gray" : ""
                      }
                    >
                      <td>
                        {/* Checkbox for selecting individual users */}
                        <Form.Check
                          type="checkbox"
                          value={user.id}
                          onChange={onSelect}
                          checked={selectedUsersId.includes(user.id)}
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        {/* Edit and Delete buttons */}
                        <Stack direction="horizontal" gap={2}>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => updateUser(user.id)}
                          >
                            <i className="bi bi-pencil-square text-primary"></i> {/* Edit icon */}
                          </Button>

                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => onDelete(user.id)}
                          >
                            <i className="bi bi-trash text-danger"></i> {/* Delete icon */}
                          </Button>
                        </Stack>
                      </td>
                    </tr>
                  );
                })
              ) : (
                // Displayed when no users are found
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No User Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Delete selected users button and pagination */}
      {currentUsers.length > 0 ? (
        <Row className="pt-2 pt-md-0">
          <Col xs="12" md="4">
            {/* Button to delete selected users */}
            <Button
              variant="danger"
              size="sm"
              onClick={deleteSelected}
              disabled={selectedUsersId.length > 0 ? false : true}
            >
              Delete Selected
            </Button>
          </Col>
          <Col xs="12" md="8">
            {/* Pagination component */}
            <Paginate
              currentPage={currentPage}
              paginate={paginate}
              totalPages={totalPages}
            />
          </Col>
        </Row>
      ) : (
        ""
      )}

      {/* Modal for updating a user */}
      {modalShow ? (
        <UpdateUser
          users={users}
          setUsers={setUsers}
          userId={updateUserId}
          setModalShow={setModalShow}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;
