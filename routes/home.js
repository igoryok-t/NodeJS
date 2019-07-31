const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.header("Cache-Control", "no-store,");
  res.render('index', {
    title: 'Главная страница',
    isHome: true
  })
})


module.exports = router