import { useState } from 'react';
import { MapPin, Home, DollarSign, Bed, Car, Train, Maximize2, Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyFilter = ({ onSearch, isLoading }) => {
  const [filters, setFilters] = useState({
    locality: 'Rio de Janeiro',
    neighborhood: 'Copacabana',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    garageSpaces: '',
    metroDistance: '',
    areaMin: '',
    areaMax: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    const num = value.replace(/\D/g, '');
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(num);
  };

  const handleCurrencyInput = (field, value) => {
    const num = value.replace(/\D/g, '');
    setFilters(prev => ({ ...prev, [field]: num }));
  };

  return (
    <motion.div
      className="glass-card"
      style={{ padding: 'var(--space-6)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-6)'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)'
        }}>
          <SlidersHorizontal size={28} style={{ color: 'var(--color-primary-500)' }} />
          Filtros de Busca
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Filters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-5)'
        }}>
          {/* Localidade */}
          <div className="form-group">
            <label className="form-label">
              <MapPin size={18} />
              Localidade
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: São Paulo, Rio de Janeiro..."
              value={filters.locality}
              onChange={(e) => handleChange('locality', e.target.value)}
            />
          </div>

          {/* Bairro */}
          <div className="form-group">
            <label className="form-label">
              <Home size={18} />
              Bairro
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Jardins, Copacabana..."
              value={filters.neighborhood}
              onChange={(e) => handleChange('neighborhood', e.target.value)}
            />
          </div>

          {/* Preço Mínimo */}
          <div className="form-group" style={{ marginLeft: 'var(--space-8)' }}>
            <label className="form-label">
              <DollarSign size={18} />
              Preço Mínimo
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="R$ 0"
              value={formatCurrency(filters.priceMin)}
              onChange={(e) => handleCurrencyInput('priceMin', e.target.value)}
            />
          </div>

          {/* Garagem */}
          <div className="form-group">
            <label className="form-label">
              <Car size={18} />
              Vagas de Garagem
            </label>
            <select
              className="form-select"
              value={filters.garageSpaces}
              onChange={(e) => handleChange('garageSpaces', e.target.value)}
            >
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>

          {/* Quartos */}
          <div className="form-group">
            <label className="form-label">
              <Bed size={18} />
              Quartos
            </label>
            <select
              className="form-select"
              value={filters.bedrooms}
              onChange={(e) => handleChange('bedrooms', e.target.value)}
            >
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Preço Máximo */}
          <div className="form-group" style={{ marginLeft: 'var(--space-8)' }}>
            <label className="form-label">
              <DollarSign size={18} />
              Preço Máximo
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="R$ 0"
              value={formatCurrency(filters.priceMax)}
              onChange={(e) => handleCurrencyInput('priceMax', e.target.value)}
            />
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <motion.div
          style={{ marginTop: 'var(--space-5)' }}
          initial={false}
        >
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{ marginBottom: showAdvanced ? 'var(--space-5)' : 0 }}
          >
            {showAdvanced ? 'Ocultar' : 'Mostrar'} Filtros Avançados
          </button>

          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-5)'
              }}
            >
              {/* Distância do Metrô */}
              <div className="form-group">
                <label className="form-label">
                  <Train size={18} />
                  Distância do Metrô (km)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <input
                    type="range"
                    className="range-slider"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.metroDistance || 0}
                    onChange={(e) => handleChange('metroDistance', e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <span style={{
                    minWidth: '60px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-primary-400)'
                  }}>
                    {filters.metroDistance || 0} km
                  </span>
                </div>
              </div>

              {/* Área Mínima */}
              <div className="form-group">
                <label className="form-label">
                  <Maximize2 size={18} />
                  Área Mínima (m²)
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Ex: 50"
                  value={filters.areaMin}
                  onChange={(e) => handleChange('areaMin', e.target.value)}
                />
              </div>

              {/* Área Máxima */}
              <div className="form-group">
                <label className="form-label">
                  <Maximize2 size={18} />
                  Área Máxima (m²)
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Ex: 200"
                  value={filters.areaMax}
                  onChange={(e) => handleChange('areaMax', e.target.value)}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          style={{
            marginTop: 'var(--space-6)',
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'flex-end'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setFilters({
              locality: 'Rio de Janeiro',
              neighborhood: 'Copacabana',
              priceMin: '',
              priceMax: '',
              bedrooms: '',
              garageSpaces: '',
              metroDistance: '',
              areaMin: '',
              areaMax: ''
            })}
          >
            Limpar Filtros
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ minWidth: '200px' }}
          >
            {isLoading ? (
              <>
                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                Buscando...
              </>
            ) : (
              <>
                <Search size={20} />
                Buscar Imóveis
              </>
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PropertyFilter;
