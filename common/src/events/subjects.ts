export enum Subjects {
	userCreated = 'user:created',
	// userUpdated = 'user:updated',

	productCreated = 'product:created',
	productUpdated = 'product:updated',
	newRatingPosted = 'user-rating:posted',
	existingRatingUpdated = 'user-rating:updated',
	productRatingUpdated = 'product-rating:updated',

	brandCreated = 'brand:created',
	brandUpdated = 'brand:updated',

	newListCreated = 'user-list:created',
	listDeleted = 'user-list:deleted',
	listDetailsUpdated = 'user-list:details-updated',
	listProductCountUpdated = 'user-list:products-updated'
}
