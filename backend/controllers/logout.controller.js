async function logout(req, res, next) {
  return res.clearCookie('jwt').json({ message: 'Успешный выход' });
}

module.exports = { logout };
