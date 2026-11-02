import React, { Fragment, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row
} from 'reactstrap';

interface Category {
  _id: string;
  name: string;
}

const CategoryComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const onOpenModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setNewCategory(category ? category.name : '');
    setOpen(true);
  };

  const onCloseModal = () => {
    setEditingCategory(null);
    setNewCategory('');
    setOpen(false);
  };

  const handleAddOrUpdateCategory = async () => {
    try {
      if (editingCategory) {
        // Update category
        await axios.put<Category>(`http://localhost:5000/api/categories/${editingCategory._id}`, { name: newCategory });
        toast.success('Category updated successfully');
      } else {
        // Add category
        await axios.post<Category>('http://localhost:5000/api/categories', { name: newCategory });
        toast.success('Category added successfully');
      }
      fetchCategories(); // Refresh the categories list
      onCloseModal();
    } catch (error) {
      toast.error('Error adding/updating category');
      console.error('Error adding/updating category', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      toast.success('Category deleted successfully');
      fetchCategories(); // Refresh the categories list
    } catch (error) {
      toast.error('Error deleting category');
      console.error('Error deleting category', error);
    }
  };

  return (
    <Fragment>
      <Container fluid>
        <ToastContainer />
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <h3>Product Category</h3>
                  <Button color="primary" onClick={() => onOpenModal()}>Add Category</Button>
                </div>
                <div className="mt-3">
                  {categories.length > 0 ? (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map(category => (
                          <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>
                              <Button color="warning" size="sm" onClick={() => onOpenModal(category)}>Edit</Button>{' '}
                              <Button color="danger" size="sm" onClick={() => handleDeleteCategory(category._id)}>Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>There are no records to display</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={open} toggle={onCloseModal}>
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600">{editingCategory ? 'Edit Category' : 'Add Category'}</h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="recipient-name" className="col-form-label">
                Category Name:
              </Label>
              <Input
                type="text"
                value={newCategory}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddOrUpdateCategory}>
            {editingCategory ? 'Update' : 'Save'}
          </Button>
          <Button color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default CategoryComponent;
