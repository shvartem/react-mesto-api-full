async function logout(req, res, next) {
  console.log('logout', req.user);
  return res
    .clearCookie('jwt', {
      // maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .json({ message: 'Успешный выход' });
}

module.exports = { logout };
