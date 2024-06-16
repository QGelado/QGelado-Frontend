import React from 'react';

async function getState<Type>(
  setState: React.Dispatch<React.SetStateAction<Type | undefined>>,
): Promise<Type | undefined> {
  let state: Type | undefined;

  await setState((currentState?: Type) => {
    state = currentState;
    return state;
  });

  return state;
}

export default getState;