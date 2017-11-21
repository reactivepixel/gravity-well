module.exports = (express) => {
  const router = express.Router();
  const util = require('apex-util');
  const http = require('http');

  router.post('/max/pr', (req, res) => {
    util.log('Incomming Hook', req.body);
//    req.body.hook.

    const options = {
      hostname: 'https://api.github.com',
      path: '/repos/reactivepixel/gravity-well/',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const innerReq = http.request(options, (innerRes) => {
      innerRes.setEncoding('utf8');
      innerRes.on('data', (resData) => {
        const branches = JSON.parse(resData);
        let commitURL;
        branches.map((branch) => {
          if(branch.name === 'release'){
            commitURL = branch.commit.url;
          }
          return branch;
        })

        util.log('Matched Release Branch Commit URL', commitURL)
      });
    });

    res.json({
      healthy: true,
    });
  });

  return router;
};
