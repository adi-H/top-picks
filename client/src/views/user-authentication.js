import { Container, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AuthFormGeneric } from '../components/user-authentication/auth-form-generic';
import { Link as RouterLink } from 'react-router-dom';
import { login, signup } from '../services/user-auth';

export const UserAuthenticationPage = (props) => {
	const [ showLogin, setShowLogin ] = useState(true);
	const otherAuthWayMsg = { login: 'sign in instead? ', signup: 'log in instead? ' };
	const msgsToUser = { login: 'log back in to continue!', signup: 'sign up to continue!' };
	const submitButtonMsg = { login: 'login now!!', signup: 'signup now!!' };
	const actionFunctions = { login_function: login, signup_function: signup };

	return (
		<div className="UserAuthenticationPage">
			<Container>
				{showLogin ? (
					<AuthFormGeneric
						msgToUser={msgsToUser.login}
						actionFunc={actionFunctions.login_function}
						submitButtonMsg={submitButtonMsg.login}
						changeAuthWayMsg={otherAuthWayMsg.login}
						onAuthChange={() => setShowLogin(!showLogin)}
						onSuccessRoute="/"
					/>
				) : (
					<AuthFormGeneric
						msgToUser={msgsToUser.signup}
						actionFunc={actionFunctions.signup_function}
						submitButtonMsg={submitButtonMsg.signup}
						changeAuthWayMsg={otherAuthWayMsg.signup}
						onAuthChange={() => setShowLogin(!showLogin)}
						onSuccessRoute="/"
					/>
				)}

				<Link as={RouterLink} to="/">
					... or, go back to home page!!
				</Link>
			</Container>
		</div>
	);
};
