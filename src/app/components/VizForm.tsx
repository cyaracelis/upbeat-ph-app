import React, { useState, useEffect } from 'react';

interface VizFormProps {
  onSubmit: (formData: any) => void;
}

const VizForm: React.FC<VizFormProps> = ({ onSubmit }) => {
  const [granularity, setGranularity] = useState<string>('1');
  const [variable, setVariable] = useState<string>('BEINGBULLIED');
  const [region, setRegion] = useState<string>('Region I');
  const [province, setProvince] = useState<string>('');

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [regionOptions, setRegionOptions] = useState<string[]>([]);

  const fetchRegionList = async () => {
    try {
      const response = await fetch('/data/region-list.csv');
      const data = await response.text();

      const regionList = data.split(',').map((item) => item.trim());
      setRegionOptions(regionList);
    } catch (error) {
      console.error('Error fetching region options:', error);
    }
  };

  useEffect(() => {
    fetchRegionList();
  }, []);

  const [granularityOptions] = useState([
    { label: 'National', value: '1' },
    { label: 'Regional', value: '2' },
    { label: 'Provincial', value: '3' },
  ]);

  const [variableOptions] = useState([
    { label: 'Bullying Incidence', value: 'BEINGBULLIED' },
    { label: 'Eudaimonia', value: 'EUDMO' },
    { label: 'Perceived sense of competition', value: 'PERCOMP' },
    { label: 'Perceived sense of cooperation', value: 'PERCOOP' },
    { label: 'General fear of failure', value: 'GFOFAIL' },
    { label: 'Sense of belongingness', value: 'BELONG' },
    { label: 'Satisfaction with life', value: 'SWBP' },
  ]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform actions with form values (e.g., generate visualization)
    // You can use the form values stored in state (granularity, variable, region, province)
    // ...

    // Remove later, placeholder only
    console.log({ granularity, variable, region, province });

    onSubmit({ granularity, variable, region, province });
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return null;
  }

  return (
    <div className="mx-auto bg-green-900 p-4 border rounded-md mb-4">
      <h2 className="text-xl text-white font-bold mb-4">Generate a visualization</h2>
      <form onSubmit={handleSubmit}>
        {/* Granularity dropdown */}
        <div className="mb-4">
          <label htmlFor="granularity" className="block text-sm font-medium text-white">
            Granularity
          </label>
          <select
            id="granularity"
            name="granularity"
            value={granularity}
            onChange={(e) => setGranularity(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          >
            {granularityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Variable dropdown */}
        <div className="mb-4">
          <label htmlFor="variable" className="block text-sm font-medium text-white">
            Variable
          </label>
          <select
            id="variable"
            name="variable"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          >
            {variableOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Region dropdown */}
        {(granularity === '2' || granularity === '3') && (
        <div className="mb-4">
          <label htmlFor="region" className="block text-sm font-medium text-white">
            Region
          </label>
          <select
            id="region"
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          >
            {regionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        )}

        {/* Province dropdown */}
        {(granularity === '3') && (
        <div className="mb-4">
          <label htmlFor="province" className="block text-sm font-medium text-white">
            Province
          </label>
          <input
            type="text"
            id="province"
            name="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        )}

        {/* Submit button */}
        <div className="mb-4">
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VizForm;
