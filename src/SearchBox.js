import React from 'react';

const SearchBox = ({ searchValue, setSearchValue }) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</div>
	);
};

export default SearchBox;
