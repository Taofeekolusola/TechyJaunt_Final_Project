const { Landlord } = require('../models/Landlord');

const getLandlordDetails = async () => {
    try {
        const {id} = req.params 
        // Retrieve landlord details using the landlord ID
        const landlord = await Landlord.findByPk(id);

        if (!landlord) {
            res.status(404).json('Landlord not found');
        }

        res.status(200).json(landlord);
    } catch (error) { 
        console.error('Error fetching landlord details:', error);
        res.status(500).json({ error: 'An error occurred while processing the payment' });
    }
}

module.exports = { getLandlordDetails };