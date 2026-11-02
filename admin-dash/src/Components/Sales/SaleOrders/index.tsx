import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface CartItem {
  title: string;
  qty: number;
  total: number;
  _id: string;
}

interface Order {
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  cartItems: CartItem[];
  cartTotal: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const SalesOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>("http://localhost:5000/api/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
        toast.error("Error fetching orders!");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders(orders.filter(order => order._id !== id));
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the order!", error);
      toast.error("Error deleting order!");
    }
  };

  const handleUpdate = (order: Order) => {
    setEditOrder(order);
    toggle();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editOrder) {
      setEditOrder({ ...editOrder, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editOrder) {
      try {
        const response = await axios.put(`http://localhost:5000/api/orders/${editOrder._id}`, editOrder);
        setOrders(orders.map(order => (order._id === editOrder._id ? response.data : order)));
        toggle();
        toast.success("Order updated successfully!");
      } catch (error) {
        console.error("There was an error updating the order!", error);
        toast.error("Error updating order!");
      }
    }
  };

  return (
    <Container fluid className="p-4">
      <ToastContainer />
      {loading ? (
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <Row>
          <Col sm="12">
            <h4 className="mb-4">Manage Orders</h4>
            <Row>
              {orders.map(order => (
                <Col md="4" key={order._id} className="mb-4">
                  <Card className="p-3 h-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>{order.first_name} {order.last_name}</h5>
                      <div>
                        <Button color="warning" size="sm" className="me-2" onClick={() => handleUpdate(order)}>
                          <FaEdit />
                        </Button>
                        <Button color="danger" size="sm" onClick={() => handleDelete(order._id)}>
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </div>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Country:</strong> {order.country}</p>
                    <p><strong>Address:</strong> {order.address}, {order.city}, {order.state}, {order.pincode}</p>
                    <p><strong>Cart Items:</strong> {order.cartItems.map(item => `${item.title} (Qty: ${item.qty}, Total: ${item.total})`).join(", ")}</p>
                    <p><strong>Cart Total:</strong> ${order.cartTotal}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {editOrder && (
        <Modal isOpen={modal} toggle={toggle}>
          <Form onSubmit={handleFormSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Update Order</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={toggle}></button>
            </div>
            <div className="modal-body">
              <FormGroup>
                <Label for="first_name">First Name</Label>
                <Input type="text" name="first_name" value={editOrder.first_name} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="last_name">Last Name</Label>
                <Input type="text" name="last_name" value={editOrder.last_name} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input type="text" name="phone" value={editOrder.phone} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" value={editOrder.email} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="country">Country</Label>
                <Input type="text" name="country" value={editOrder.country} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" name="address" value={editOrder.address} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input type="text" name="city" value={editOrder.city} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="state">State</Label>
                <Input type="text" name="state" value={editOrder.state} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="pincode">Pincode</Label>
                <Input type="text" name="pincode" value={editOrder.pincode} onChange={handleInputChange} />
              </FormGroup>
            </div>
            <div className="modal-footer">
              <Button color="primary" type="submit">Update Order</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </div>
          </Form>
        </Modal>
      )}
    </Container>
  );
};

export default SalesOrders;
