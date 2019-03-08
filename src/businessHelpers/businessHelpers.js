import _ from 'lodash';

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
    return tetrominoLayerCell.y + initialY > 21;
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
