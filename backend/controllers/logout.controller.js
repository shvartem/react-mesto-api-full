async function logout(req, res, next) {
  console.log(req.user);
  return res
    .clearCookie('jwt')
    .json({ message: 'Успешный выход' });
}

module.exports = { logout };
