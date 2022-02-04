import { Container, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AuthFormGeneric } from '../components/user-authentication/auth-form-generic';
import { Link as RouterLink } from 'react-router-dom';

export const UserAuthenticationPage = (props) => {
	const [ showLogin, setShowLogin ] = useState(true);
	const otherAuthWayMsg = { login: 'sign in instead? ', signin: 'log in instead? ' };
	const msgsToUser = { login: 'log back in to continue!', signin: 'sign up to continue!' };
	const submitButtonMsg = { login: 'login now!!', signin: 'signin now!!' };

	return (
		<div className="UserAuthenticationPage">
			<Container>
				{showLogin ? (
					<AuthFormGeneric
						msgToUser={msgsToUser.login}
						// msgToUser="sign in now !~"
						// actionFunc={actionFunctions.signin}
						submitButtonMsg={submitButtonMsg.login}
						// submitButtonMsg="submit now!!"
						changeAuthWayMsg={otherAuthWayMsg.login}
						// changeAuthWayMsg='log in now !!'
						onAuthChange={() => setShowLogin(!showLogin)}
					/>
				) : (
					<AuthFormGeneric
						msgToUser={msgsToUser.signin}
						// msgToUser="sign in now !~"
						// actionFunc={actionFunctions.signin}
						submitButtonMsg={submitButtonMsg.signin}
						// submitButtonMsg="submit now!!"
						changeAuthWayMsg={otherAuthWayMsg.signin}
						// changeAuthWayMsg='log in now !!'
						onAuthChange={() => setShowLogin(!showLogin)}
					/>
				)}

				<Link as={RouterLink} to="/">
					go back to home page!!
				</Link>
			</Container>
		</div>
	);
};
