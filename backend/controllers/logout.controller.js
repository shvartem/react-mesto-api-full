async function logout(req, res, next) {
  console.log('logout', req.user);
  res
    .clearCookie('jwt')
    .json({ message: 'Успешный выход' });
}

module.exports = { logout };
