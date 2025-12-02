
import axios from 'axios';
import * as cheerio from 'cheerio';

export const handler = async (event, context) => {
    // Apenas aceita POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const filters = JSON.parse(event.body);
        console.log('Filtros recebidos:', filters);

        // Normalizar filtros para URL do Mercado Livre
        // Ex: https://imoveis.mercadolivre.com.br/venda/rio-de-janeiro/rio-de-janeiro/copacabana/
        const state = 'rio-de-janeiro'; // Assumindo RJ por enquanto ou extraindo do filtro
        const city = filters.locality ? filters.locality.toLowerCase().replace(/ /g, '-') : 'rio-de-janeiro';
        const neighborhood = filters.neighborhood ? filters.neighborhood.toLowerCase().replace(/ /g, '-') : 'copacabana';

        const url = `https://imoveis.mercadolivre.com.br/venda/${state}/${city}/${neighborhood}/_NoIndex_True`;

        console.log('Buscando URL:', url);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);
        const properties = [];

        // Seletor do Mercado Livre (pode mudar, mas geralmente é .ui-search-layout__item)
        $('.ui-search-layout__item').each((i, element) => {
            try {
                const title = $(element).find('.ui-search-item__title').text().trim();
                const priceText = $(element).find('.ui-search-price__part').first().text().trim();
                const price = parseFloat(priceText.replace('R$', '').replace(/\./g, '').trim()) || 0;
                const url = $(element).find('a.ui-search-link').attr('href');
                const image = $(element).find('img').attr('data-src') || $(element).find('img').attr('src');

                // Atributos (Área, Quartos) geralmente estão em .ui-search-card-attributes
                const attributes = $(element).find('.ui-search-card-attributes__attribute').map((i, el) => $(el).text()).get();

                let area = 0;
                let bedrooms = 0;

                attributes.forEach(attr => {
                    if (attr.includes('m²')) area = parseInt(attr);
                    if (attr.includes('quarto')) bedrooms = parseInt(attr);
                });

                if (title && price) {
                    properties.push({
                        id: `ml-${i}-${Date.now()}`,
                        price,
                        address: title, // ML usa o título como endereço/descrição
                        locality: filters.locality || 'Rio de Janeiro',
                        neighborhood: filters.neighborhood || 'Copacabana',
                        bedrooms,
                        garageSpaces: 0, // Difícil extrair da listagem
                        area,
                        source: 'mercadolivre',
                        url,
                        image,
                        scrapedAt: new Date().toISOString()
                    });
                }
            } catch (err) {
                console.error('Erro ao processar item:', err);
            }
        });

        console.log(`Encontrados ${properties.length} imóveis no Mercado Livre`);

        // Se não encontrou nada (bloqueio ou mudança de layout), retorna mock como fallback
        if (properties.length === 0) {
            console.log('Nenhum imóvel encontrado no scraping, retornando mock.');
            return {
                statusCode: 200,
                body: JSON.stringify(getMockData(filters))
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(properties)
        };

    } catch (error) {
        console.error('Erro na função:', error);
        // Fallback em caso de erro
        return {
            statusCode: 200, // Retorna 200 com mock para não quebrar o frontend
            body: JSON.stringify(getMockData(JSON.parse(event.body)))
        };
    }
};

function getMockData(filters) {
    return [
        {
            id: Date.now() + 1,
            price: 450000,
            address: 'Rua das Flores, 123 (MOCK - Scraping Falhou)',
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
            address: 'Av. Atlântica, 456 (MOCK)',
            locality: filters.locality || 'Rio de Janeiro',
            neighborhood: 'Ipanema',
            bedrooms: 2,
            garageSpaces: 1,
            area: 70,
            source: 'olx',
            url: 'https://www.olx.com.br',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500',
            scrapedAt: new Date().toISOString()
        }
    ];
}
