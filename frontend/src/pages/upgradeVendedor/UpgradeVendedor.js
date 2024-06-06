import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import './UpgradeVendedor.css';

const UpgradeVendendor = () => {
    const [formData, setFormData] = useState({
        cnpj: '',
        name: '',
        description: '',
        categories: [],
    });

    const categoriesOptions = [
        'Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5',
        'Categoria 6', 'Categoria 7', 'Categoria 8', 'Categoria 9', 'Categoria 10'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCategoriesChange = (e) => {
        const options = e.target.options;
        const selectedCategories = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedCategories.push(options[i].value);
            }
        }
        setFormData({
            ...formData,
            categories: selectedCategories,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
          await axios.put('https://backend-final-ytc2.onrender.com/user/access/add', {
                newAccessName: "Vendedor"
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            await axios.post('https://backend-final-ytc2.onrender.com/store/', {
                name: formData.name,
                description: formData.description,
                categories: formData.categories,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            

            alert('Loja criada e acesso atualizado com sucesso!');
        } catch (error) {
          
            console.error('Erro ao criar loja ou atualizar acesso:', error);
            alert('Erro ao criar loja ou atualizar acesso.');
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="cnpj">
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control
                        type="text"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Nome da Loja</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Descrição da Loja</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="categories">
                    <Form.Label>Categorias</Form.Label>
                    <Form.Control
                        as="select"
                        multiple
                        name="categories"
                        value={formData.categories}
                        onChange={handleCategoriesChange}
                        required
                    >
                        {categoriesOptions.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    );
};

export default UpgradeVendendor;
