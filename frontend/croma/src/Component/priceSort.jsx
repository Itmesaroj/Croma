import CustomSelect from './CustomSelect';

function PriceSort({ setSearchParams, searchParams }) {
  const priceOptions = [
    { value: 1, label: 'Price low to high' },
    { value: -1, label: 'Price high to low' }
  ];

  return (
    <div className="priceSort">
      <CustomSelect 
      title="Price"
      keyform={"priceSort"}
        options={priceOptions}
        selectedValue={searchParams.get('priceSort')}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </div>
  );
}

export default PriceSort;
