import React from 'react';

import styles from './BarGraph.module.css';

const BarGraph = props => {
  const containerHeight = 62.6;
  const totalBarPopulation = 1500;

  const getPopulationInMillions = function () {
    return (this.populationCount / 1000000).toFixed(2);
  };

  const japan = {
    id: 'C1',
    name: 'Japan',
    populationCount: 123951692,
  };

  const usa = {
    id: 'C2',
    name: 'USA',
    populationCount: 332403650,
  };

  const india = {
    id: 'C3',
    name: 'India',
    populationCount: 1417173173,
  };

  const brazil = {
    id: 'C4',
    name: 'Brazil',
    populationCount: 215313498,
  };

  const russia = {
    id: 'C5',
    name: 'Russia',
    populationCount: 146070251,
  };

  const countries = [usa, japan, india, brazil, russia];

  return (
    <div className={styles['container']}>
      <div className={styles['population-container']}>
        <span className={styles['population-number']}>1500</span>
        <span className={styles['population-number']}>1350</span>
        <span className={styles['population-number']}>1200</span>
        <span className={styles['population-number']}>1050</span>
        <span className={styles['population-number']}>900</span>
        <span className={styles['population-number']}>750</span>
        <span className={styles['population-number']}>600</span>
        <span className={styles['population-number']}>450</span>
        <span className={styles['population-number']}>300</span>
        <span className={styles['population-number']}>150</span>
        <span className={styles['population-number']}>0</span>
        <p className={styles['population-description']}>
          (Population in millions)
        </p>
      </div>

      <div className={styles['bar-container']}>
        {countries.map(country => {
          const popInMil = getPopulationInMillions.bind(country)();

          const height = (containerHeight / totalBarPopulation) * popInMil;

          console.log(height);

          return (
            <div
              style={{ height: `${height}rem` }}
              key={country.id}
              className={styles['country-details']}
            >
              <span className={styles['country-name']}>{country.name}</span>
              <span className={styles['country-population']}>
                {`${getPopulationInMillions.bind(country)()}M`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarGraph;
