import { motion } from 'framer-motion';
import { MapPin, Bed, Car, Maximize2, ExternalLink, TrendingUp, Calendar } from 'lucide-react';

const PropertyCard = ({ property, index, isActive, onToggleActivation }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getSourceBadgeColor = (source) => {
        const colors = {
            'zapimoveis': 'var(--color-primary-500)',
            'olx': 'var(--color-accent-500)',
            'webimoveis': 'var(--color-success-500)'
        };
        return colors[source?.toLowerCase()] || 'var(--color-primary-500)';
    };

    return (
        <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={{
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                border: isActive ? '2px solid var(--color-success-500)' : 'none'
            }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Activation Toggle */}
            <div style={{
                position: 'absolute',
                top: 'var(--space-3)',
                left: 'var(--space-3)',
                zIndex: 10
            }}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleActivation(property.id);
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        cursor: 'pointer',
                        background: isActive ? 'var(--color-success-500)' : 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(10px)',
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem',
                        fontWeight: 'var(--font-weight-semibold)',
                        border: 'none',
                        color: 'white',
                        boxShadow: isActive ? '0 0 10px rgba(var(--success-hue), 0.5)' : 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: isActive ? 'white' : 'var(--color-dark-text-muted)',
                        boxShadow: isActive ? '0 0 5px white' : 'none'
                    }} />
                    <span>
                        {isActive ? 'ATIVO' : 'ATIVAR'}
                    </span>
                </motion.button>
            </div>

            {/* Image */}
            {property.image && (
                <div style={{
                    width: '100%',
                    height: '220px',
                    background: `linear-gradient(135deg, var(--color-dark-elevated), var(--color-dark-surface))`,
                    backgroundImage: `url(${property.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}>
                    {/* Source Badge */}
                    <div style={{
                        position: 'absolute',
                        top: 'var(--space-3)',
                        right: 'var(--space-3)',
                        background: getSourceBadgeColor(property.source),
                        color: 'white',
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.75rem',
                        fontWeight: 'var(--font-weight-bold)',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {property.source || 'ZAP'}
                    </div>

                    {/* ROI Badge (if available) */}
                    {property.estimatedROI && (
                        <div style={{
                            position: 'absolute',
                            top: 'var(--space-3)',
                            left: 'var(--space-3)',
                            background: 'var(--color-success-500)',
                            color: 'white',
                            padding: 'var(--space-2) var(--space-3)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.75rem',
                            fontWeight: 'var(--font-weight-bold)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-1)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <TrendingUp size={14} />
                            ROI: {property.estimatedROI}%
                        </div>
                    )}
                </div>
            )}

            {/* Content */}
            <div style={{ padding: 'var(--space-5)' }}>
                {/* Price */}
                <h3 style={{
                    fontSize: '1.75rem',
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
                    <MapPin size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                        {property.address || 'Rua não divulgada'}
                    </span>
                </div>

                {/* Features */}
                <div style={{
                    display: 'flex',
                    gap: 'var(--space-5)',
                    marginBottom: 'var(--space-4)',
                    paddingBottom: 'var(--space-4)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    {property.bedrooms && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            color: 'var(--color-dark-text-muted)',
                            fontSize: '0.9rem'
                        }}>
                            <Bed size={18} style={{ color: 'var(--color-primary-400)' }} />
                            <span>{property.bedrooms} quartos</span>
                        </div>
                    )}

                    {property.garageSpaces && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            color: 'var(--color-dark-text-muted)',
                            fontSize: '0.9rem'
                        }}>
                            <Car size={18} style={{ color: 'var(--color-primary-400)' }} />
                            <span>{property.garageSpaces} vagas</span>
                        </div>
                    )}

                    {property.area && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            color: 'var(--color-dark-text-muted)',
                            fontSize: '0.9rem'
                        }}>
                            <Maximize2 size={18} style={{ color: 'var(--color-primary-400)' }} />
                            <span>{property.area}m²</span>
                        </div>
                    )}
                </div>

                {/* Additional Info */}
                {property.metroDistance && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-4)',
                        fontSize: '0.85rem',
                        color: 'var(--color-dark-text-muted)'
                    }}>
                        <span className="badge badge-primary">
                            🚇 {property.metroDistance}km do metrô
                        </span>
                    </div>
                )}

                {/* Scraped Date */}
                {property.scrapedAt && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        fontSize: '0.8rem',
                        color: 'var(--color-dark-text-muted)',
                        marginBottom: 'var(--space-4)'
                    }}>
                        <Calendar size={14} />
                        <span>Atualizado: {new Date(property.scrapedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                )}

                {/* Action Button */}
                <a
                    href={property.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    Ver Anúncio
                    <ExternalLink size={18} />
                </a>
            </div>
        </motion.div>
    );
};

const PropertyResults = ({ properties, isLoading, activeProperties = [], onToggleActivation }) => {
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-10)',
                gap: 'var(--space-4)'
            }}>
                <div className="spinner" />
                <p style={{ color: 'var(--color-dark-text-muted)' }}>
                    Buscando imóveis nos portais...
                </p>
            </div>
        );
    }

    if (!properties || properties.length === 0) {
        return (
            <motion.div
                className="glass-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    padding: 'var(--space-10)',
                    textAlign: 'center'
                }}
            >
                <h3 style={{ marginBottom: 'var(--space-3)' }}>
                    Nenhum imóvel encontrado
                </h3>
                <p style={{ color: 'var(--color-dark-text-muted)' }}>
                    Tente ajustar os filtros de busca ou expandir os critérios.
                </p>
            </motion.div>
        );
    }

    return (
        <div>
            {/* Results Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    marginBottom: 'var(--space-6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <h2 style={{ fontSize: '1.5rem' }}>
                    {properties.length} {properties.length === 1 ? 'Imóvel Encontrado' : 'Imóveis Encontrados'}
                </h2>

                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <span className="badge badge-primary">
                        ZAP Imóveis
                    </span>
                    <span className="badge" style={{
                        background: 'rgba(var(--accent-hue), 70%, 55%, 0.15)',
                        color: 'var(--color-accent-400)',
                        border: '1px solid rgba(var(--accent-hue), 70%, 55%, 0.3)'
                    }}>
                        OLX
                    </span>
                    <span className="badge badge-success">
                        WebImóveis
                    </span>
                </div>
            </motion.div>

            {/* Properties Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: 'var(--space-6)'
            }}>
                {properties.map((property, index) => (
                    <PropertyCard
                        key={property.id || index}
                        property={property}
                        index={index}
                        isActive={activeProperties.includes(property.id)}
                        onToggleActivation={onToggleActivation}
                    />
                ))}
            </div>
        </div>
    );
};

export default PropertyResults;
