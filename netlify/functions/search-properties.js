import axios from 'axios';
import * as cheerio from 'cheerio';

export const handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const filters = JSON.parse(event.body);
        console.log('Filtros recebidos:', filters);

        const scrapeMercadoLivre = async () => {
            try {
                const state = 'rio-de-janeiro';
                const city = filters.locality ? filters.locality.toLowerCase().replace(/ /g, '-') : 'rio-de-janeiro';
                const neighborhood = filters.neighborhood ? filters.neighborhood.toLowerCase().replace(/ /g, '-') : 'copacabana';

                const url = `https://imoveis.mercadolivre.com.br/venda/${state}/${city}/${neighborhood}/_NoIndex_True`;
                console.log('Scraping ML URL:', url);

                const response = await axios.get(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Connection': 'keep-alive',
                        'Upgrade-Insecure-Requests': '1',
                        'Sec-Fetch-Dest': 'document',
                        'Sec-Fetch-Mode': 'navigate',
                        'Sec-Fetch-Site': 'none',
                        'Sec-Fetch-User': '?1'
                    }
                });

                const $ = cheerio.load(response.data);
                const properties = [];

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
                    $(foundSelector).each((i, element) => {
                        try {
                            const title = $(element).find('.ui-search-item__title, .poly-component__title, h2').first().text().trim();
                            const priceText = $(element).find('.ui-search-price__part, .poly-price__current, .andes-money-amount__fraction').first().text().trim();
                            const price = parseFloat(priceText.replace(/\./g, '').replace(',', '.')) || 0;
                            const url = $(element).find('a.ui-search-link, a.poly-component__title').attr('href');
                            const image = $(element).find('img').attr('data-src') || $(element).find('img').attr('src');

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
                            console.error('Erro ao processar item ML:', err);
                        }
                    });
                }
                return properties;
            } catch (error) {
                console.error('Erro no scraping ML:', error.message);
                return [];
            }
        };

        const scrapeZapImoveis = async () => {
            try {
                const state = 'rj';
                const city = filters.locality ? filters.locality.toLowerCase().replace(/ /g, '-') : 'rio-de-janeiro';
                const neighborhood = filters.neighborhood ? filters.neighborhood.toLowerCase().replace(/ /g, '-') : 'copacabana';

                const url = `https://www.zapimoveis.com.br/venda/imoveis/${state}+${city}+${neighborhood}/`;
                console.log('Scraping ZAP URL:', url);

                const response = await axios.get(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Connection': 'keep-alive',
                        'Upgrade-Insecure-Requests': '1',
                        'Sec-Fetch-Dest': 'document',
                        'Sec-Fetch-Mode': 'navigate',
                        'Sec-Fetch-Site': 'none',
                        'Sec-Fetch-User': '?1'
                    }
                });

                const $ = cheerio.load(response.data);
                const properties = [];

                const nextDataScript = $('#__NEXT_DATA__').html();

                if (nextDataScript) {
                    try {
                        const jsonData = JSON.parse(nextDataScript);
                        const listings = jsonData?.props?.pageProps?.initialProps?.searchResult?.listings || [];

                        listings.forEach((item, i) => {
                            try {
                                const listing = item.listing;
                                if (!listing) return;

                                const price = parseInt(listing.pricingInfos?.[0]?.price || 0);
                                const address = `${listing.address?.street || ''}, ${listing.address?.neighborhood || ''}`;
                                const bedrooms = listing.bedrooms?.[0] || 0;
                                const area = listing.usableAreas?.[0] || 0;
                                const garageSpaces = listing.parkingSpaces?.[0] || 0;
                                const image = listing.images?.[0]?.url || '';
                                const link = `https://www.zapimoveis.com.br/imovel/${listing.externalId}`;

                                properties.push({
                                    id: `zap-${listing.externalId || i}-${Date.now()}`,
                                    price,
                                    address,
                                    locality: listing.address?.city || filters.locality || 'Rio de Janeiro',
                                    neighborhood: listing.address?.neighborhood || filters.neighborhood || 'Copacabana',
                                    bedrooms,
                                    garageSpaces,
                                    area,
                                    source: 'zapimoveis',
                                    url: link,
                                    image,
                                    scrapedAt: new Date().toISOString()
                                });
                            } catch (err) {
                                console.error('Erro ao processar item ZAP JSON:', err);
                            }
                        });
                    } catch (e) {
                        console.error('Erro ao parsear JSON do ZAP:', e);
                    }
                } else {
                    $('.card-container').each((i, element) => {
                        try {
                            const priceText = $(element).find('.simple-card__price strong').text().trim();
                            const price = parseFloat(priceText.replace('R$', '').replace(/\./g, '').trim()) || 0;

                            const address = $(element).find('.simple-card__address').text().trim();
                            const areaText = $(element).find('.js-areas').text().trim();
                            const area = parseInt(areaText) || 0;

                            const bedroomsText = $(element).find('.js-bedrooms').text().trim();
                            const bedrooms = parseInt(bedroomsText) || 0;

                            const parkingText = $(element).find('.js-parking-spaces').text().trim();
                            const garageSpaces = parseInt(parkingText) || 0;

                            const link = $(element).find('a').attr('href');
                            const fullLink = link ? (link.startsWith('http') ? link : `https://www.zapimoveis.com.br${link}`) : '';

                            const image = $(element).find('img').attr('src');

                            if (price > 0) {
                                properties.push({
                                    id: `zap-html-${i}-${Date.now()}`,
                                    price,
                                    address,
                                    locality: filters.locality || 'Rio de Janeiro',
                                    neighborhood: filters.neighborhood || 'Copacabana',
                                    bedrooms,
                                    garageSpaces,
                                    area,
                                    source: 'zapimoveis',
                                    url: fullLink,
                                    image,
                                    scrapedAt: new Date().toISOString()
                                });
                            }
                        } catch (err) {
                            console.error('Erro ao processar item ZAP HTML:', err);
                        }
                    });
                }

                return properties;
            } catch (error) {
                console.error('Erro no scraping ZAP:', error.message);
                return [];
            }
        };

        const [mlProperties, zapProperties] = await Promise.all([
            scrapeMercadoLivre(),
            scrapeZapImoveis()
        ]);

        const allProperties = [...mlProperties, ...zapProperties];
        console.log(`Total imóveis encontrados: ${allProperties.length}`);

        if (allProperties.length === 0) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(getMockData(filters, 'Nenhum imóvel encontrado (Possível bloqueio ou seletores inválidos)'))
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(allProperties)
        };

    } catch (error) {
        console.error('Erro na função:', error);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(getMockData(JSON.parse(event.body || '{}'), error.message))
        };
    }
};

function getMockData(filters, errorMessage = 'Erro desconhecido') {
    return [
        {
            id: Date.now() + 1,
            price: 0,
            address: `ERRO NO SCRAPING: ${errorMessage}`,
            locality: filters.locality || 'Rio de Janeiro',
            neighborhood: filters.neighborhood || 'Copacabana',
            bedrooms: 0,
            garageSpaces: 0,
            area: 0,
            source: 'sistema',
            url: '#',
            image: 'https://placehold.co/600x400/red/white?text=Erro+no+Scraping',
            scrapedAt: new Date().toISOString(),
            isMock: true
        },
        {
            id: Date.now() + 2,
            price: 450000,
            address: 'Exemplo: Rua das Flores, 123 (Dados Fictícios)',
            locality: filters.locality || 'Rio de Janeiro',
            neighborhood: filters.neighborhood || 'Copacabana',
            bedrooms: 3,
            garageSpaces: 2,
            area: 85,
            source: 'zapimoveis',
            url: 'https://www.zapimoveis.com.br',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500',
            scrapedAt: new Date().toISOString(),
            estimatedROI: 8.5,
            isMock: true
        }
    ];
}
