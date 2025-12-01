import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Bed, Car, Maximize2, ExternalLink, TrendingUp, Calendar, Download, Share2, CheckCircle, Circle } from 'lucide-react';

const SelectedOpportunitiesPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedProperties = location.state?.selectedProperties || [];
    const [activeProperties, setActiveProperties] = useState(selectedProperties.map(p => p.id));

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0
        }).format(price);
    };

    const calculateTotal = () => {
        return selectedProperties.reduce((sum, property) => sum + property.price, 0);
    };

    const calculateAvgROI = () => {
        const withROI = selectedProperties.filter(p => p.estimatedROI);
        if (withROI.length === 0) return null;
        const avg = withROI.reduce((sum, p) => sum + p.estimatedROI, 0) / withROI.length;
        return avg.toFixed(2);
    };

    const toggleActiveStatus = (propertyId) => {
        setActiveProperties(prev => {
            if (prev.includes(propertyId)) {
                return prev.filter(id => id !== propertyId);
            } else {
                return [...prev, propertyId];
            }
        });
    };

    const handleExport = () => {
        // Função para exportar dados (pode ser implementada depois)
        alert('Funcionalidade de exportação será implementada em breve!');
    };

    const handleShare = () => {
        // Função para compartilhar (pode ser implementada depois)
        alert('Funcionalidade de compartilhamento será implementada em breve!');
    };

    if (selectedProperties.length === 0) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'var(--color-dark-background)',
                color: 'var(--color-dark-text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-6)'
            }}>
                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        padding: 'var(--space-10)',
                        textAlign: 'center',
                        maxWidth: '500px'
                    }}
                >
                    <h2 style={{ marginBottom: 'var(--space-4)' }}>
                        Nenhuma oportunidade selecionada
                    </h2>
                    <p style={{
                        color: 'var(--color-dark-text-muted)',
                        marginBottom: 'var(--space-6)'
                    }}>
                        Volte para a página de gestão e selecione algumas oportunidades para visualizar aqui.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                        }}
                    >
                        <ArrowLeft size={20} />
                        Voltar para Gestão
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-dark-background)',
            color: 'var(--color-dark-text-primary)',
            padding: 'var(--space-8) var(--space-6)'
        }}>
            <div style={{
                maxWidth: '1200px',
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
                        Voltar para Gestão
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
                        Oportunidades Selecionadas
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--color-dark-text-muted)'
                    }}>
                        {selectedProperties.length} {selectedProperties.length === 1 ? 'imóvel selecionado' : 'imóveis selecionados'}
                        {activeProperties.length > 0 && ` • ${activeProperties.length} ${activeProperties.length === 1 ? 'ativo' : 'ativos'}`}
                    </p>
                </motion.div>

                {/* Summary Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 'var(--space-5)',
                        marginBottom: 'var(--space-8)'
                    }}
                >
                    <div className="glass-card" style={{ padding: 'var(--space-5)' }}>
                        <h3 style={{
                            fontSize: '0.9rem',
                            color: 'var(--color-dark-text-muted)',
                            marginBottom: 'var(--space-2)'
                        }}>
                            Valor Total
                        </h3>
                        <p style={{
                            fontSize: '2rem',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-primary-400)'
                        }}>
                            {formatPrice(calculateTotal())}
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: 'var(--space-5)' }}>
                        <h3 style={{
                            fontSize: '0.9rem',
                            color: 'var(--color-dark-text-muted)',
                            marginBottom: 'var(--space-2)'
                        }}>
                            Quantidade
                        </h3>
                        <p style={{
                            fontSize: '2rem',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-accent-400)'
                        }}>
                            {selectedProperties.length}
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: 'var(--space-5)' }}>
                        <h3 style={{
                            fontSize: '0.9rem',
                            color: 'var(--color-dark-text-muted)',
                            marginBottom: 'var(--space-2)'
                        }}>
                            Ativos
                        </h3>
                        <p style={{
                            fontSize: '2rem',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-success-400)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                        }}>
                            <CheckCircle size={24} />
                            {activeProperties.length}
                        </p>
                    </div>

                    {calculateAvgROI() && (
                        <div className="glass-card" style={{ padding: 'var(--space-5)' }}>
                            <h3 style={{
                                fontSize: '0.9rem',
                                color: 'var(--color-dark-text-muted)',
                                marginBottom: 'var(--space-2)'
                            }}>
                                ROI Médio
                            </h3>
                            <p style={{
                                fontSize: '2rem',
                                fontWeight: 'var(--font-weight-bold)',
                                color: 'var(--color-success-400)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)'
                            }}>
                                <TrendingUp size={24} />
                                {calculateAvgROI()}%
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: 'flex',
                        gap: 'var(--space-4)',
                        marginBottom: 'var(--space-6)',
                        flexWrap: 'wrap'
                    }}
                >
                    <button
                        className="btn btn-primary"
                        onClick={handleExport}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                        }}
                    >
                        <Download size={18} />
                        Exportar Lista
                    </button>
                    <button
                        className="btn btn-ghost"
                        onClick={handleShare}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                        }}
                    >
                        <Share2 size={18} />
                        Compartilhar
                    </button>
                </motion.div>

                {/* Properties List */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-6)'
                }}>
                    {selectedProperties.map((property, index) => {
                        const isActive = activeProperties.includes(property.id);

                        return (
                            <motion.div
                                key={property.id}
                                className="glass-card"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                style={{
                                    padding: 'var(--space-6)',
                                    display: 'flex',
                                    gap: 'var(--space-6)',
                                    flexWrap: 'wrap',
                                    border: isActive ? '2px solid var(--color-success-500)' : 'none',
                                    position: 'relative'
                                }}
                            >
                                {/* Active Badge */}
                                {isActive && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 'var(--space-4)',
                                        right: 'var(--space-4)',
                                        background: 'var(--color-success-500)',
                                        color: 'white',
                                        padding: 'var(--space-2) var(--space-4)',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.85rem',
                                        fontWeight: 'var(--font-weight-bold)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-2)',
                                        boxShadow: '0 4px 15px rgba(var(--success-hue), 60%, 45%, 0.4)'
                                    }}>
                                        <CheckCircle size={16} />
                                        ATIVO
                                    </div>
                                )}

                                {/* Image */}
                                {property.image && (
                                    <div style={{
                                        width: '250px',
                                        height: '200px',
                                        borderRadius: 'var(--radius-lg)',
                                        background: `url(${property.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        flexShrink: 0
                                    }} />
                                )}

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: '300px' }}>
                                    {/* Price */}
                                    <h3 style={{
                                        fontSize: '2rem',
                                        fontWeight: 'var(--font-weight-bold)',
                                        background: 'linear-gradient(135deg, var(--color-primary-400), var(--color-accent-400))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        marginBottom: 'var(--space-2)'
                                    }}>
                                        {formatPrice(property.price)}
                                    </h3>

                                    {/* Address */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 'var(--space-2)',
                                        marginBottom: 'var(--space-4)',
                                        color: 'var(--color-dark-text-muted)'
                                    }}>
                                        <MapPin size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '1rem' }}>
                                            {property.address || 'Rua não divulgada'}
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 'var(--space-6)',
                                        marginBottom: 'var(--space-4)',
                                        flexWrap: 'wrap'
                                    }}>
                                        {property.bedrooms && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-2)'
                                            }}>
                                                <Bed size={20} style={{ color: 'var(--color-primary-400)' }} />
                                                <span>{property.bedrooms} quartos</span>
                                            </div>
                                        )}
                                        {property.garageSpaces && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-2)'
                                            }}>
                                                <Car size={20} style={{ color: 'var(--color-primary-400)' }} />
                                                <span>{property.garageSpaces} vagas</span>
                                            </div>
                                        )}
                                        {property.area && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-2)'
                                            }}>
                                                <Maximize2 size={20} style={{ color: 'var(--color-primary-400)' }} />
                                                <span>{property.area}m²</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Badges */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 'var(--space-3)',
                                        marginBottom: 'var(--space-4)',
                                        flexWrap: 'wrap'
                                    }}>
                                        <span className="badge badge-primary">
                                            {property.source?.toUpperCase() || 'ZAP'}
                                        </span>
                                        {property.estimatedROI && (
                                            <span className="badge badge-success">
                                                <TrendingUp size={14} />
                                                ROI: {property.estimatedROI}%
                                            </span>
                                        )}
                                        {property.scrapedAt && (
                                            <span className="badge" style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                color: 'var(--color-dark-text-muted)'
                                            }}>
                                                <Calendar size={14} />
                                                {new Date(property.scrapedAt).toLocaleDateString('pt-BR')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 'var(--space-3)',
                                        flexWrap: 'wrap'
                                    }}>
                                        {/* Toggle Active Button */}
                                        <motion.button
                                            className={isActive ? "btn btn-success" : "btn btn-ghost"}
                                            onClick={() => toggleActiveStatus(property.id)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-2)',
                                                background: isActive
                                                    ? 'linear-gradient(135deg, var(--color-success-600), var(--color-success-500))'
                                                    : undefined,
                                                boxShadow: isActive
                                                    ? '0 4px 15px rgba(var(--success-hue), 60%, 45%, 0.3)'
                                                    : undefined
                                            }}
                                        >
                                            {isActive ? <CheckCircle size={18} /> : <Circle size={18} />}
                                            {isActive ? 'ATIVO' : 'Marcar como Ativo'}
                                        </motion.button>

                                        {/* View Ad Button */}
                                        <a
                                            href={property.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-2)'
                                            }}
                                        >
                                            Ver Anúncio
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SelectedOpportunitiesPage;
