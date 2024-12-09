import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './MinhaLoja.css';
import axios from 'axios';

const categoriesList =[
    "Aeronaves",
    "Alimentos em Geral",
    "Alimentos para Nutrição Animal",
    "Animais",
    "Caminhões",
    "Carrocerias / Furgões",
    "Colheitadeiras / Colhedoras",
    "Defensivos Agrícolas",
    "Embalagens",
    "Exportação / Importação",
    "Fazendas / Imóveis Rurais",
    "Fertilizantes Agrícolas",
    "Implementos",
    "Instalações",
    "Máquinas / Equipamentos"
];

const MinhaLoja = () => {
    const [storeData, setStoreData] = useState({
        storeId: '',
        userId: '',
        name: '',
        description: '',
        images: [],
        categories: [],
        contactInfo: {
            address: '',
            email: '',
            phoneNumber: '',
        },
        openingHours: [],
        returnPolicy: '',
    });

    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await axios.get(`https://backend-final-ytc2.onrender.com/store/`);
               
                if (response.data) {
                    setStoreData(response.data[0]);
                } else {
                    setStoreData({
                        storeId: 'defaultStoreId',
                        userId: 'defaultUserId',
                        name: 'Minha Loja',
                        description: 'Descrição da loja',
                        images: [],
                        categories: [],
                        contactInfo: {
                            address: 'Endereço genérico',
                            email: 'loja@gmail.com',
                            phoneNumber: '99999-9999',
                        },
                        openingHours: ['09:00 - 18:00'],
                        returnPolicy: 'Política de devolução padrão',
                    });
                }
            } catch (error) {
                console.error(error);
                setStoreData({
                    storeId: 'defaultStoreId',
                    userId: 'defaultUserId',
                    name: 'Minha Loja',
                    description: 'Descrição da loja',
                    images: [],
                    categories: [],
                    contactInfo: {
                        address: 'Endereço genérico',
                        email: 'loja@gmail.com',
                        phoneNumber: '99999-9999',
                    },
                    openingHours: ['09:00 - 18:00'],
                    returnPolicy: 'Política de devolução padrão',
                });
            }
        };

        fetchStore();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStoreData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleContactInfoChange = (e) => {
        const { name, value } = e.target;
        setStoreData(prevState => ({
            ...prevState,
            contactInfo: {
                ...prevState.contactInfo,
                [name]: value,
            },
        }));
    };

    const handleCategoryChange = (e) => {
        const { options } = e.target;
        const selectedCategories = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selectedCategories.push(options[i].value);
            }
        }
        setStoreData(prevState => ({
            ...prevState,
            categories: selectedCategories,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStoreData(prevState => ({
                    ...prevState,
                    images: [reader.result],
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async() => {
        try {
            console.log("aqui")
            const response = await axios.put('http://localhost:3333/store', {
                storeId:storeData.storeId,
                name: storeData.name,
                description: storeData.description,
                images: storeData.images,
                categories: storeData.categories,
                contactInfo: {
                    address: storeData.contactInfo.address,
                    email: storeData.contactInfo.email,
                    phoneNumber: storeData.contactInfo.phoneNumber,
                },
                openingHours: storeData.openingHours,
                returnPolicy: storeData.returnPolicy,
            });
            console.log(storeData.images)
         
            // Exibir mensagem de sucesso para o usuário, ou fazer qualquer outra operação necessária
        } catch (error) {
            console.error('Error saving store data:', error);
            // Exibir mensagem de erro para o usuário, ou fazer qualquer outra operação necessária
        }
    };

    return (
        <Container className="minha-loja-container mt-5">
            <h1>Minha Loja</h1>
            
            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formStoreName">
                            <Form.Label>Nome da Loja</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={storeData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formStoreDescription">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={storeData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formStoreImage">
                            <Form.Label>Imagem da Loja</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImageUpload}
                            />
                            {storeData.images[0] && (
                                <Card.Img variant="top" src={storeData.images[0]} className="mt-3" />
                            )}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formStoreCategories">
                            <Form.Label>Categorias</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                value={storeData.categories}
                                onChange={handleCategoryChange}
                            >
                                {categoriesList.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="formStoreAddress">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={storeData.contactInfo.address}
                                onChange={handleContactInfoChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formStoreEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={storeData.contactInfo.email}
                                onChange={handleContactInfoChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formStorePhoneNumber">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={storeData.contactInfo.phoneNumber}
                                onChange={handleContactInfoChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formStoreOpeningHours">
                            <Form.Label>Horário de Funcionamento</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="openingHours"
                                value={storeData.openingHours.join('\n')}
                                onChange={(e) => setStoreData(prevState => ({
                                    ...prevState,
                                    openingHours: e.target.value.split('\n'),
                                }))}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formStoreReturnPolicy">
                            <Form.Label>Política de Devolução</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="returnPolicy"
                                value={storeData.returnPolicy}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" onClick={handleSave}>
                    Salvar
                </Button>
            </Form>
        </Container>
    );
};

export default MinhaLoja;
