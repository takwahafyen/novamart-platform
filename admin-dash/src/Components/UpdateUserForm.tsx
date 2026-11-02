import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

interface UpdateUserFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email };
    onUpdate(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;
