'use client';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import VizForm from './components/VizForm';
import VizContainer from './components/VizContainer';

const Home = () => {
  const [visualizations, setVisualizations] = useState<any[]>([]);
  const [parameters, setParameters] = useState<any[]>([]);
  const [formPositions, setFormPositions] = useState<number[]>([]);
  const [showForm, setShowForm] = useState<boolean>(true);

  const handleFormSubmit = (formData: any) => {
    setVisualizations((prevVisualizations) => [...prevVisualizations, formData.variable]);
    setParameters((prevParameters) => [...prevParameters, formData]);
    setFormPositions((prevPositions) => [...prevPositions, prevPositions.length]);
    setShowForm(false);
  };

  const handleAddVisualization = () => {
    setShowForm(true);
  };

  const handleCloseVisualization = (index: number) => {
    setVisualizations((prevVisualizations) =>
      prevVisualizations.filter((_, i) => i !== index)
    );
    setParameters((prevParameters) => prevParameters.filter((_, i) => i !== index));
  };

  const renderVisualizations = () => {
    return visualizations.map((title, index) => (
      <VizContainer
        key={index}
        title={title}
        parameters={parameters[index]}
        onClose={() => handleCloseVisualization(index)}
        position={formPositions[index]}
      />
    ));
  };

  const renderForm = () => {
    return showForm && visualizations.length < 4 ? (
      <VizForm onSubmit={handleFormSubmit} />
    ) : null;
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="mt-16 p-4 flex-1 overflow-y-auto">
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2`} style={{ minHeight: `${90 * Math.ceil(visualizations.length / 2)}vh` }}>
          {renderVisualizations()}
          {renderForm()}
        </div>
      </div>
      {visualizations.length > 0 && visualizations.length < 4 && (
        <div className="fixed bottom-4 right-4">
          <button onClick={handleAddVisualization} className="bg-blue-500 text-white p-2 rounded-md">
            Add New Visualization
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
