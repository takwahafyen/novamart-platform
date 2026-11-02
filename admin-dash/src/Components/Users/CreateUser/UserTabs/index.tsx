"use client"; // Ajoutez cela en haut
import { Fragment, useState, ChangeEvent } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Button, Form } from "reactstrap";
import AccountDetails from "./AccountDetails";
import axios from 'axios';
import { toast } from 'react-toastify';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserTabs = () => {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/register', user);
      toast.success('User created successfully');
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Error creating user');
    }
  };
  

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Account</Tab>
        </TabList>
        <TabPanel>
          <AccountDetails user={user} handleChange={handleChange} />
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        <Button color="primary" onClick={handleSave}>Save</Button>
      </div>
    </Fragment>
  );
};

export default UserTabs;
