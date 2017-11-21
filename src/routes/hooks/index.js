module.exports = (express) => {
  const router = express.Router();
  const util = require('apex-util');

  router.post('/max/pr', (req, res) => {
    util.log('Incomming Hook', req.body);
//    req.body.hook.
    const githubBaseURL = 'https://api.github.com/repos/reactivepixel/gravity-well/'
    const branches = require(githubBaseURL + 'branches');
    let commitURL;
    branches.map((branch) => {
      if(branch.name === 'release'){
        commitURL = branch.commit.url;
      }
      return branch;
    })

    util.log('Matched Release Branch Commit URL', commitURL)

    res.json({
      healthy: true,
    });
  });

  return router;
};
