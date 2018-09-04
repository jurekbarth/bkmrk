import React from "react";
import ReactDOM from "react-dom";
import GraphiQL from "graphiql";
import fetch from "isomorphic-fetch";
import styled from "styled-components";

function graphQLFetcher(graphQLParams) {
  const token = localStorage.getItem("token");
  const authorization = token ? `Bearer ${token}` : null;
  return fetch("http://localhost:3000/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization
    },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json());
}

class AuthSetter extends React.Component {
  setToken = () => {
    const token = this.input.value;
    localStorage.setItem("token", token);
    console.log(`set token: ${token}`);
  };
  removeToken = () => {
    console.log(`remove token: ${localStorage.getItem("token")}`);
    localStorage.removeItem("token");
  };
  render() {
    return (
      <AuthSetterWrapper>
        <Input
          innerRef={comp => {
            this.input = comp;
          }}
          type="text"
        />
        <Button onClick={this.setToken}>Set Token</Button>
        <Button onClick={this.removeToken}>Remove Token</Button>
      </AuthSetterWrapper>
    );
  }
}

const App = () => (
  <ApplicationWrapper>
    <AuthSetter />
    <GraphiQLWrapper>
      <GraphiQL editorTheme="solarized dark" fetcher={graphQLFetcher} />
    </GraphiQLWrapper>
  </ApplicationWrapper>
);

const ApplicationWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const AuthSetterWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #ececec;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0 0.5em;
  width: 50%;
`;

const Button = styled.button`
background: linear-gradient(#f9f9f9,  #ececec)
color: #555;
margin: 0 0.5em;
padding: 0.3em 0.5em 0.5em;
`;

const GraphiQLWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
`;

ReactDOM.render(<App />, document.getElementById("root"));
