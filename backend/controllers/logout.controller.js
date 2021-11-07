async function logout(req, res, next) {
  console.log('logout', req.user);
  return res
    .clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
    })
    .json({ message: 'Успешный выход' });
}

module.exports = { logout };
