import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropertyFilter from '../components/PropertyFilter';

const OpportunitiesPage = () => {
    const navigate = useNavigate();

    const handleSearch = (filters) => {
        navigate('/resultados', { state: { filters } });
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
                <PropertyFilter onSearch={handleSearch} isLoading={false} />
            </div>
        </div>
    );
};

export default OpportunitiesPage;
