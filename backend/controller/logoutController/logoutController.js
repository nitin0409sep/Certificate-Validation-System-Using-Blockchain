module.exports.getLogout = (req, res) => {
    // Set new cookie for 1 millisecond
    res.cookie("jwt", 'token', { maxAge: 1 });
    res.redirect('/');
}