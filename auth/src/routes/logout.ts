import express from 'express';

const router = express.Router();

router.post('/api/users/logout', (req, res) => {
	res.clearCookie('jwt');
	req.session = null;
	res.send({});
});

export { router as logoutRouter };
