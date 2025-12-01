import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PropertyResults from '../components/PropertyResults';

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [activeProperties, setActiveProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const filters = location.state?.filters;

    useEffect(() => {
        const fetchProperties = async () => {
            setIsLoading(true);
            try {
                // Simular busca de API - substitua com sua chamada real
                // const response = await axios.post('/api/search', filters);

                // Dados mockados para demonstração
                const mockData = [
                    {
                        id: 1,
                        price: 450000,
                        address: null,
                        locality: 'Rio de Janeiro',
                        neighborhood: 'Copacabana',
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
                        address: null,
                        locality: 'Rio de Janeiro',
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
                        address: null,
                        locality: 'Rio de Janeiro',
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
                    }
                ];

                setTimeout(() => {
                    setProperties(mockData);
                    setIsLoading(false);
                }, 1500);
            } catch (error) {
                console.error('Erro ao buscar imóveis:', error);
                setIsLoading(false);
            }
        };

        if (filters) {
            fetchProperties();
        } else {
            // Se não houver filtros, redirecionar de volta ou mostrar mensagem
            setIsLoading(false);
        }
    }, [filters]);

    const handleToggleActivation = (propertyId) => {
        setActiveProperties(prev => {
            if (prev.includes(propertyId)) {
                return prev.filter(id => id !== propertyId);
            } else {
                return [...prev, propertyId];
            }
        });
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
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginBottom: 'var(--space-8)'
                    }}
                >
                    <button
                        className="btn btn-ghost"
                        onClick={() => navigate('/')}
                        style={{
                            marginBottom: 'var(--space-4)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                        }}
                    >
                        <ArrowLeft size={20} />
                        Voltar para Busca
                    </button>

                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'var(--font-weight-bold)',
                        background: 'linear-gradient(135deg, var(--color-primary-400), var(--color-accent-400))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: 'var(--space-3)'
                    }}>
                        Resultados da Busca
                    </h1>
                </motion.div>

                {/* Results */}
                <PropertyResults
                    properties={properties}
                    isLoading={isLoading}
                    activeProperties={activeProperties}
                    onToggleActivation={handleToggleActivation}
                />

                {/* Show Active Button */}
                {activeProperties.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            position: 'fixed',
                            bottom: 'var(--space-6)',
                            right: 'var(--space-6)',
                            zIndex: 100
                        }}
                    >
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                const selected = properties.filter(p => activeProperties.includes(p.id));
                                navigate('/oportunidades-selecionadas', { state: { selectedProperties: selected } });
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                fontSize: '1rem',
                                padding: 'var(--space-4) var(--space-6)',
                                boxShadow: 'var(--shadow-lg)'
                            }}
                        >
                            Mostrar Ativos ({activeProperties.length})
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ResultsPage;
