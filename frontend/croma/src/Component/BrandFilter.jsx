import CustomSelect from './CustomSelect';

function BrandFilter({ setSearchParams, searchParams }) {
  const brandOptions = [
    { value: 'SAMSUNG', label: 'SAMSUNG' },
    { value: 'Croma', label: 'Croma' },
    { value: 'LG', label: 'LG' },
    { value: 'SONY', label: 'SONY' },
    { value: 'Apple', label: 'Apple' },
    { value: 'PHILIPS', label: 'PHILIPS' },
    { value: 'OnePlus', label: 'OnePlus' },
    { value: 'Xiaomi', label: 'Xiaomi' },
    { value: 'Haier', label: 'Haier' },
    { value: 'TCL', label: 'TCL' },
    { value: 'Hisense', label: 'Hisense' },
    { value: 'TOSHIBA', label: 'TOSHIBA' },
    { value: 'KODAK', label: 'KODAK' },
    { value: 'acer', label: 'acer' },
    { value: 'Panasonic', label: 'Panasonic' },
    { value: 'XElectron', label: 'XElectron' },
    { value: 'AKAI', label: 'AKAI' },
    { value: 'SANSUI', label: 'SANSUI' },
    { value: 'FOXSKY', label: 'FOXSKY' },
    { value: 'iFFALCON', label: 'iFFALCON' },
    { value: 'Blaupunkt', label: 'Blaupunkt' },
    { value: 'PORTRONICS', label: 'PORTRONICS' },
    { value: 'realme', label: 'realme' },
    { value: 'RD PLAST', label: 'RD PLAST' },
    { value: 'ViewSonic', label: 'ViewSonic' },
    { value: 'aiwa', label: 'aiwa' },
    { value: 'amazon', label: 'amazon' },
    { value: 'Compaq', label: 'Compaq' },
    { value: 'Kevin', label: 'Kevin' },
    { value: 'XGIMI', label: 'XGIMI' },
    { value: 'BOSE', label: 'BOSE' },
    { value: 'BenQ', label: 'BenQ' },
    { value: 'Karbonn', label: 'Karbonn' },
    { value: 'PROFIGOLD', label: 'PROFIGOLD' },
    { value: 'Redmi', label: 'Redmi' },
    { value: 'logitech', label: 'logitech' },
    { value: 'ANKER', label: 'ANKER' },
    { value: 'CANDY', label: 'CANDY' },
    { value: 'DETEL', label: 'DETEL' },
    { value: 'Egate', label: 'Egate' },
    { value: 'Miracle Digital', label: 'Miracle Digital' },
    { value: 'Oakter', label: 'Oakter' },
    { value: 'SENSY', label: 'SENSY' },
    { value: 'airtel', label: 'airtel' },
    { value: 'sun king', label: 'sun king' },
    { value: 'zunpulse', label: 'zunpulse' }
  ];

  return (
    <div className="brandFilter">
      <CustomSelect 
        title="Brand"
        keyform={"brandSort"}
        options={brandOptions}
        selectedValue={searchParams.get('brandSort')}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </div>
  );
}

export default BrandFilter;
