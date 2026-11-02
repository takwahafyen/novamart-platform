import { useEffect, useState, ChangeEvent } from 'react';
import { Fragment } from 'react';
import { Button, Card, CardBody, CardHeader, Container, Table, Input } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: any;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<User>({ _id: '', firstName: '', lastName: '', email: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
        const filteredUsers = response.data.map(({ isAdmin, __v, ...user }) => user);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateClick = (user: User) => {
    setEditingUserId(user._id);
    setUserDetails(user);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${editingUserId}`, userDetails);
      toast.success("User updated successfully");
      setUsers(users.map(user => user._id === editingUserId ? userDetails : user));
      setEditingUserId(null); // Exit editing mode
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error("Error updating user");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!userId) {
      console.error("Invalid userId:", userId);
      return;
    }
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Fragment>
      <Container fluid>
        <Card>
          <CardHeader>
            <h5>User Details</h5>
          </CardHeader>
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(user => (
                    <tr key={user._id}>
                      <td>
                        {editingUserId === user._id ? (
                          <Input
                            type="text"
                            name="firstName"
                            value={userDetails.firstName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          user.firstName
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <Input
                            type="text"
                            name="lastName"
                            value={userDetails.lastName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          user.lastName
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <Input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleInputChange}
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <Button color="success" size="sm" onClick={handleSave}>Save</Button>
                        ) : (
                          <Button color="primary" size="sm" onClick={() => handleUpdateClick(user)}>Update</Button>
                        )}
                        {' '}
                        <Button color="danger" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">There are no records to display</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default UserList;
