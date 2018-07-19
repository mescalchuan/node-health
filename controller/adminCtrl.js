const login = (req, res) => {
    console.log(req.body);
    res.json({
        name: "mescalchuan",
        age: 23
    })
}

module.exports = {
    login
}