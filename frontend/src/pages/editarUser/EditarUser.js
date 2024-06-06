import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './EditarUser.css';

const EditarUser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        cpf: '',
        cnpj: '',
        cep: '',
        numberAddress: ''
    });
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios.get('https://backend-final-ytc2.onrender.com/user/', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    handleError(error, 'Erro ao buscar os dados do usuário');
                });
        }
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const verificadorNumberAddress = isNaN(parseInt(user.numberAddress));
            if (verificadorNumberAddress) {
                setError("numberAddress em formato invalido");
                throw new Error("numberAddress em formato invalido");
            }
            user.numberAddress = parseInt(user.numberAddress);

            const response = await axios.put('https://backend-final-ytc2.onrender.com/user/', user, {
                headers: { Authorization: `Bearer ${token}` }
            });
           
            if (response.status >= 200 && response.status < 300) {
                toast.success('Usuário atualizado com sucesso!');
            }
        } catch (err) {
            handleError(err, 'Erro ao atualizar o usuário');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete('https://backend-final-ytc2.onrender.com/user/', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status >= 200 && response.status < 300) {
                toast.success('Usuário deletado com sucesso!');
                localStorage.removeItem('token');
                setRedirect(true);
            }
        } catch (err) {
            handleError(err, 'Erro ao deletar o usuário');
        }
    };

    const handleError = (err, defaultMessage) => {
        if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
            toast.error(err.response.data.error);
        } else if (err.message) {
            setError(err.message);
            toast.error(err.message);
        } else {
            setError(defaultMessage);
            toast.error(defaultMessage);
        }
    };

    if (redirect || !token) {
        return <Navigate to="/login" />;
    }

    return (
        <Container className="editar-user-container mt-5">
            <ToastContainer />
            <h1>Editar Usuário</h1>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formName">
                    <Form.Label column sm={2}>Nome</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Digite seu nome"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Digite seu email"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formCpf">
                    <Form.Label column sm={2}>CPF</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="cpf"
                            value={user.cpf}
                            onChange={handleChange}
                            placeholder="Digite seu CPF"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formCnpj">
                    <Form.Label column sm={2}>CNPJ</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="cnpj"
                            value={user.cnpj}
                            onChange={handleChange}
                            placeholder="Digite seu CNPJ"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formCep">
                    <Form.Label column sm={2}>CEP</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="cep"
                            value={user.cep}
                            onChange={handleChange}
                            placeholder="Digite seu CEP"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formNumberAddress">
                    <Form.Label column sm={2}>Número do Endereço</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            name="numberAddress"
                            value={user.numberAddress}
                            onChange={handleChange}
                            placeholder="Digite o número do seu endereço"
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">Salvar</Button>
                <Button variant="danger" className="ms-2" onClick={handleDelete}>Deletar Conta</Button>
            </Form>
        </Container>
    );
};

export default EditarUser;
