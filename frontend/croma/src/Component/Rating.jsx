import CustomSelect from './CustomSelect';

function RatingFilter({ setSearchParams, searchParams }) {
  const ratingOptions = [
    { value: 5, label: '5 stars' },
    { value: 4, label: '4 stars & up' },
    { value: 3, label: '3 stars & up' },
    { value: 2, label: '2 stars & up' },
    { value: 1, label: '1 star & up' }
  ];

  return (
    <div className="ratingFilter">
      <CustomSelect 
      title={"Rating"}
      keyform={"ratingSort"}
        options={ratingOptions}
        selectedValue={searchParams.get('ratingSort')}
        setSearchParams={setSearchParams}
        searchParams={searchParams}

      />
    </div>
  );
}

export default RatingFilter;
