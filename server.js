
import http from 'http';
import axios from 'axios';
import * as cheerio from 'cheerio';

const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/search' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const filters = JSON.parse(body);
                console.log('Recebendo busca:', filters);

                // Lógica de Scraping do Mercado Livre
                const state = 'rio-de-janeiro';
                const city = filters.locality ? filters.locality.toLowerCase().replace(/ /g, '-') : 'rio-de-janeiro';
                const neighborhood = filters.neighborhood ? filters.neighborhood.toLowerCase().replace(/ /g, '-') : 'copacabana';

                const url = `https://imoveis.mercadolivre.com.br/venda/${state}/${city}/${neighborhood}/_NoIndex_True`;
                console.log('Scraping URL:', url);

                const response = await axios.get(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });

                console.log('Status da resposta:', response.status);
                console.log('Tamanho do HTML:', response.data.length);

                const $ = cheerio.load(response.data);
                const properties = [];

                // Tenta múltiplos seletores possíveis do Mercado Livre
                const selectors = [
                    '.ui-search-layout__item',
                    'li.ui-search-layout__item',
                    '.ui-search-result__wrapper',
                    '.andes-card'
                ];

                let foundSelector = null;
                for (const selector of selectors) {
                    if ($(selector).length > 0) {
                        foundSelector = selector;
                        break;
                    }
                }

                if (foundSelector) {
                    console.log(`Usando seletor: ${foundSelector}`);
                    $(foundSelector).each((i, element) => {
                        try {
                            // Tenta encontrar título e preço com múltiplos seletores
                            const title = $(element).find('.ui-search-item__title, .poly-component__title, h2').first().text().trim();

                            const priceText = $(element).find('.ui-search-price__part, .poly-price__current, .andes-money-amount__fraction').first().text().trim();
                            const price = parseFloat(priceText.replace(/\./g, '').replace(',', '.')) || 0;

                            const url = $(element).find('a.ui-search-link, a.poly-component__title').attr('href');
                            const image = $(element).find('img').attr('data-src') || $(element).find('img').attr('src');

                            // Atributos
                            const attributes = $(element).find('.ui-search-card-attributes__attribute, .poly-attributes-list__item').map((i, el) => $(el).text()).get();

                            let area = 0;
                            let bedrooms = 0;

                            attributes.forEach(attr => {
                                if (attr.includes('m²')) area = parseInt(attr);
                                if (attr.includes('quarto')) bedrooms = parseInt(attr);
                            });

                            if (title) {
                                properties.push({
                                    id: `ml-${i}-${Date.now()}`,
                                    price,
                                    address: title,
                                    locality: filters.locality || 'Rio de Janeiro',
                                    neighborhood: filters.neighborhood || 'Copacabana',
                                    bedrooms,
                                    garageSpaces: 0,
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
                } else {
                    console.log('Nenhum seletor de item encontrado no HTML.');
                    // Logar um pedaço do HTML para debug se necessário
                    // console.log(response.data.substring(0, 500));
                }

                console.log(`Encontrados ${properties.length} imóveis`);

                // Fallback: Se não encontrou nada, retorna lista vazia para que o frontend mostre "Nenhum imóvel encontrado"
                if (properties.length === 0) {
                    console.log('Scraping retornou vazio. Retornando lista vazia.');
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(properties));

            } catch (error) {
                console.error('Erro no scraping:', error.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Erro ao buscar imóveis' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor de scraping (nativo) rodando em http://localhost:${PORT}`);
});
