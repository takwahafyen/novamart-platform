import React, { useState } from 'react';
import Link from 'next/link';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Label, Input, Col } from 'reactstrap';
import { useRouter } from 'next/router';
import api from '../../../services/api';

const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.auth.register({ firstName, lastName, email, password });
      router.push('/page/account/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed. Please verify your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonLayout parent="home" title="Register">
      <section className="register-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <h3>Create An Account</h3>
              <div className="theme-card">
                {error && <div className="alert alert-danger">{error}</div>}
                <Form className="theme-form" onSubmit={handleRegister}>
                  <Row>
                    <Col md="6">
                      <div className="form-group">
                        <Label className="form-label" htmlFor="firstName">First Name</Label>
                        <Input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="form-control"
                          id="firstName"
                          placeholder="First Name"
                          required
                        />
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <Label className="form-label" htmlFor="lastName">Last Name</Label>
                        <Input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="form-control"
                          id="lastName"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="form-group">
                    <Label className="form-label" htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Label className="form-label" htmlFor="password">Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <button type="submit" className="btn btn-solid" disabled={loading}>
                      {loading ? 'Creating account...' : 'Register'}
                    </button>
                    <span className="ms-3">
                      Already have an account?{' '}
                      <Link href="/page/account/login" className="text-decoration-underline">
                        Log in here
                      </Link>
                    </span>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Register;
