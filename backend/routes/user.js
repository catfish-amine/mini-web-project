const express = require('express');
const router = express.Router();
const https = require('https');

router.get('/', async (req, res) => {
    console.log(req.query)
    let page = req.query['page'] ?? 1;
    let limit = req.query['results'] ?? 5;

    
    try {
        https.get(`https://randomuser.me/api/?page=${page}&results=${limit}&seed=abc`, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    let users = parsedData.results.map((el) => {
                        return {
                            id: el.id.value,
                            'First name': el.name.first,
                            'Last name': el.name.last,
                            'Email': el.email,
                            'Profile picture': el.picture.thumbnail,
                            'picture': el.picture.large,
                            'City': el.location.city,
                            'Country': el.location.country,
                            'Phone': el.phone,
                            'Cell': el.cell,
                            
                        };
                    });

                    return res.json(users);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
            });
        }).on('error', (error) => {
            console.error('Error with the HTTPS request:', error);
            return res.status(500).json({ error: 'Internal server error' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
