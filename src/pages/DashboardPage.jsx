import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

const DashboardPage = () => {

    const stats = [
        { title: 'Oportunidades Ativas', value: '12', icon: Activity, color: 'var(--color-primary-500)' },
        { title: 'ROI Médio', value: '15.4%', icon: TrendingUp, color: 'var(--color-success-500)' },
        { title: 'Investimento Total', value: 'R$ 4.2M', icon: DollarSign, color: 'var(--color-accent-500)' },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-dark-background)',
            color: 'var(--color-dark-text-primary)',
            padding: 'var(--space-12) var(--space-6)',
            paddingTop: '120px'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: 'var(--space-10)', marginTop: '80px' }}
                >
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'var(--font-weight-bold)',
                        marginBottom: 'var(--space-2)'
                    }}>
                        Dashboard
                    </h1>
                    <p style={{ color: 'var(--color-dark-text-muted)' }}>
                        Visão geral do seu negócio de Fix & Flip
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--space-6)',
                    marginBottom: 'var(--space-8)'
                }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{ padding: 'var(--space-6)' }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 'var(--space-4)'
                            }}>
                                <h3 style={{
                                    fontSize: '1rem',
                                    color: 'var(--color-dark-text-muted)',
                                    fontWeight: 'var(--font-weight-medium)'
                                }}>
                                    {stat.title}
                                </h3>
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                            <p style={{
                                fontSize: '2rem',
                                fontWeight: 'var(--font-weight-bold)',
                                color: 'var(--color-dark-text)'
                            }}>
                                {stat.value}
                            </p>
                        </motion.div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default DashboardPage;
