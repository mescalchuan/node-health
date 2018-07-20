const logout = module.exports = (req, res) => {
    req.session.user = null;
    res.json({
        retCode: 0,
        retInfo: {}
    })
}