import { GiDesert, GiHalfDead } from 'react-icons/gi';
import { MdOutlineFormatColorFill } from 'react-icons/md';
import { GoOctoface } from 'react-icons/go';
import { FaOilCan } from 'react-icons/fa';

// taken from products ms
// export const bestForTagsOptions = [ 'hyperpigmentation', 'acne', 'oily skin', 'combo skin', 'dry skin' ];

export const BEST_FOR_TAGS_ICONS = {
	'dry skin': GiDesert,
	hyperpigmentation: MdOutlineFormatColorFill,
	acne: GoOctoface,
	'oily skin': FaOilCan,
	'combo skin': GiHalfDead
};
