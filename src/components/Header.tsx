import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppContext } from "./AppWrapper";
import { env } from "../utils/env";

function Header() {
  const { dispatch, isUserLoggedIN, user } = useAppContext();
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">SwiftBid</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Products</Nav.Link>
          </Nav>
          {!isUserLoggedIN && (
            <Nav>
              <Nav.Link href={env.routes.login}>Login</Nav.Link>
              <Nav.Link href={env.routes.signup}>Sign Up</Nav.Link>
            </Nav>
          )}
          {isUserLoggedIN && (
            <>
              <span>{user.email}</span> &nbsp;
              <Nav>
                <Nav.Link href={env.routes.logout}>Logout</Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
