import _ from 'lodash';
import { NUMBER_OUTSIDE_LINES } from 'constants.js';

export const tetrominoDataCollideGameBoardData = ({
  gameBoardData,
  tetrominoData
}) => {
  const tetrominoLayer = findLayer(tetrominoData);
  const {
    position: { x: initialX, y: initialY }
  } = tetrominoData;

  return !!tetrominoLayer.find(tetrominoLayerCell => {
    return gameBoardData.find(gameBoardDataCell => {
      return (
        tetrominoLayerCell.x + initialX === gameBoardDataCell.x &&
        tetrominoLayerCell.y + initialY === gameBoardDataCell.y
      );
    });
  });
};

export const tetrominoDataGoOutsideLeft = ({ tetrominoData }) => {
  const tetrominoLayer = findLayer(tetrominoData);
  const {
    position: { x: initialX }
  } = tetrominoData;

  return !!tetrominoLayer.find(tetrominoLayerCell => {
    return tetrominoLayerCell.x + initialX < 0;
  });
};

export const tetrominoDataGoOutsideRight = ({ tetrominoData }) => {
  const tetrominoLayer = findLayer(tetrominoData);
  const {
    position: { x: initialX }
  } = tetrominoData;

  return !!tetrominoLayer.find(tetrominoLayerCell => {
    return tetrominoLayerCell.x + initialX > 9;
  });
};

export const tetrominoDataGoOutsideDown = ({ tetrominoData }) => {
  const tetrominoLayer = findLayer(tetrominoData);
  const {
    position: { y: initialY }
  } = tetrominoData;

  return !!tetrominoLayer.find(tetrominoLayerCell => {
    return tetrominoLayerCell.y + initialY > 19 + NUMBER_OUTSIDE_LINES;
  });
};

export const findLayer = tetrominoData => {
  const { layers, currentLayerIndex } = tetrominoData;

  return layers[currentLayerIndex];
};

export const downTetromino = ({ gameBoardData, tetrominoData }) => {
  const tetrominoDataDowned = _.cloneDeep(tetrominoData);

  tetrominoDataDowned.position.y++;
  if (
    !tetrominoDataCollideGameBoardData({
      gameBoardData,
      tetrominoData: tetrominoDataDowned
    }) &&
    !tetrominoDataGoOutsideDown({ tetrominoData: tetrominoDataDowned })
  )
    return tetrominoDataDowned;

  return undefined;
};

export const leftTetromino = ({ gameBoardData, tetrominoData }) => {
  const tetrominoDataLefted = _.cloneDeep(tetrominoData);

  tetrominoDataLefted.position.x--;
  if (
    !tetrominoDataCollideGameBoardData({
      gameBoardData,
      tetrominoData: tetrominoDataLefted
    }) &&
    !tetrominoDataGoOutsideLeft({ tetrominoData: tetrominoDataLefted })
  )
    return tetrominoDataLefted;

  return undefined;
};

export const rightTetromino = ({ gameBoardData, tetrominoData }) => {
  const tetrominoDataLRighted = _.cloneDeep(tetrominoData);

  tetrominoDataLRighted.position.x++;
  if (
    !tetrominoDataCollideGameBoardData({
      gameBoardData,
      tetrominoData: tetrominoDataLRighted
    }) &&
    !tetrominoDataGoOutsideRight({ tetrominoData: tetrominoDataLRighted })
  )
    return tetrominoDataLRighted;

  return undefined;
};

export const rotateLayerLeft = ({ tetrominoData }) => {
  let { currentLayerIndex } = tetrominoData;

  currentLayerIndex--;
  if (currentLayerIndex < 0) currentLayerIndex = 3;

  return { ...tetrominoData, currentLayerIndex };
};

export const rotateLayerRight = ({ tetrominoData }) => {
  let { currentLayerIndex } = tetrominoData;

  currentLayerIndex++;
  if (currentLayerIndex > 3) currentLayerIndex = 0;

  return { ...tetrominoData, currentLayerIndex };
};

export const rotateLeftTetromino = ({ gameBoardData, tetrominoData }) => {
  const tetrominoDataRotated = rotateLayerLeft({ tetrominoData });

  if (
    !tetrominoDataCollideGameBoardData({
      gameBoardData,
      tetrominoData: tetrominoDataRotated
    }) &&
    !tetrominoDataGoOutsideRight({ tetrominoData: tetrominoDataRotated }) &&
    !tetrominoDataGoOutsideLeft({ tetrominoData: tetrominoDataRotated }) &&
    !tetrominoDataGoOutsideDown({ tetrominoData: tetrominoDataRotated })
  )
    return tetrominoDataRotated;

  return undefined;
};

export const rotateRightTetromino = ({ gameBoardData, tetrominoData }) => {
  const tetrominoDataRotated = rotateLayerRight({ tetrominoData });

  if (
    !tetrominoDataCollideGameBoardData({
      gameBoardData,
      tetrominoData: tetrominoDataRotated
    }) &&
    !tetrominoDataGoOutsideRight({ tetrominoData: tetrominoDataRotated }) &&
    !tetrominoDataGoOutsideLeft({ tetrominoData: tetrominoDataRotated }) &&
    !tetrominoDataGoOutsideDown({ tetrominoData: tetrominoDataRotated })
  )
    return tetrominoDataRotated;

  return undefined;
};

export const popNewTetromino = ({
  tetrominoData,
  gameBoardData,
  giveTetromino
}) => {
  const tetrominoLayer = findLayer(tetrominoData);
  const { x: initialX, y: initialY } = tetrominoData.position;

  const newGameBoardData = [
    ...gameBoardData,
    ...tetrominoLayer.map(tetrominoLayerCell => ({
      ...tetrominoLayerCell,
      x: tetrominoLayerCell.x + initialX,
      y: tetrominoLayerCell.y + initialY
    }))
  ];

  const newTetrominoData = giveTetromino();

  return [newTetrominoData, newGameBoardData];
};

export const removeFullLines = ({
  gameBoardData,
  removedLines,
  setRemovedLines,
  setLevel
}) => {
  const initialRemovedLines = removedLines;
  const boardDataWithRemovedLines = Object.values(_.groupBy(gameBoardData, 'y'))
    .reduce((cleanedGameBoardData, line) => {
      if (line.length < 10) return [...cleanedGameBoardData, line];
      else {
        removedLines++;

        return cleanedGameBoardData.map(lineToDown =>
          lineToDown.map(cellToDown => ({
            ...cellToDown,
            y: cellToDown.y + 1
          }))
        );
      }
    }, [])
    .flat();

  setLevel(prevLevel =>
    prevLevel < 14 &&
    Math.trunc(initialRemovedLines / 10) !== Math.trunc(removedLines / 10)
      ? prevLevel + 1
      : prevLevel
  );
  setRemovedLines(removedLines);

  return boardDataWithRemovedLines;
};
