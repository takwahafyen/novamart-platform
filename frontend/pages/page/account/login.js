import React, { useState } from 'react';
import Link from 'next/link';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Label, Input, Col } from 'reactstrap';
import { useRouter } from 'next/router';
import api from '../../../services/api';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.auth.login(email, password);
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonLayout parent="home" title="Login">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Login</h3>
              <div className="theme-card">
                {error && <div className="alert alert-danger">{error}</div>}
                <Form className="theme-form" onSubmit={loginAuth}>
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
                    <Label className="form-label" htmlFor="password">Password</Label>
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
                  <button type="submit" className="btn btn-solid" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </Form>
              </div>
            </Col>
            <Col lg="6" className="right-login">
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Create An Account</h6>
                <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to order and track your shipments effortlessly.</p>
                <Link href="/page/account/register" className="btn btn-solid">
                  Create an Account
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;
