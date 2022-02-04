import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormLabel, Box, InputGroup, Button, InputRightElement, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { SubmitButton } from 'formik-chakra-ui';
import './../../assets/stylesheets/auth-form.css';

const authFormSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required'),
	password: Yup.string().required('Password is required').min(4, 'Password is too short - should be 4 chars min')
});

const initialValues = {
	email: '',
	password: ''
};

export const AuthFormGeneric = (props) => {
	const [ showPassword, setShowPassword ] = useState(false);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={authFormSchema}
			onSubmit={(values, { setSubmitting, props }) => {
				alert(values.toString());
				console.log('logged in ', values);

				// store.dispatch(props.actionFunc(values.email, values.password))
				//     .then(() => {
				//         console.log(store.getState())
				//         store.dispatch(fetchLogs()); // output is handled in Logs comp
				//     })
				//     .catch(() => {
				//         console.log(store.getState())
				//     })
			}}
		>
			{(formik) => {
				const { errors, touched, isValid, dirty } = formik;
				return (
					<Box className="auth-form-container">
						<h2 className="auth-form-h1">{props.msgToUser}</h2>
						<Form>
							<Box className="auth-form-form-row">
								<FormLabel htmlFor="email" className="auth-form-label">
									Email
								</FormLabel>
								<Field
									type="email"
									name="email"
									id="email"
									className={`auth-form-inupt ${errors.email && touched.email
										? 'auth-form-input-error'
										: ''}`}
								/>
								<ErrorMessage name="email" component="span" className="auth-form-error" />
							</Box>

							<Box className="auth-form-form-row">
								<FormLabel htmlFor="password" className="auth-form-label">
									Password
								</FormLabel>
								<InputGroup>
									<Field
										type={showPassword ? 'text' : 'password'}
										name="password"
										id="password"
										className={`auth-form-inupt ${errors.password && touched.password
											? 'auth-form-input-error'
											: ''}`}
									/>
									<InputRightElement width="4.5rem">
										<IconButton
											h="1.75rem"
											size="sm"
											aria-label="switch showPassword"
											onClick={() => setShowPassword(!showPassword)}
											icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
										/>
									</InputRightElement>
								</InputGroup>
								<ErrorMessage name="password" component="span" className="auth-form-error" />
							</Box>

							{/* <Box className="auth-form-form-row">{messageFromStore}</Box> */}

							<Box>
								<SubmitButton
									// colorScheme="gray"
									type="submit"
									className={`auth-form-button ${!(dirty && isValid)
										? 'auth-form-disabled-btn'
										: ''}`}
									disabled={!(dirty && isValid)}
								>
									{props.submitButtonMsg}
								</SubmitButton>
							</Box>

							<Box>
								{' '}
								<br />
								<Button
									rightIcon={<ArrowRightIcon />}
									colorScheme="gray"
									variant="outline"
									onClick={props.onAuthChange}
									size="xs"
								>
									{props.changeAuthWayMsg}
								</Button>
							</Box>
						</Form>
					</Box>
				);
			}}
		</Formik>
	);
};
