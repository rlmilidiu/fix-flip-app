import { Link, useLocation } from 'react-router-dom';
import { Home, CheckCircle, Activity, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: 'var(--space-4) 0',
            position: 'sticky',
            top: 0,
            zIndex: 'var(--z-sticky)'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link to="/" style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)'
                }}>
                    {/* Logo Icon - House with Industrial Gears */}
                    <div style={{
                        position: 'relative',
                        width: '112px',
                        height: '112px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Outer glow circle */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: 'radial-gradient(circle, rgba(var(--primary-hue), 70%, 55%, 0.3), transparent)',
                            borderRadius: '50%',
                            filter: 'blur(16px)'
                        }} />

                        {/* Main icon container */}
                        <div style={{
                            position: 'relative',
                            width: '96px',
                            height: '96px',
                            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                            borderRadius: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.1)',
                            border: '3px solid rgba(255,255,255,0.15)',
                            overflow: 'visible'
                        }}>
                            {/* House + Industrial Gears SVG */}
                            <svg width="90" height="90" viewBox="0 0 50 50" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                                <defs>
                                    {/* Metallic gradient for gears */}
                                    <linearGradient id="metalGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#e8eaed" />
                                        <stop offset="30%" stopColor="#b8bdc4" />
                                        <stop offset="60%" stopColor="#8a9099" />
                                        <stop offset="100%" stopColor="#6b7178" />
                                    </linearGradient>
                                    <linearGradient id="metalGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#d4d7db" />
                                        <stop offset="30%" stopColor="#a8adb5" />
                                        <stop offset="60%" stopColor="#7a8088" />
                                        <stop offset="100%" stopColor="#5c6269" />
                                    </linearGradient>
                                    {/* House gradient */}
                                    <linearGradient id="houseGradient" x1="5" y1="5" x2="45" y2="45">
                                        <stop offset="0%" stopColor="var(--color-primary-400)" />
                                        <stop offset="100%" stopColor="var(--color-accent-400)" />
                                    </linearGradient>
                                    {/* Radial gradient for gear depth */}
                                    <radialGradient id="gearDepth1">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                                    </radialGradient>
                                </defs>

                                {/* Large Gear 1 - Behind house, top right */}
                                <g transform="translate(38, 12)" opacity="0.85">
                                    <circle cx="0" cy="0" r="10" fill="url(#metalGradient1)" stroke="#4a5058" strokeWidth="1.5" />
                                    <circle cx="0" cy="0" r="10" fill="url(#gearDepth1)" />
                                    <circle cx="0" cy="0" r="4" fill="#5c6269" stroke="#3a3f45" strokeWidth="1" />
                                    {/* Gear teeth - 8 teeth */}
                                    <rect x="-1.5" y="-12" width="3" height="3" fill="url(#metalGradient1)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    <rect x="-1.5" y="9" width="3" height="3" fill="url(#metalGradient1)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    <rect x="-12" y="-1.5" width="3" height="3" fill="url(#metalGradient1)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    <rect x="9" y="-1.5" width="3" height="3" fill="url(#metalGradient1)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    {/* Diagonal teeth */}
                                    <g transform="rotate(45)">
                                        <rect x="-1.5" y="-12" width="3" height="3" fill="url(#metalGradient1)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                        <rect x="-1.5" y="9" width="3" height="3" fill="url(#metalGradient1)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                        <rect x="-12" y="-1.5" width="3" height="3" fill="url(#metalGradient1)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                        <rect x="9" y="-1.5" width="3" height="3" fill="url(#metalGradient1)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    </g>
                                    {/* Center highlight */}
                                    <circle cx="-2" cy="-2" r="2" fill="#ffffff" opacity="0.4" />
                                </g>

                                {/* Large Gear 2 - Behind house, bottom right, interlocking */}
                                <g transform="translate(35, 32)" opacity="0.85">
                                    <circle cx="0" cy="0" r="12" fill="url(#metalGradient2)" stroke="#4a5058" strokeWidth="1.5" />
                                    <circle cx="0" cy="0" r="12" fill="url(#gearDepth1)" />
                                    <circle cx="0" cy="0" r="5" fill="#5c6269" stroke="#3a3f45" strokeWidth="1" />
                                    {/* Gear teeth - 8 teeth */}
                                    <rect x="-1.8" y="-14.5" width="3.6" height="3.5" fill="url(#metalGradient2)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    <rect x="-1.8" y="11" width="3.6" height="3.5" fill="url(#metalGradient2)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    <rect x="-14.5" y="-1.8" width="3.5" height="3.6" fill="url(#metalGradient2)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    <rect x="11" y="-1.8" width="3.5" height="3.6" fill="url(#metalGradient2)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    {/* Diagonal teeth */}
                                    <g transform="rotate(45)">
                                        <rect x="-1.8" y="-14.5" width="3.6" height="3.5" fill="url(#metalGradient2)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                        <rect x="-1.8" y="11" width="3.6" height="3.5" fill="url(#metalGradient2)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                        <rect x="-14.5" y="-1.8" width="3.5" height="3.6" fill="url(#metalGradient2)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                        <rect x="11" y="-1.8" width="3.5" height="3.6" fill="url(#metalGradient2)" stroke="#4a5058" strokeWidth="0.5" rx="0.5" />
                                    </g>
                                    {/* Center highlight */}
                                    <circle cx="-2.5" cy="-2.5" r="2.5" fill="#ffffff" opacity="0.4" />
                                </g>

                                {/* House - In front of gears */}
                                <g>
                                    <path d="M8 25L12 21M12 21L25 8L38 21M12 21V40C12 41.1 12.9 42 14 42H20M38 21L42 25M38 21V40C38 41.1 37.1 42 36 42H30M20 42C21.1 42 22 41.1 22 40V32C22 30.9 22.9 30 24 30H26C27.1 30 28 30.9 28 32V40C28 41.1 28.9 42 30 42M20 42H30"
                                        stroke="url(#houseGradient)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </Link>

                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <Link to="/">
                        <motion.div
                            className="btn btn-ghost"
                            style={{
                                background: isActive('/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                borderColor: isActive('/') ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Activity size={18} />
                            Dashboard
                        </motion.div>
                    </Link>

                    <Link to="/oportunidades">
                        <motion.div
                            className="btn btn-ghost"
                            style={{
                                background: isActive('/oportunidades') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                borderColor: isActive('/oportunidades') ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Search size={18} />
                            Buscar Imóveis
                        </motion.div>
                    </Link>

                    <Link to="/oportunidades-selecionadas">
                        <motion.div
                            className="btn btn-ghost"
                            style={{
                                background: isActive('/oportunidades-selecionadas') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                borderColor: isActive('/oportunidades-selecionadas') ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CheckCircle size={18} />
                            Selecionadas
                        </motion.div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
