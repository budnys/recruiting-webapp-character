import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';
import type { Attributes, Class } from './types';

function App() {
  // Initialize attributes with default value of 10
  const [attributes, setAttributes] = useState<Attributes>({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });

  // Calculate if character meets class requirements
  const meetsClassRequirements = (className: Class) => {
    const requirements = CLASS_LIST[className];
    return Object.entries(requirements).every(
      ([attr, min]) => attributes[attr as keyof Attributes] >= min
    );
  };

  // Calculate ability modifier
  const getModifier = (value: number) => {
    return Math.floor((value - 10) / 2);
  };

  // Handle attribute changes
  const handleAttributeChange = (attribute: keyof Attributes, increment: boolean) => {
    setAttributes(prev => ({
      ...prev,
      [attribute]: increment ? prev[attribute] + 1 : prev[attribute] - 1
    }));
  };

  // Handle class click to show requirements
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Character Sheet</h1>
      </header>
      <section className="App-section">
        {/* Attributes Section */}
        <div className="attributes-section">
          <h2>Attributes</h2>
          {ATTRIBUTE_LIST.map(attribute => (
            <div key={attribute} className="attribute-row">
              <span>{attribute}: {attributes[attribute as keyof Attributes]}</span>
              <span>Modifier: {getModifier(attributes[attribute as keyof Attributes])}</span>
              <button 
                onClick={() => handleAttributeChange(attribute as keyof Attributes, true)}
              >
                +
              </button>
              <button 
                onClick={() => handleAttributeChange(attribute as keyof Attributes, false)}
              >
                -
              </button>
            </div>
          ))}
        </div>

        {/* Classes Section */}
        <div className="classes-section">
          <h2>Classes</h2>
          {Object.keys(CLASS_LIST).map((className) => (
            <div 
              key={className}
              className={`class-item ${meetsClassRequirements(className as Class) ? 'meets-requirements' : ''}`}
              onClick={() => setSelectedClass(className as Class)}
            >
              <h3>{className}</h3>
              {selectedClass === className && (
                <div className="class-requirements">
                  <h4>Minimum Requirements:</h4>
                  {Object.entries(CLASS_LIST[className as Class]).map(([attr, value]) => (
                    <div key={attr}>
                      {attr}: {value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
