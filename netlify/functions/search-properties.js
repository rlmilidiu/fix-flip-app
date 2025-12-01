
import axios from 'axios';

export const handler = async (event, context) => {
    // Apenas aceita POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const filters = JSON.parse(event.body);
        console.log('Filtros recebidos:', filters);

        // AQUI SERIA IMPLEMENTADA A LÓGICA REAL DE SCRAPING
        // Como scraping de sites como Zap/OLX é complexo e frequentemente bloqueado sem proxies,
        // vamos simular uma resposta mais dinâmica ou tentar uma busca real se possível.

        // Por enquanto, vamos retornar dados mockados mas que vêm do "backend",
        // preparando o terreno para a implementação real do scraper.

        // Exemplo de como seria uma chamada real (comentada):
        // const response = await axios.get(`https://www.zapimoveis.com.br/venda/imoveis/${filters.state}/${filters.city}/?transacao=Venda&onde=,${filters.state},${filters.city},,,city,BR>${filters.state}>NULL>${filters.city},-22.906847,-43.172896,`);

        // Dados simulados expandidos
        const mockProperties = [
            {
                id: Date.now() + 1,
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
                id: Date.now() + 2,
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
                id: Date.now() + 3,
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
                id: Date.now() + 4,
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

        // Filtragem básica no "backend"
        let filtered = mockProperties;
        if (filters.neighborhood) {
            filtered = filtered.filter(p => p.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase()));
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filtered)
        };

    } catch (error) {
        console.error('Erro na função:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro interno no servidor' })
        };
    }
};
