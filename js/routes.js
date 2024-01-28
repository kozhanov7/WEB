const express = require('express');
const fs = require('fs');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.sendFile('travelagency.html', { root: './views' });
});

router.post('/', (req, res) => {
    const { country } = req.body;

    fs.readFile('tours.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
      
        try {
          const toursData = JSON.parse(data);
          
          const tours = toursData.tours;
      
          const matchingTours = tours.filter(tour => tour.country === country);
            
            console.log('Matching tours:', matchingTours);
            res.json({ "tours": matchingTours });

        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Error parsing JSON' });
        }
      });
});

router.put('/', (req, res) => {
    const { cityName, newPrice } = req.body;

    fs.readFile('tours.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }

        try {
            const toursData = JSON.parse(data);
            const tours = toursData.tours;

            const updatedTours = tours.map(tour => {
                if (tour.city === cityName) {
                    tour.price = newPrice;
                }
                return tour;
            });

            toursData.tours = updatedTours;

            fs.writeFile('tours.json', JSON.stringify(toursData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).json({ error: 'Error writing file' });
                    return;
                }
                res.json({ message: `Price updated for ${cityName}` });
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Error parsing JSON' });
        }
    });
});

router.delete('/:id', (req, res) => {
    const tourId = parseInt(req.params.id);

    fs.readFile('tours.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }

        try {
            const toursData = JSON.parse(data);
            const tours = toursData.tours;

            const updatedTours = tours.filter(tour => tour.id !== tourId);

            toursData.tours = updatedTours;

            fs.writeFile('tours.json', JSON.stringify(toursData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).json({ error: 'Error writing file' });
                    return;
                }
                res.json({ message: `Tour with ID ${tourId} deleted` });
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ error: 'Error parsing JSON' });
        }
    });
});

module.exports = router;
