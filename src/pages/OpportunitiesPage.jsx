import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import PropertyFilter from '../components/PropertyFilter';
import PropertyResults from '../components/PropertyResults';
import axios from 'axios';

const OpportunitiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (filters) => {
        setIsLoading(true);
        try {
            // Tenta buscar da função serverless (backend)
            // Em ambiente local sem netlify dev, isso vai falhar e cair no catch
            const response = await axios.post('/.netlify/functions/search-properties', filters);

            if (response.data && Array.isArray(response.data)) {
                setProperties(response.data);
            } else {
                throw new Error('Formato de resposta inválido');
            }
        } catch (error) {
            console.warn('Erro ao buscar do backend, usando dados locais:', error);

            // Fallback para dados locais (para desenvolvimento sem netlify dev)
            const mockData = [
                {
                    id: 1,
                    price: 450000,
                    address: 'Rua das Flores, 123',
                    locality: filters.locality || 'Rio de Janeiro',
                    neighborhood: filters.neighborhood || 'Copacabana',
                    bedrooms: 3,
                    garageSpaces: 2,
                    area: 85,
                    source: 'zapimoveis',
                    url: 'https://www.zapimoveis.com.br',
                    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500',
                    scrapedAt: new Date().toISOString(),
                    estimatedROI: 8.5
                },
                {
                    id: 2,
                    price: 380000,
                    address: 'Av. Atlântica, 456',
                    locality: filters.locality || 'Rio de Janeiro',
                    neighborhood: 'Ipanema',
                    bedrooms: 2,
                    garageSpaces: 1,
                    area: 70,
                    source: 'olx',
                    url: 'https://www.olx.com.br',
                    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500',
                    scrapedAt: new Date().toISOString()
                },
                {
                    id: 3,
                    price: 620000,
                    address: 'Rua Visconde de Pirajá, 789',
                    locality: filters.locality || 'Rio de Janeiro',
                    neighborhood: 'Leblon',
                    bedrooms: 4,
                    garageSpaces: 3,
                    area: 120,
                    source: 'webimoveis',
                    url: 'https://www.webimoveis.com.br',
                    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
                    metroDistance: 0.5,
                    scrapedAt: new Date().toISOString(),
                    estimatedROI: 12.3
                },
                {
                    id: 4,
                    price: 550000,
                    address: 'Rua Barata Ribeiro, 500',
                    locality: filters.locality || 'Rio de Janeiro',
                    neighborhood: 'Copacabana',
                    bedrooms: 2,
                    garageSpaces: 1,
                    area: 80,
                    source: 'zapimoveis',
                    url: 'https://www.zapimoveis.com.br',
                    image: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=500',
                    scrapedAt: new Date().toISOString(),
                    estimatedROI: 9.1
                }
            ];

            // Filtragem local simples
            let filtered = mockData;
            if (filters.neighborhood) {
                filtered = filtered.filter(p => p.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase()));
            }

            setTimeout(() => {
                setProperties(filtered);
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleSelection = (propertyId) => {
        setSelectedProperties(prev => {
            if (prev.includes(propertyId)) {
                return prev.filter(id => id !== propertyId);
            } else {
                return [...prev, propertyId];
            }
        });
    };

    const handleShowSelected = () => {
        const selected = properties.filter(p => selectedProperties.includes(p.id));
        navigate('/oportunidades-selecionadas', { state: { selectedProperties: selected } });
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-dark-background)',
            color: 'var(--color-dark-text-primary)',
            padding: 'var(--space-8) var(--space-6)'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginBottom: 'var(--space-8)',
                        textAlign: 'center'
                    }}
                >
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 'var(--font-weight-bold)',
                        background: 'linear-gradient(135deg, var(--color-primary-400), var(--color-accent-400))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: 'var(--space-3)'
                    }}>
                        Gestão de Oportunidades
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--color-dark-text-muted)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Encontre as melhores oportunidades de investimento imobiliário
                    </p>
                </motion.header>

                {/* Filters */}
                <PropertyFilter onSearch={handleSearch} isLoading={isLoading} />

                {/* Show Selected Button */}
                {selectedProperties.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            marginTop: 'var(--space-6)',
                            marginBottom: 'var(--space-6)',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <button
                            className="btn btn-accent"
                            onClick={handleShowSelected}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                fontSize: '1rem',
                                padding: 'var(--space-4) var(--space-6)'
                            }}
                        >
                            <Eye size={20} />
                            Mostrar Selecionadas ({selectedProperties.length})
                        </button>
                    </motion.div>
                )}

                {/* Results */}
                {properties.length > 0 && (
                    <div style={{ marginTop: 'var(--space-8)' }}>
                        <PropertyResults
                            properties={properties}
                            isLoading={isLoading}
                            selectedProperties={selectedProperties}
                            onToggleSelection={handleToggleSelection}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OpportunitiesPage;
