import { ProductCard } from './product-card';

export function ProductsComp({ list }) {
	// console.log('RENDERING NOW', list);
	return (
		<div>
			{list.length > 0 &&
				list.map((p) => {
					console.log('inside foreacg', p);
					return (
						// <div >
						<ProductCard key={p.id} {...p} />
						// </div>
					);
					// return ;
				})}
		</div>
	);
}
