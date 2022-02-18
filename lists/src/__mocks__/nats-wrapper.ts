export const natsWrapper = {
	client: {
		publish: jest.fn().mockImplementation((subject: string, data: string, callback: () => void) => {
			console.log(subject);
			callback();
		})
	}
};
