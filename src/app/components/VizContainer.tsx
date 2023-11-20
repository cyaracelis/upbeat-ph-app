import React, { useEffect, useState } from 'react';

interface VizContainerProps {
  title: string;
  parameters: {
    granularity: string;
    region: string;
    variable: string;
  };
  position: number;
  onClose: () => void;
}

const getRegionIndex = (region: string): number => {
  const regionDict: Record<string, number> = {
    'Region I': 1,
    'Region II': 2,
    'Region III': 3,
    'Region IV-A': 4,
    'Region V': 5,
    'Region VI': 6,
    'Region VII': 7,
    'Region VIII': 8,
    'Region IX': 9,
    'Region X': 10,
    'Region XI': 11,
    'Region XII': 12,
    'National Capital Region': 13,
    'Cordillera Administrative Region': 14,
    'Autonomous Region in Muslim Mindanao': 15,
    'Region XIII': 16,
    'Region IV-B': 17,
    'Negros Island Region': 18,
  };
  return regionDict[region];
};

const getVarFullName = (variable: string): string => {
  const variableDict: Record<string, string> = {
    'BEINGBULLIED': 'Bullying Incidence',
    'EUDMO': 'Eudaimonia',
    'PERCOMP': 'Perceived sense of competition',
    'PERCOOP': 'Perceived sense of cooperation',
    'GFOFAIL': 'General fear of failure',
    'BELONG': 'Sense of belongingness',
    'SWBP': 'Satisfaction with life'
  };
  return variableDict[variable];
}

const getLocationName = (granularity: string, region: string): string => {
  if (granularity === '1') {
    return "Philippines"
  }
  else if (granularity == '2') {
    return region
  }
  return region
}

const VizContainer: React.FC<VizContainerProps> = ({ title, parameters, onClose }) => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { granularity, region, variable } = parameters;

        let fileName = '';

        if (granularity === '1') {
          fileName = `natl-${variable}.html`;
        } else if (granularity === '2' && region) {
          const regionIndex = getRegionIndex(region);
          fileName = `reg${regionIndex}-${variable}.html`;
        }

        const response = await fetch(`/plots/${fileName}`);
        const content = await response.text();

        console.log('Loaded HTML content:', content);

        setHtmlContent(content);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchData();
  }, [parameters]);

  return (
    <div className="p-4 border bg-white shadow-lg w-full h-full rounded-md mb-2 overflow-hidden">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{getLocationName(parameters.granularity, parameters.region)} - {getVarFullName(parameters.variable)}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          Close
        </button>
      </div>

      <div className="h-full w-full items-center justify-center m-auto flex">
        <iframe
          title={title}
          srcDoc={htmlContent || ''}
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default VizContainer;
