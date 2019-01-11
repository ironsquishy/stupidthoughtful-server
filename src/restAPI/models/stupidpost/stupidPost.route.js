const Router = require('express').Router();
const StpdPostServices = require('./stupidPost.services');

/*Post*/
Router.post('/create', createStpdPost);
Router.post('update', updateStpdPost);

/*Get*/
Router.get('/all', getAllStpdPost);
Router.get('/:stpdHash', getStpdPostByStpdHash);
Router.get('/latest', getLatestStpdPosts);
/*Global Get StpdPost*/
Router.get('/global', getAllGlobalStpdPost);
Router.get('/gloabal/latest', getLatestGlobalStpdPost);
Router.get('/global/:stpdHash', getGlobalStpdPostByStpdHash);

/*Put*/
Router.put('/:stpdHash', updateStpdPost);

/*Delete */
Router.delete('/:stpdHash', deleteStpdPost);




