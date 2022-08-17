import React from 'react';
import {Table,Button, Form} from 'react-bootstrap';

class Alunos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      nome: "",
      email: "",
      alunos: [],
    };
  }

  componentDidMount() {
    this.buscarAluno();
  }

  componentWillUnmount() {}

  buscarAluno = () => {
    fetch("http://localhost:5000/alunos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        this.setState({ alunos: dados });
      });
  };

  deletarAluno = (id) => {
    fetch("http://localhost:5000/alunos" + id, { method: "DELETE" }).then(
      (resposta) => {
        if (resposta.ok) {
          this.buscarAluno();
        }
      }
    );
  };

  carregarDados = (id) => {
    fetch("http://localhost:5000/alunos" + id, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((aluno) => {
        this.setState({
          id: aluno.id,
          nome: aluno.nome,
          email: aluno.email,
        });
      });
  };

  cadastraAluno = (aluno) => {
    fetch("http://localhost:5000/alunos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(aluno),
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarAluno();
      } else {
        alert("Não Foi Possivel Cadastrar o Aluno");
      }
    });
  };

  atualizarAluno = (aluno) => {
    fetch("http://localhost:5000/alunos/" + aluno.id , {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(aluno),
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarAluno();
      } else {
        alert("Não Foi Possivel Atualizar o Aluno");
      }
    });
  };

  renderTabela() {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.alunos.map((aluno) => (
            <tr>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => this.carregarDados(aluno.id)}
                >
                  Atualizar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.deletarAluno(aluno.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  atualizaNome = (e) => {
    this.setState({
      nome: e.target.value,
    });
  };

  atualizaEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  submit = () => {
    if (this.state.id == 0) {
      const aluno = {
        nome: this.state.nome,
        email: this.state.email,
      };
      this.cadastraAluno();
    }else{
    const aluno = {
        nome: this.state.nome,
        email: this.state.email,
      };

      this.atualizarAluno();
    }
  }

  reset = () => {
    this.setState({
      id: 0,
      nome: '',
      email: ''
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" value={this.state.id} readOnly={true} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Nome do Aluno"
              value={this.state.nome}
              onchange={this.atualizaNome}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onchange={this.atualizaEmail}
            />
            <Form.Text className="text-muted">
              Use o Melhor E-mail do Aluno
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.submit}>
            Adicionar
          </Button>
          <Button variant="primary" type="submit" onClick={this.reset}>
            Novo
          </Button>
        </Form>

        {this.renderTabela()}
      </div>
    );
  }
}

export default Alunos;