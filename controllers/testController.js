const testApiHandler = (req, res) => {
    res.status(200).json('Api running Successfully');
}

module.exports = {
    testApiHandler
}