module.exports = (express) => {
  const router = express.Router();
  const util = require('apex-util');

  router.post('/max/pr', (req, res) => {
    util.log('Incomming Hook', req.body);
    res.json({
      healthy: true,
    });
  });

  return router;
};
