async function logout(req, res, next) {
  return res
    .clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .json({ message: 'Успешный выход' });
}

module.exports = { logout };
